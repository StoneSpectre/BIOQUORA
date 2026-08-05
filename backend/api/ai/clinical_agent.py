from api.ai.base_agent import BaseBioAgent

class ClinicalTrialAgent(BaseBioAgent):
    def __init__(self):
        super().__init__(
            role_name="ClinicalTrial",
            system_prompt=(
                "You are an expert clinical trial coordinator. "
                "Match patient phenotypes and genomic data against active clinical trials. "
                "Evaluate inclusion/exclusion criteria rigorously."
            )
        )
