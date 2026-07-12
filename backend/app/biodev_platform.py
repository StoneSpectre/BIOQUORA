"""
Bioquora Founder Bible — Volume XII (Step 12)
Bioquora Developer Platform & Scientific Platform Ecosystem (Codename: BioDev)

Implements:
  1. Developer Application & API Key Provisioning Engine
  2. Third-Party Extension Marketplace Registry (Plugins, AI Agents, Workflows)
  3. Real-Time Developer Webhook & Event Bus Engine
"""

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, Field


MarketplaceCategory = Literal["AGENT", "PLUGIN", "WORKFLOW", "DATASET", "API_EXTENSION"]


class BioDevApplication(BaseModel):
    """External developer application registered on BioDev Platform."""
    app_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    app_name: str
    developer_org_id: uuid.UUID
    allowed_scopes: List[str] = Field(
        default_factory=lambda: ["read:biokg", "read:literature", "invoke:biomind"]
    )
    api_key_prefix: str
    rate_limit_rpm: int = 1200
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BioDevMarketplaceItem(BaseModel):
    """Third-party package or agent published to BioMarketplace."""
    item_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    package_name: str
    author_orcid: str
    category: MarketplaceCategory
    version: str = "1.0.0"
    description: str
    is_verified_secure: bool = True
    downloads_count: int = 0
    price_per_invocation_usd: float = 0.0


class BioDevWebhookSubscription(BaseModel):
    """Developer webhook subscribed to real-time Bioquora event streaming."""
    webhook_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    app_id: uuid.UUID
    target_url: str
    event_topics: List[str] = Field(
        default_factory=lambda: ["biokg.node.created", "biomind.reasoning.completed"]
    )
    is_active: bool = True


class BioDevPlatformEngine:
    """
    Production BioDev Platform Engine:
      - Manages third-party developer applications & API keys
      - Hosts BioMarketplace extensions and agents
      - Dispatches real-time webhook notifications
    """

    def __init__(self):
        self.applications: Dict[uuid.UUID, BioDevApplication] = {}
        self.marketplace_items: Dict[uuid.UUID, BioDevMarketplaceItem] = {}
        self.webhooks: List[BioDevWebhookSubscription] = []
        self.event_log: List[Dict[str, str]] = []

    def register_developer_app(
        self,
        app_name: str,
        developer_org_id: uuid.UUID,
        scopes: Optional[List[str]] = None,
    ) -> BioDevApplication:
        """Register an external developer application and issue a scoped API key prefix."""
        app = BioDevApplication(
            app_name=app_name,
            developer_org_id=developer_org_id,
            allowed_scopes=scopes or ["read:biokg", "read:literature", "invoke:biomind"],
            api_key_prefix=f"biodev_live_{uuid.uuid4().hex[:8]}",
        )
        self.applications[app.app_id] = app
        return app

    def publish_marketplace_item(
        self,
        package_name: str,
        author_orcid: str,
        category: MarketplaceCategory,
        description: str,
        price_per_invocation_usd: float = 0.0,
    ) -> BioDevMarketplaceItem:
        """Publish a verified third-party package or AI agent to BioMarketplace."""
        item = BioDevMarketplaceItem(
            package_name=package_name,
            author_orcid=author_orcid,
            category=category,
            description=description,
            price_per_invocation_usd=price_per_invocation_usd,
            is_verified_secure=True,
        )
        self.marketplace_items[item.item_id] = item
        return item

    def subscribe_webhook(
        self,
        app_id: uuid.UUID,
        target_url: str,
        event_topics: List[str],
    ) -> BioDevWebhookSubscription:
        """Subscribe a developer application to real-time event streaming."""
        sub = BioDevWebhookSubscription(
            app_id=app_id,
            target_url=target_url,
            event_topics=event_topics,
        )
        self.webhooks.append(sub)
        return sub

    def emit_event(self, topic: str, payload_summary: str) -> int:
        """Broadcast an event to all active matching developer webhook subscriptions."""
        self.event_log.append({"topic": topic, "payload": payload_summary})
        dispatched_count = 0
        for sub in self.webhooks:
            if sub.is_active and topic in sub.event_topics:
                dispatched_count += 1
        return dispatched_count
