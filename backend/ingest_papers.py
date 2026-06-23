"""
Ingest papers into Qdrant with BioLinkBERT embeddings.
Requires: pip install transformers torch qdrant-client
"""
import torch
import numpy as np
from transformers import AutoTokenizer, AutoModel
from qdrant_client import AsyncQdrantClient
from qdrant_client.models import PointStruct

MODEL_NAME = "sultan/BiomedNLP-BiomedBERT-large-uncased-abstract-fulltext"
tokenizer  = AutoTokenizer.from_pretrained(MODEL_NAME)
model      = AutoModel.from_pretrained(MODEL_NAME).eval()


def embed(text: str) -> np.ndarray:
    """CLS token embedding from BioLinkBERT."""
    tokens = tokenizer(
        text, return_tensors="pt",
        max_length=512, truncation=True, padding=True,
    )
    with torch.no_grad():
        out = model(**tokens)
    return out.last_hidden_state[:, 0, :].squeeze().numpy()


async def ingest_paper(paper: dict, qdrant: AsyncQdrantClient):
    text   = f"{paper['title']}. {paper['abstract']}"
    vector = embed(text).tolist()
    await qdrant.upsert(
        collection_name="papers",
        points=[PointStruct(
            id=str(paper["id"]),
            vector=vector,
            payload={
                "title":         paper["title"],
                "year":          paper["year"],
                "doi":           paper.get("doi"),
                "mesh_terms":    paper.get("mesh_terms", []),
                "evidence_tier": paper.get("evidence_tier", "unknown"),
                "field":         paper.get("field", "General"),
                "source":        paper.get("source"),
                "authors":       paper.get("authors", []),
            },
        )],
    )
