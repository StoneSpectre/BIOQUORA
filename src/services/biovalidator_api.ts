// Auto-generated API service for biovalidator
const BASE_URL = '/api/v1/biovalidator';

export const BiovalidatorAPI = {
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
  getEvidence: async () => {
    const res = await fetch(`${BASE_URL}/evidence`);
    return res.json();
  },
  createEvidence: async (data: any) => {
    const res = await fetch(`${BASE_URL}/evidence`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getCitationValidation: async () => {
    const res = await fetch(`${BASE_URL}/citation_validation`);
    return res.json();
  },
  createCitationValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/citation_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getClaim: async () => {
    const res = await fetch(`${BASE_URL}/claim`);
    return res.json();
  },
  createClaim: async (data: any) => {
    const res = await fetch(`${BASE_URL}/claim`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getStatisticsValidation: async () => {
    const res = await fetch(`${BASE_URL}/statistics_validation`);
    return res.json();
  },
  createStatisticsValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/statistics_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getLogicValidation: async () => {
    const res = await fetch(`${BASE_URL}/logic_validation`);
    return res.json();
  },
  createLogicValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/logic_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getOntologyValidation: async () => {
    const res = await fetch(`${BASE_URL}/ontology_validation`);
    return res.json();
  },
  createOntologyValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/ontology_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getCodeValidation: async () => {
    const res = await fetch(`${BASE_URL}/code_validation`);
    return res.json();
  },
  createCodeValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/code_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getSimulationValidation: async () => {
    const res = await fetch(`${BASE_URL}/simulation_validation`);
    return res.json();
  },
  createSimulationValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/simulation_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDatasetValidation: async () => {
    const res = await fetch(`${BASE_URL}/dataset_validation`);
    return res.json();
  },
  createDatasetValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/dataset_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMultimodalValidation: async () => {
    const res = await fetch(`${BASE_URL}/multimodal_validation`);
    return res.json();
  },
  createMultimodalValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/multimodal_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getClinicalValidation: async () => {
    const res = await fetch(`${BASE_URL}/clinical_validation`);
    return res.json();
  },
  createClinicalValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/clinical_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getWorkflowValidation: async () => {
    const res = await fetch(`${BASE_URL}/workflow_validation`);
    return res.json();
  },
  createWorkflowValidation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/workflow_validation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getTrustScore: async () => {
    const res = await fetch(`${BASE_URL}/trust_score`);
    return res.json();
  },
  createTrustScore: async (data: any) => {
    const res = await fetch(`${BASE_URL}/trust_score`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProvenance: async () => {
    const res = await fetch(`${BASE_URL}/provenance`);
    return res.json();
  },
  createProvenance: async (data: any) => {
    const res = await fetch(`${BASE_URL}/provenance`, {
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
  getGovernance: async () => {
    const res = await fetch(`${BASE_URL}/governance`);
    return res.json();
  },
  createGovernance: async (data: any) => {
    const res = await fetch(`${BASE_URL}/governance`, {
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
  getBenchmark: async () => {
    const res = await fetch(`${BASE_URL}/benchmark`);
    return res.json();
  },
  createBenchmark: async (data: any) => {
    const res = await fetch(`${BASE_URL}/benchmark`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getTelemetry: async () => {
    const res = await fetch(`${BASE_URL}/telemetry`);
    return res.json();
  },
  createTelemetry: async (data: any) => {
    const res = await fetch(`${BASE_URL}/telemetry`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
