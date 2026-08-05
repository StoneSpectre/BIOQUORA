import asyncio
import json
import uuid
from datetime import datetime
from api.core.database import AsyncSessionLocal, engine, Base
from api.models.biofoundation import FoundationModelRegistry
from api.models.bioagents import AgentRegistry

async def seed():
    print("Starting database seed...")
    
    # 1. Create all tables if they don't exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        print("Seeding BioFoundation (Foundation Models)...")
        # Add Mock Foundation Models
        models = [
            FoundationModelRegistry(
                model_name="BioGPT-Large",
                domain="Genomics",
                architecture="Transformer",
                parameters_billion=175.0
            ),
            FoundationModelRegistry(
                model_name="AlphaFold-3",
                domain="Proteomics",
                architecture="Graph Neural Network",
                parameters_billion=3.5
            )
        ]
        session.add_all(models)

        print("Seeding BioAgents (AI Swarm)...")
        # Add Mock Agents
        agents = [
            AgentRegistry(
                agent_name="BioChemist_Prime",
                domain_specialty="Biochemist",
                status="ONLINE"
            ),
            AgentRegistry(
                agent_name="ClinicalTrial_Matcher",
                domain_specialty="ClinicalTrial",
                status="ONLINE"
            )
        ]
        session.add_all(agents)
        await session.commit()
        
        print("Database seeded successfully with 'God Mode' data!")

if __name__ == "__main__":
    asyncio.run(seed())
