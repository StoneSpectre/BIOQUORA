"""
9.6 Event-Driven Updates -- every important change produces an event;
downstream services (search index, embeddings, recommendation engine, graph
cache, analytics) subscribe rather than requiring full reprocessing.
"""

from __future__ import annotations

from collections import defaultdict
from datetime import datetime, timezone
from typing import Callable


class Event:
    def __init__(self, topic: str, payload: dict):
        self.topic = topic
        self.payload = payload
        self.timestamp = datetime.now(timezone.utc)

    def __repr__(self):
        return f"<Event {self.topic} @ {self.timestamp.isoformat()} {self.payload}>"


class EventBus:
    def __init__(self):
        self._subscribers: dict[str, list[Callable[[Event], None]]] = defaultdict(list)
        self.log: list[Event] = []

    def subscribe(self, topic: str, callback: Callable[[Event], None]) -> None:
        self._subscribers[topic].append(callback)

    def publish(self, topic: str, payload: dict) -> Event:
        event = Event(topic, payload)
        self.log.append(event)
        for cb in self._subscribers.get(topic, []):
            cb(event)
        for cb in self._subscribers.get("*", []):  # wildcard subscribers (analytics)
            cb(event)
        return event


# canonical topic names referenced in 9.6
TOPIC_ONTOLOGY_VERSION = "ontology.new_version"
TOPIC_ENTITY_UPDATED = "entity.updated"
TOPIC_EDGE_ADDED = "graph.edge_added"
TOPIC_PUBLICATION_IMPORTED = "evidence.publication_imported"
TOPIC_CONFIDENCE_CHANGED = "graph.confidence_changed"
