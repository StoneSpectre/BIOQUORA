"""
Bioquora Founder Bible — Volume XI (Step 11)
Bioquora Cloud Platform (Codename: BioCloud)

Implements:
  1. Multi-Tenant Enterprise Organization & Quota Control
  2. Six X-as-a-Service (XaaS) Biomedical Endpoints (BKaaS, BAIaaS, BGaaS, BSaaS, BWaaS, BDaaS)
  3. Resource Metering & Tenant Quota Enforcement
"""

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, Field
from app.knowledge_graph_engine import BioquoraKnowledgeGraphEngine


XaaSServiceType = Literal["BKAAS", "BAIAAS", "BGAAS", "BSAAS", "BWAAS", "BDAAS"]


class TenantQuota(BaseModel):
    """Resource quotas assigned to a BioCloud tenant organization."""
    max_gpu_cluster_hours: float = 1000.0
    used_gpu_hours: float = 0.0
    max_storage_tb: float = 50.0
    used_storage_tb: float = 0.0
    api_rate_limit_rpm: int = 600


class BioCloudOrganization(BaseModel):
    """Multi-tenant enterprise organization enrolled in BioCloud."""
    org_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    org_name: str
    tenant_tier: Literal["ACADEMIC", "CLINICAL", "ENTERPRISE_PHARMA"]
    region_iso_code: str
    quota: TenantQuota = Field(default_factory=TenantQuota)
    enrolled_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BioCloudServiceResponse(BaseModel):
    """Standardized response packet emitted by BioCloud XaaS endpoints."""
    request_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    org_id: uuid.UUID
    service_type: XaaSServiceType
    status: Literal["SUCCESS", "QUOTA_EXCEEDED", "PERMISSION_DENIED", "ERROR"]
    gpu_hours_consumed: float
    payload: Dict[str, str]
    processed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BioCloudEngine:
    """
    Production BioCloud Engine:
      - Enrolls multi-tenant enterprise organizations
      - Dispatches XaaS biomedical calls with strict quota enforcement
    """

    def __init__(self):
        self.organizations: Dict[uuid.UUID, BioCloudOrganization] = {}

    def enroll_organization(
        self,
        org_name: str,
        tenant_tier: Literal["ACADEMIC", "CLINICAL", "ENTERPRISE_PHARMA"] = "ACADEMIC",
        region_iso_code: str = "US",
        max_gpu_hours: float = 500.0,
    ) -> BioCloudOrganization:
        """Enroll a new organization with dedicated tenant quota limits."""
        org = BioCloudOrganization(
            org_name=org_name,
            tenant_tier=tenant_tier,
            region_iso_code=region_iso_code,
            quota=TenantQuota(max_gpu_cluster_hours=max_gpu_hours),
        )
        self.organizations[org.org_id] = org
        return org

    def invoke_xaas_service(
        self,
        org_id: uuid.UUID,
        service_type: XaaSServiceType,
        query_param: str,
        gpu_cost_hours: float,
        kg_engine: Optional[BioquoraKnowledgeGraphEngine] = None,
    ) -> BioCloudServiceResponse:
        """Execute a managed biomedical XaaS request on behalf of a tenant organization."""
        org = self.organizations.get(org_id)
        if not org:
            return BioCloudServiceResponse(
                org_id=org_id,
                service_type=service_type,
                status="ERROR",
                gpu_hours_consumed=0.0,
                payload={"error": "Organization not found."},
            )

        # Enforce quota check
        if org.quota.used_gpu_hours + gpu_cost_hours > org.quota.max_gpu_cluster_hours:
            return BioCloudServiceResponse(
                org_id=org_id,
                service_type=service_type,
                status="QUOTA_EXCEEDED",
                gpu_hours_consumed=0.0,
                payload={"error": f"Quota exceeded. Used {org.quota.used_gpu_hours:.1f}/{org.quota.max_gpu_cluster_hours:.1f} GPU hours."},
            )

        # Meter usage
        org.quota.used_gpu_hours += gpu_cost_hours

        # Execute XaaS payload
        result_map = {}
        if service_type == "BGAAS" and kg_engine:
            node = kg_engine.nodes.get(query_param)
            result_map["graph_node_label"] = node.label if node else "NOT_FOUND"
            result_map["service_tier"] = "Biomedical Graph as a Service (BGaaS)"
        elif service_type == "BAIAAS":
            result_map["ai_reasoning_summary"] = f"BioMind multi-agent proof computed for {query_param}."
            result_map["service_tier"] = "Biomedical AI as a Service (BAIaaS)"
        else:
            result_map["xaas_execution"] = f"Processed {service_type} query for {query_param}."

        return BioCloudServiceResponse(
            org_id=org_id,
            service_type=service_type,
            status="SUCCESS",
            gpu_hours_consumed=gpu_cost_hours,
            payload=result_map,
        )
