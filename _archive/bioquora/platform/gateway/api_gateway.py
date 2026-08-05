"""
BIOQUORA - Enterprise Graph API Gateway
Implements Module 2 for Step 4 Stage 9 (BioOps KG v1.0).
Unified entry point with token bucket rate limiting, request validation, routing across REST/GraphQL/gRPC, and usage metrics.
"""

import time
from typing import Dict, Any, Optional, Tuple

class TokenBucketRateLimiter:
    def __init__(self, capacity: int = 1000, refill_rate_per_sec: float = 100.0):
        self.capacity = capacity
        self.tokens = float(capacity)
        self.refill_rate = refill_rate_per_sec
        self.last_refill = time.time()

    def allow_request(self, cost: int = 1) -> bool:
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_refill = now
        if self.tokens >= cost:
            self.tokens -= cost
            return True
        return False

class GraphAPIGateway:
    def __init__(self):
        self.rate_limiter = TokenBucketRateLimiter()
        self.routes: Dict[str, str] = {
            "/api/v1/query": "REST_QUERY_SERVICE",
            "/api/v1/traversal": "REST_TRAVERSAL_SERVICE",
            "/graphql": "GRAPHQL_SERVICE",
            "/grpc/biographx": "GRPC_SERVICE"
        }
        self.total_requests = 0
        self.blocked_requests = 0

    def route_request(self, endpoint: str, auth_token: Optional[str] = None) -> Tuple[int, Dict[str, Any]]:
        self.total_requests += 1
        if not self.rate_limiter.allow_request():
            self.blocked_requests += 1
            return 429, {"error": "Too Many Requests - Rate Limit Exceeded"}

        if endpoint not in self.routes:
            return 404, {"error": f"Endpoint {endpoint} not found"}

        return 200, {
            "routed_to": self.routes[endpoint],
            "protocol": endpoint.split("/")[1].upper(),
            "status": "GATEWAY_ROUTED"
        }

    def get_gateway_stats(self) -> Dict[str, Any]:
        return {
            "total_requests": self.total_requests,
            "blocked_requests": self.blocked_requests,
            "active_routes": len(self.routes),
            "status": "GATEWAY_HEALTHY"
        }
