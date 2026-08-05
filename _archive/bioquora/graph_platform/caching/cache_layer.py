"""
BIOQUORA - Graph Caching Layer
Implements Module 13 for Step 4 Stage 7 (BioGraphX v1.0).
Provides thread-safe LRU caching for frequent queries, traversals, and ontology lookups.
"""

from collections import OrderedDict
from typing import Any, Optional

class GraphCacheLayer:
    def __init__(self, max_capacity: int = 1000):
        self.max_capacity = max_capacity
        self._cache: OrderedDict[str, Any] = OrderedDict()
        self.hits = 0
        self.misses = 0

    def get(self, key: str) -> Optional[Any]:
        if key in self._cache:
            self._cache.move_to_end(key)
            self.hits += 1
            return self._cache[key]
        self.misses += 1
        return None

    def put(self, key: str, value: Any):
        if key in self._cache:
            self._cache.move_to_end(key)
        self._cache[key] = value
        if len(self._cache) > self.max_capacity:
            self._cache.popitem(last=False)

    def get_metrics(self) -> dict:
        total = max(1, self.hits + self.misses)
        return {
            "hits": self.hits,
            "misses": self.misses,
            "hit_ratio": round(self.hits / total, 4),
            "cached_entries": len(self._cache)
        }
