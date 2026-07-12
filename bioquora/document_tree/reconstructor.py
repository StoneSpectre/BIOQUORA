"""
Module 5: Scientific Structure Reconstruction Engine
Reconstructs canonical logical document tree hierarchy across IMRaD sections.
"""

from typing import List
from bioquora.bsdo.schema import DocumentTreeNode, SectionRecord


class ScientificStructureReconstructionEngine:
    """Production Logical Document Tree Builder."""

    def build_document_tree(self, paper_title: str, sections: List[SectionRecord]) -> DocumentTreeNode:
        root = DocumentTreeNode(node_id="root", title=paper_title, section_type="OTHER")
        meta_node = DocumentTreeNode(node_id="meta", title="Metadata", section_type="OTHER")
        root.children.append(meta_node)

        for sec in sections:
            child = DocumentTreeNode(node_id=sec.section_id, title=sec.section_title, section_type=sec.section_type)
            root.children.append(child)

        return root
