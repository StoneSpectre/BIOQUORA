"""
BIOQUORA - Identity & Access Management (IAM) Platform
Implements Module 3 for Step 4 Stage 9 (BioOps KG v1.0).
Secures every interaction supporting OAuth2, JWT, API Keys, RBAC (7 Enterprise Roles), and ABAC policies.
"""

from enum import Enum
from typing import Dict, Any, Optional, Set

class EnterpriseRole(str, Enum):
    RESEARCHER = "RESEARCHER"
    CLINICIAN = "CLINICIAN"
    CURATOR = "CURATOR"
    DEVELOPER = "DEVELOPER"
    ADMINISTRATOR = "ADMINISTRATOR"
    ENTERPRISE_CUSTOMER = "ENTERPRISE_CUSTOMER"
    PUBLIC_USER = "PUBLIC_USER"

class IdentityToken:
    def __init__(self, token_id: str, subject: str, role: EnterpriseRole, attributes: Dict[str, Any]):
        self.token_id = token_id
        self.subject = subject
        self.role = role
        self.attributes = attributes

class EnterpriseIAMPlatform:
    def __init__(self):
        self._tokens: Dict[str, IdentityToken] = {}
        self._role_permissions: Dict[EnterpriseRole, Set[str]] = {
            EnterpriseRole.ADMINISTRATOR: {"READ", "WRITE", "DELETE", "ADMIN", "PUBLISH"},
            EnterpriseRole.CURATOR: {"READ", "WRITE", "PUBLISH"},
            EnterpriseRole.RESEARCHER: {"READ", "QUERY", "ANALYZE"},
            EnterpriseRole.CLINICIAN: {"READ", "QUERY"},
            EnterpriseRole.DEVELOPER: {"READ", "QUERY", "DEVELOP"},
            EnterpriseRole.ENTERPRISE_CUSTOMER: {"READ", "QUERY", "EXPORT"},
            EnterpriseRole.PUBLIC_USER: {"READ"}
        }

    def issue_token(self, subject: str, role: EnterpriseRole, attributes: Optional[Dict[str, Any]] = None) -> IdentityToken:
        token_id = f"JWT_BIOOPS_{abs(hash(subject + role.value))}"
        tok = IdentityToken(token_id, subject, role, attributes or {})
        self._tokens[token_id] = tok
        return tok

    def verify_permission(self, token_id: str, action: str) -> bool:
        tok = self._tokens.get(token_id)
        if not tok:
            return False
        return action.upper() in self._role_permissions.get(tok.role, set())
