// Auto-generated API service for bioeval
const BASE_URL = '/api/v1/bioeval';

export const BioevalAPI = {
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
  getEvaluation: async () => {
    const res = await fetch(`${BASE_URL}/evaluation`);
    return res.json();
  },
  createEvaluation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/evaluation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getReasoning: async () => {
    const res = await fetch(`${BASE_URL}/reasoning`);
    return res.json();
  },
  createReasoning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/reasoning`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getRetrieval: async () => {
    const res = await fetch(`${BASE_URL}/retrieval`);
    return res.json();
  },
  createRetrieval: async (data: any) => {
    const res = await fetch(`${BASE_URL}/retrieval`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getCitation: async () => {
    const res = await fetch(`${BASE_URL}/citation`);
    return res.json();
  },
  createCitation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/citation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getGraph: async () => {
    const res = await fetch(`${BASE_URL}/graph`);
    return res.json();
  },
  createGraph: async (data: any) => {
    const res = await fetch(`${BASE_URL}/graph`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getStatistics: async () => {
    const res = await fetch(`${BASE_URL}/statistics`);
    return res.json();
  },
  createStatistics: async (data: any) => {
    const res = await fetch(`${BASE_URL}/statistics`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProgramming: async () => {
    const res = await fetch(`${BASE_URL}/programming`);
    return res.json();
  },
  createProgramming: async (data: any) => {
    const res = await fetch(`${BASE_URL}/programming`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getSimulation: async () => {
    const res = await fetch(`${BASE_URL}/simulation`);
    return res.json();
  },
  createSimulation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/simulation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getVision: async () => {
    const res = await fetch(`${BASE_URL}/vision`);
    return res.json();
  },
  createVision: async (data: any) => {
    const res = await fetch(`${BASE_URL}/vision`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMultimodal: async () => {
    const res = await fetch(`${BASE_URL}/multimodal`);
    return res.json();
  },
  createMultimodal: async (data: any) => {
    const res = await fetch(`${BASE_URL}/multimodal`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getSafety: async () => {
    const res = await fetch(`${BASE_URL}/safety`);
    return res.json();
  },
  createSafety: async (data: any) => {
    const res = await fetch(`${BASE_URL}/safety`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getInfrastructure: async () => {
    const res = await fetch(`${BASE_URL}/infrastructure`);
    return res.json();
  },
  createInfrastructure: async (data: any) => {
    const res = await fetch(`${BASE_URL}/infrastructure`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getAnalytics: async () => {
    const res = await fetch(`${BASE_URL}/analytics`);
    return res.json();
  },
  createAnalytics: async (data: any) => {
    const res = await fetch(`${BASE_URL}/analytics`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getLeaderboard: async () => {
    const res = await fetch(`${BASE_URL}/leaderboard`);
    return res.json();
  },
  createLeaderboard: async (data: any) => {
    const res = await fetch(`${BASE_URL}/leaderboard`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getReproducibility: async () => {
    const res = await fetch(`${BASE_URL}/reproducibility`);
    return res.json();
  },
  createReproducibility: async (data: any) => {
    const res = await fetch(`${BASE_URL}/reproducibility`, {
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
  getImprovement: async () => {
    const res = await fetch(`${BASE_URL}/improvement`);
    return res.json();
  },
  createImprovement: async (data: any) => {
    const res = await fetch(`${BASE_URL}/improvement`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getBioevalIndex: async () => {
    const res = await fetch(`${BASE_URL}/bioeval_index`);
    return res.json();
  },
  createBioevalIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/bioeval_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
