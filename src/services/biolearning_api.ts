// Auto-generated API service for biolearning
const BASE_URL = '/api/v1/biolearning';

export const BiolearningAPI = {
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
  getLiteratureLearning: async () => {
    const res = await fetch(`${BASE_URL}/literature_learning`);
    return res.json();
  },
  createLiteratureLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/literature_learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getGraphLearning: async () => {
    const res = await fetch(`${BASE_URL}/graph_learning`);
    return res.json();
  },
  createGraphLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/graph_learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDatasetLearning: async () => {
    const res = await fetch(`${BASE_URL}/dataset_learning`);
    return res.json();
  },
  createDatasetLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/dataset_learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getOntologyLearning: async () => {
    const res = await fetch(`${BASE_URL}/ontology_learning`);
    return res.json();
  },
  createOntologyLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/ontology_learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getModelLearning: async () => {
    const res = await fetch(`${BASE_URL}/model_learning`);
    return res.json();
  },
  createModelLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/model_learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getReasoningLearning: async () => {
    const res = await fetch(`${BASE_URL}/reasoning_learning`);
    return res.json();
  },
  createReasoningLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/reasoning_learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getAgentLearning: async () => {
    const res = await fetch(`${BASE_URL}/agent_learning`);
    return res.json();
  },
  createAgentLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/agent_learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getWorkflowLearning: async () => {
    const res = await fetch(`${BASE_URL}/workflow_learning`);
    return res.json();
  },
  createWorkflowLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/workflow_learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getBenchmarkLearning: async () => {
    const res = await fetch(`${BASE_URL}/benchmark_learning`);
    return res.json();
  },
  createBenchmarkLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/benchmark_learning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getFeedback: async () => {
    const res = await fetch(`${BASE_URL}/feedback`);
    return res.json();
  },
  createFeedback: async (data: any) => {
    const res = await fetch(`${BASE_URL}/feedback`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getExpertReview: async () => {
    const res = await fetch(`${BASE_URL}/expert_review`);
    return res.json();
  },
  createExpertReview: async (data: any) => {
    const res = await fetch(`${BASE_URL}/expert_review`, {
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
  getEvolution: async () => {
    const res = await fetch(`${BASE_URL}/evolution`);
    return res.json();
  },
  createEvolution: async (data: any) => {
    const res = await fetch(`${BASE_URL}/evolution`, {
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
  getVersion: async () => {
    const res = await fetch(`${BASE_URL}/version`);
    return res.json();
  },
  createVersion: async (data: any) => {
    const res = await fetch(`${BASE_URL}/version`, {
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
  getOptimization: async () => {
    const res = await fetch(`${BASE_URL}/optimization`);
    return res.json();
  },
  createOptimization: async (data: any) => {
    const res = await fetch(`${BASE_URL}/optimization`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getAdaptive: async () => {
    const res = await fetch(`${BASE_URL}/adaptive`);
    return res.json();
  },
  createAdaptive: async (data: any) => {
    const res = await fetch(`${BASE_URL}/adaptive`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getBiolearningIndex: async () => {
    const res = await fetch(`${BASE_URL}/biolearning_index`);
    return res.json();
  },
  createBiolearningIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/biolearning_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
