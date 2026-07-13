"""
BIOQUORA - Graph Versioning Platform
Implements Module 8 for Step 4 Stage 6 (BioBuilder v1.0).
Manages Major, Minor, and Patch semantic releases of BioGraph.
"""

from datetime import datetime
from typing import Dict, Any, List
from pydantic import BaseModel, Field

class GraphReleaseVersion(BaseModel):
    version_tag: str  # e.g., "v1.0.0"
    release_type: str  # MAJOR, MINOR, PATCH
    node_count: int
    edge_count: int
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    changelog_summary: str = "Initial release"

class GraphVersionManager:
    def __init__(self):
        self._versions: Dict[str, GraphReleaseVersion] = {}
        self._history: List[str] = []

    def register_release(self, tag: str, release_type: str, nodes: int, edges: int, summary: str) -> GraphReleaseVersion:
        rel = GraphReleaseVersion(
            version_tag=tag,
            release_type=release_type.upper(),
            node_count=nodes,
            edge_count=edges,
            changelog_summary=summary
        )
        self._versions[tag] = rel
        self._history.append(tag)
        return rel

    def get_latest_version(self) -> GraphReleaseVersion:
        if not self._history:
            return self.register_release("v1.0.0", "MAJOR", 0, 0, "Initial bootstrap")
        return self._versions[self._history[-1]]
