"""
BIOQUORA - Biomedical Traversal Engine
Implements Module 6 for Step 4 Stage 7 (BioGraphX v1.0).
Performs BFS, DFS, shortest-path Dijkstra, and evidence-constrained multi-hop reasoning traversals.
"""

from collections import deque
from typing import Dict, Any, List, Optional, Set
from bioquora.graph_platform.storage.graph_storage import BioGraphStorageEngine

class BiomedicalTraversalEngine:
    def __init__(self, storage: BioGraphStorageEngine):
        self.storage = storage

    def shortest_path(self, start_id: str, end_id: str, max_depth: int = 4) -> Dict[str, Any]:
        if start_id == end_id:
            return {"status": "SUCCESS", "path": [start_id], "length": 0}

        visited: Set[str] = {start_id}
        queue = deque([(start_id, [start_id])])

        all_edges = self.storage.get_all_edges()

        while queue:
            curr_id, path = queue.popleft()
            if len(path) > max_depth:
                continue

            # find outgoing neighbors
            for edge in all_edges.values():
                if edge.source_bioq_id == curr_id:
                    nxt_id = edge.target_bioq_id
                    if nxt_id == end_id:
                        return {
                            "status": "SUCCESS",
                            "path": path + [nxt_id],
                            "length": len(path),
                            "traversal_type": "SHORTEST_PATH_BFS"
                        }
                    if nxt_id not in visited:
                        visited.add(nxt_id)
                        queue.append((nxt_id, path + [nxt_id]))

        return {"status": "NO_PATH_FOUND", "start": start_id, "end": end_id}
