import httpx
import asyncio

async def test_agent():
    async with httpx.AsyncClient() as client:
        # Test BioChemist
        print("Testing BioChemist Agent...")
        res = await client.post(
            "http://127.0.0.1:8000/api/v1/bioagents/execute",
            json={"agent_type": "biochemist", "task": "Analyze the interaction between aspirin and warfarin."}
        )
        print(res.json())

        # Test ClinicalTrial
        print("\nTesting Clinical Trial Agent...")
        res = await client.post(
            "http://127.0.0.1:8000/api/v1/bioagents/execute",
            json={"agent_type": "clinicaltrial", "task": "Patient has BRCA1 mutation. Find trials."}
        )
        print(res.json())

if __name__ == "__main__":
    asyncio.run(test_agent())
