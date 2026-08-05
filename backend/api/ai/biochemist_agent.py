from api.ai.base_agent import BaseBioAgent

class BioChemistAgent(BaseBioAgent):
    def __init__(self):
        super().__init__(
            role_name="BioChemist",
            system_prompt=(
                "You are an expert computational biochemist. "
                "Analyze drug interactions, molecular structures, and pharmacokinetics. "
                "Always output scientific reasoning followed by a definitive conclusion."
            )
        )
