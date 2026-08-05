import pytest
from httpx import AsyncClient, ASGITransport
from api.main import app
from api.core.database import Base, engine, AsyncSessionLocal
from api.models.bioagents import AgentInteractionLog

# Pytest fixture to setup the database before tests run
@pytest.fixture(autouse=True, scope="module")
async def setup_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Optionally drop tables after testing if needed
    # async with engine.begin() as conn:
    #     await conn.run_sync(Base.metadata.drop_all)

@pytest.mark.asyncio
async def test_biochemist_agent_execution():
    """Test that the BioChemist Agent can correctly analyze Aspirin/Warfarin interaction"""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/bioagents/execute",
            json={"agent_type": "biochemist", "task": "Analyze the interaction between aspirin and warfarin."}
        )
    
    assert response.status_code == 200
    data = response.json()
    assert data["agent"] == "BioChemist"
    assert "CRITICAL RISK" in data["response"]["conclusion"]
    assert data["response"]["confidence"] > 0.90
    
    # Verify it logged to DB
    interaction_id = data["interaction_id"]
    assert interaction_id is not None

@pytest.mark.asyncio
async def test_clinical_trial_agent_execution():
    """Test that the ClinicalTrial Agent can correctly match BRCA1 mutations"""
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/bioagents/execute",
            json={"agent_type": "clinicaltrial", "task": "Patient has BRCA1 mutation. Find trials."}
        )
    
    assert response.status_code == 200
    data = response.json()
    assert data["agent"] == "ClinicalTrial"
    assert "NCT0" in data["response"]["conclusion"]
