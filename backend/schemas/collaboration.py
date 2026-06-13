"""
schemas/collaboration.py
Pydantic v2 request/response models for Step 7.
"""
from __future__ import annotations
from datetime import datetime
from typing import Literal, Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


# ── Members ─────────────────────────────────────────────────────────────────

class InviteMemberRequest(BaseModel):
    email: EmailStr
    role: Literal["editor", "viewer"] = "viewer"


class MemberOut(BaseModel):
    id: UUID
    user_id: UUID
    display_name: str
    email: str
    avatar_url: Optional[str] = None
    role: Literal["owner", "editor", "viewer"]
    invited_by: Optional[UUID] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class UpdateMemberRoleRequest(BaseModel):
    role: Literal["editor", "viewer"]


# ── Paper Assignments ────────────────────────────────────────────────────────

class AssignPaperRequest(BaseModel):
    user_id: UUID
    note: Optional[str] = None


class AssignmentOut(BaseModel):
    id: UUID
    paper_id: UUID
    assigned_to: UUID
    assigned_by: UUID
    status: Literal["assigned", "in_progress", "reviewed", "done"]
    note: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


class UpdateAssignmentStatusRequest(BaseModel):
    status: Literal["assigned", "in_progress", "reviewed", "done"]


# ── Comments ─────────────────────────────────────────────────────────────────

class AddCommentRequest(BaseModel):
    content: str = Field(..., min_length=1, max_length=5000)
    parent_comment_id: Optional[UUID] = None


class CommentAuthor(BaseModel):
    id: UUID
    display_name: str
    avatar_url: Optional[str] = None


class CommentOut(BaseModel):
    id: UUID
    content: str
    user_id: UUID
    author: CommentAuthor
    parent_comment_id: Optional[UUID] = None
    replies: list["CommentOut"] = []
    created_at: datetime
    edited_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class EditCommentRequest(BaseModel):
    content: str = Field(..., min_length=1, max_length=5000)


# ── Activity Feed ────────────────────────────────────────────────────────────

class ActivityEventOut(BaseModel):
    id: UUID
    event_type: str
    target_type: Optional[str] = None
    target_id: Optional[UUID] = None
    metadata: dict = {}
    actor: CommentAuthor
    created_at: datetime

    model_config = {"from_attributes": True}


class ActivityFeedOut(BaseModel):
    events: list[ActivityEventOut]
    total: int
    page: int
    page_size: int


# ── WebSocket messages ────────────────────────────────────────────────────────

class WSMessage(BaseModel):
    """Shape of every message broadcast over /ws/projects/{project_id}"""
    type: Literal[
        "comment_created",
        "comment_deleted",
        "paper_assigned",
        "paper_saved",
        "note_updated",
        "member_joined",
        "member_removed",
    ]
    project_id: UUID
    actor_id: Optional[UUID] = None
    payload: dict = {}
