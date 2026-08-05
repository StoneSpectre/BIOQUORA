"""
BIOQUORA - Ontology Hierarchy Engine
Implements Module 6 for Step 4 Stage 2 (BioSemantics v1.0).
Manages DAG hierarchy paths, transitive ancestors, and semantic relations (is_a, part_of, regulates).
"""

from collections import defaultdict
from typing import List, Set, Dict

class OntologyHierarchyEngine:
    def __init__(self):
        self.parents: Dict[str, Set[str]] = defaultdict(set)
        self.children: Dict[str, Set[str]] = defaultdict(set)

    def add_is_a_relation(self, child_curie: str, parent_curie: str) -> None:
        self.parents[child_curie].add(parent_curie)
        self.children[parent_curie].add(child_curie)

    def get_ancestors(self, curie: str, max_depth: int = 20) -> Set[str]:
        ancestors = set()
        queue = list(self.parents.get(curie, set()))
        depth = 0
        while queue and depth < max_depth:
            depth += 1
            curr = queue.pop(0)
            if curr not in ancestors:
                ancestors.add(curr)
                queue.extend(list(self.parents.get(curr, set())))
        return ancestors

    def is_subclass_of(self, child_curie: str, ancestor_curie: str) -> bool:
        if child_curie == ancestor_curie:
            return True
        return ancestor_curie in self.get_ancestors(child_curie)
