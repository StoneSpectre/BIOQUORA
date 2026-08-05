"""
BIOQUORA - CURIE & Namespace Resolver Module
Resolves CURIEs to full URIs and validates namespace prefixes against namespaces.json.
"""

import json
import os
import re
from typing import Optional, Dict

class CurieResolver:
    def __init__(self, namespaces_path: Optional[str] = None):
        if not namespaces_path:
            namespaces_path = os.path.join(os.path.dirname(__file__), "namespaces.json")
        with open(namespaces_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.namespaces: Dict[str, Dict[str, str]] = data.get("namespaces", {})

    def resolve_to_uri(self, curie: str) -> Optional[str]:
        if ":" not in curie:
            return None
        prefix, local_id = curie.split(":", 1)
        ns_info = self.namespaces.get(prefix)
        if not ns_info:
            return None
        return ns_info["uri_prefix"] + local_id

    def is_valid_namespace(self, prefix: str) -> bool:
        return prefix in self.namespaces

def get_default_resolver() -> CurieResolver:
    return CurieResolver()
