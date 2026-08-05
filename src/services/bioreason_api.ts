// Auto-generated API service for bioreason
const BASE_URL = '/api/v1/bioreason';

export const BioreasonAPI = {
  getReasoningCore: async () => {
    const res = await fetch(`${BASE_URL}/reasoning_core`);
    return res.json();
  },
  createReasoningCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/reasoning_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getEvidenceCore: async () => {
    const res = await fetch(`${BASE_URL}/evidence_core`);
    return res.json();
  },
  createEvidenceCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/evidence_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getHypothesis: async () => {
    const res = await fetch(`${BASE_URL}/hypothesis`);
    return res.json();
  },
  createHypothesis: async (data: any) => {
    const res = await fetch(`${BASE_URL}/hypothesis`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getCausal: async () => {
    const res = await fetch(`${BASE_URL}/causal`);
    return res.json();
  },
  createCausal: async (data: any) => {
    const res = await fetch(`${BASE_URL}/causal`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getStatisticalCore: async () => {
    const res = await fetch(`${BASE_URL}/statistical_core`);
    return res.json();
  },
  createStatisticalCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/statistical_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getBiologicalCore: async () => {
    const res = await fetch(`${BASE_URL}/biological_core`);
    return res.json();
  },
  createBiologicalCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/biological_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getChemistryCore: async () => {
    const res = await fetch(`${BASE_URL}/chemistry_core`);
    return res.json();
  },
  createChemistryCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/chemistry_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProteinCore: async () => {
    const res = await fetch(`${BASE_URL}/protein_core`);
    return res.json();
  },
  createProteinCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/protein_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getGenomicsCore: async () => {
    const res = await fetch(`${BASE_URL}/genomics_core`);
    return res.json();
  },
  createGenomicsCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/genomics_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getGraphCore: async () => {
    const res = await fetch(`${BASE_URL}/graph_core`);
    return res.json();
  },
  createGraphCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/graph_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getLiteratureCore: async () => {
    const res = await fetch(`${BASE_URL}/literature_core`);
    return res.json();
  },
  createLiteratureCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/literature_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getCitationCore: async () => {
    const res = await fetch(`${BASE_URL}/citation_core`);
    return res.json();
  },
  createCitationCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/citation_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getExplainability: async () => {
    const res = await fetch(`${BASE_URL}/explainability`);
    return res.json();
  },
  createExplainability: async (data: any) => {
    const res = await fetch(`${BASE_URL}/explainability`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getUncertainty: async () => {
    const res = await fetch(`${BASE_URL}/uncertainty`);
    return res.json();
  },
  createUncertainty: async (data: any) => {
    const res = await fetch(`${BASE_URL}/uncertainty`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getValidation: async () => {
    const res = await fetch(`${BASE_URL}/validation`);
    return res.json();
  },
  createValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getBenchmarkReasoning: async () => {
    const res = await fetch(`${BASE_URL}/benchmark_reasoning`);
    return res.json();
  },
  createBenchmarkReasoning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/benchmark_reasoning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getWorkflowCore: async () => {
    const res = await fetch(`${BASE_URL}/workflow_core`);
    return res.json();
  },
  createWorkflowCore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/workflow_core`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getTelemetryReasoning: async () => {
    const res = await fetch(`${BASE_URL}/telemetry_reasoning`);
    return res.json();
  },
  createTelemetryReasoning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/telemetry_reasoning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getAudit: async () => {
    const res = await fetch(`${BASE_URL}/audit`);
    return res.json();
  },
  createAudit: async (data: any) => {
    const res = await fetch(`${BASE_URL}/audit`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getLearning: async () => {
    const res = await fetch(`${BASE_URL}/learning`);
    return res.json();
  },
  createLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
