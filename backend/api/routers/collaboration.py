from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import datetime

router = APIRouter()

# --- Mock Schemas ---

class InviteRequest(BaseModel):
    email: str
    role: str # "editor" or "viewer"

class InviteResponse(BaseModel):
    status: str
    message: str

class ActivityEvent(BaseModel):
    id: str
    user_name: str
    action: str # e.g. "added", "assigned", "commented"
    target: str # e.g. "SNCA Paper", "Research Note"
    timestamp: str

class ActivityFeedResponse(BaseModel):
    events: List[ActivityEvent]

class AssignPaperRequest(BaseModel):
    user_id: str

# --- Endpoints ---

@router.post("/{project_id}/invite", response_model=InviteResponse)
async def invite_teammate(project_id: str, request: InviteRequest):
    """Step 7: Invite a teammate to a shared project"""
    # In a full implementation, this creates a record in ProjectMembers 
    # and dispatches an email via a service like SendGrid.
    return InviteResponse(
        status="success", 
        message=f"Invited {request.email} to project {project_id} as {request.role}"
    )

@router.get("/{project_id}/activity", response_model=ActivityFeedResponse)
async def get_activity_feed(project_id: str):
    """Step 7: Fetch the chronological activity log for a project"""
    # Mock data to simulate recent collaboration
    now = datetime.datetime.now()
    events = [
        ActivityEvent(
            id="ev_1",
            user_name="Dr. Sarah Chen",
            action="saved paper",
            target="LRRK2 kinase activity in Parkinson disease pathogenesis",
            timestamp=(now - datetime.timedelta(hours=2)).isoformat()
        ),
        ActivityEvent(
            id="ev_2",
            user_name="James Wilson",
            action="added a comment to note",
            target="Mitochondrial Dysfunction Hypothesis",
            timestamp=(now - datetime.timedelta(hours=5)).isoformat()
        ),
        ActivityEvent(
            id="ev_3",
            user_name="You",
            action="assigned paper to James Wilson",
            target="Identification of SNCA mutations",
            timestamp=(now - datetime.timedelta(days=1)).isoformat()
        ),
        ActivityEvent(
            id="ev_4",
            user_name="System",
            action="generated AI Literature Review",
            target="Parkinson's Disease Targets",
            timestamp=(now - datetime.timedelta(days=2)).isoformat()
        )
    ]
    return ActivityFeedResponse(events=events)

@router.post("/{project_id}/papers/{paper_id}/assign")
async def assign_paper(project_id: str, paper_id: str, request: AssignPaperRequest):
    """Step 7: Assign a paper to a team member for review"""
    # Updates the AssignedTo column in the SavedPapers table
    return {"status": "success", "message": f"Assigned paper {paper_id} to user {request.user_id}"}
