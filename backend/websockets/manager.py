"""
websockets/manager.py

Redis-backed WebSocket connection manager.
Every FastAPI instance publishes to Redis; all instances receive and
forward to their local WebSocket clients.  This lets the app scale
horizontally without sticky sessions.

Requirements:
    pip install redis[asyncio] websockets fastapi
"""
from __future__ import annotations

import asyncio
import json
import logging
from collections import defaultdict
from typing import Optional
from uuid import UUID

import redis.asyncio as aioredis
from fastapi import WebSocket

logger = logging.getLogger(__name__)

REDIS_URL = "redis://localhost:6379"
CHANNEL_PREFIX = "bioquora:project:"


class ConnectionManager:
    """
    Manages per-project WebSocket pools and a single Redis subscriber loop.

    Usage
    -----
    manager = ConnectionManager()
    await manager.startup()          # call once at app startup
    await manager.shutdown()         # call at app shutdown

    # In a WebSocket endpoint:
    await manager.connect(project_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # (optionally handle client→server messages here)
    except WebSocketDisconnect:
        manager.disconnect(project_id, websocket)

    # To broadcast from any API endpoint:
    await manager.broadcast(project_id, {"type": "comment_created", ...})
    """

    def __init__(self, redis_url: str = REDIS_URL):
        self._redis_url = redis_url
        self._pub: Optional[aioredis.Redis] = None   # for publishing
        self._sub: Optional[aioredis.Redis] = None   # for subscribing
        self._local: dict[str, set[WebSocket]] = defaultdict(set)
        self._listener_task: Optional[asyncio.Task] = None

    # ── Lifecycle ────────────────────────────────────────────────────────────

    async def startup(self) -> None:
        self._pub = aioredis.from_url(self._redis_url, decode_responses=True)
        self._sub = aioredis.from_url(self._redis_url, decode_responses=True)
        pubsub = self._sub.pubsub()
        await pubsub.psubscribe(f"{CHANNEL_PREFIX}*")
        self._listener_task = asyncio.create_task(self._listen(pubsub))
        logger.info("WebSocket manager started")

    async def shutdown(self) -> None:
        if self._listener_task:
            self._listener_task.cancel()
        if self._pub:
            await self._pub.aclose()
        if self._sub:
            await self._sub.aclose()
        logger.info("WebSocket manager shut down")

    # ── Connection management ────────────────────────────────────────────────

    async def connect(self, project_id: UUID | str, ws: WebSocket) -> None:
        await ws.accept()
        key = str(project_id)
        self._local[key].add(ws)
        logger.debug("WS connected: project=%s total=%d", key, len(self._local[key]))

    def disconnect(self, project_id: UUID | str, ws: WebSocket) -> None:
        key = str(project_id)
        self._local[key].discard(ws)
        if not self._local[key]:
            del self._local[key]
        logger.debug("WS disconnected: project=%s", key)

    # ── Broadcast ────────────────────────────────────────────────────────────

    async def broadcast(self, project_id: UUID | str, message: dict) -> None:
        """
        Publish to Redis → picked up by _listen() → forwarded to local sockets.
        Works across multiple app instances.
        """
        channel = f"{CHANNEL_PREFIX}{project_id}"
        payload = json.dumps(message, default=str)
        await self._pub.publish(channel, payload)

    # ── Private ──────────────────────────────────────────────────────────────

    async def _listen(self, pubsub) -> None:
        """Forward Redis messages to connected local WebSocket clients."""
        async for raw in pubsub.listen():
            if raw["type"] != "pmessage":
                continue
            try:
                # Extract project_id from channel name
                channel: str = raw["channel"]
                project_id = channel.removeprefix(CHANNEL_PREFIX)
                data: str = raw["data"]
                sockets = list(self._local.get(project_id, []))
                if not sockets:
                    continue
                await asyncio.gather(
                    *[ws.send_text(data) for ws in sockets],
                    return_exceptions=True,
                )
            except Exception:
                logger.exception("Error in WS listener")


# Singleton — import this wherever needed
manager = ConnectionManager()
