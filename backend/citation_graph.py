import numpy as np
from neo4j import AsyncDriver

class CitationGraphEngine:
    """
    Step 4 — Neo4j BFS traversal + co-citation clustering.
    Uses APOC path expansion for multi-hop citation neighbourhoods.
    """

    def __init__(self, driver: AsyncDriver):
        self.driver = driver

    async def citation_neighbours(
        self, seed_ids: list[str], hops: int = 2, limit: int = 50
    ) -> list[dict]:
        async with self.driver.session() as s:
            r = await s.run("""
                MATCH (seed:Paper) WHERE seed.id IN $seeds
                CALL apoc.path.spanningTree(seed, {
                    relationshipFilter: 'CITES>|<CITES',
                    maxLevel: $hops
                }) YIELD path
                WITH last(nodes(path)) AS n, length(path) AS dist
                WHERE NOT n.id IN $seeds
                RETURN n.id AS paper_id, n.title AS title,
                       n.year AS year, MIN(dist) AS min_dist,
                       COUNT(*) AS path_count
                ORDER BY min_dist ASC, path_count DESC
                LIMIT $limit
            """, seeds=seed_ids, hops=hops, limit=limit)
            rows = await r.data()
        return [{"paper_id": row["paper_id"],
                 "graph_score": (1.0 / row["min_dist"]) * np.log1p(row["path_count"]),
                 "title": row["title"], "year": row["year"]}
                for row in rows]

    async def co_citation_cluster(
        self, seed_ids: list[str], limit: int = 30
    ) -> list[dict]:
        async with self.driver.session() as s:
            r = await s.run("""
                MATCH (seed:Paper)<-[:CITES]-(citing:Paper)
                      -[:CITES]->(candidate:Paper)
                WHERE seed.id IN $seeds
                  AND NOT candidate.id IN $seeds
                WITH candidate, COUNT(DISTINCT citing) AS cocite
                RETURN candidate.id AS paper_id,
                       candidate.title AS title,
                       toFloat(cocite) AS graph_score
                ORDER BY cocite DESC LIMIT $limit
            """, seeds=seed_ids, limit=limit)
            return await r.data()
