// Auto-generated API service for biocoder
const BASE_URL = '/api/v1/biocoder';

export const BiocoderAPI = {
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
  getSoftware: async () => {
    const res = await fetch(`${BASE_URL}/software`);
    return res.json();
  },
  createSoftware: async (data: any) => {
    const res = await fetch(`${BASE_URL}/software`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getNotebook: async () => {
    const res = await fetch(`${BASE_URL}/notebook`);
    return res.json();
  },
  createNotebook: async (data: any) => {
    const res = await fetch(`${BASE_URL}/notebook`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getWorkflow: async () => {
    const res = await fetch(`${BASE_URL}/workflow`);
    return res.json();
  },
  createWorkflow: async (data: any) => {
    const res = await fetch(`${BASE_URL}/workflow`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getPipeline: async () => {
    const res = await fetch(`${BASE_URL}/pipeline`);
    return res.json();
  },
  createPipeline: async (data: any) => {
    const res = await fetch(`${BASE_URL}/pipeline`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getTesting: async () => {
    const res = await fetch(`${BASE_URL}/testing`);
    return res.json();
  },
  createTesting: async (data: any) => {
    const res = await fetch(`${BASE_URL}/testing`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDebugging: async () => {
    const res = await fetch(`${BASE_URL}/debugging`);
    return res.json();
  },
  createDebugging: async (data: any) => {
    const res = await fetch(`${BASE_URL}/debugging`, {
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
  getDocumentation: async () => {
    const res = await fetch(`${BASE_URL}/documentation`);
    return res.json();
  },
  createDocumentation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/documentation`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getApi: async () => {
    const res = await fetch(`${BASE_URL}/api`);
    return res.json();
  },
  createApi: async (data: any) => {
    const res = await fetch(`${BASE_URL}/api`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDatabase: async () => {
    const res = await fetch(`${BASE_URL}/database`);
    return res.json();
  },
  createDatabase: async (data: any) => {
    const res = await fetch(`${BASE_URL}/database`, {
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
  getMl: async () => {
    const res = await fetch(`${BASE_URL}/ml`);
    return res.json();
  },
  createMl: async (data: any) => {
    const res = await fetch(`${BASE_URL}/ml`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDeepLearning: async () => {
    const res = await fetch(`${BASE_URL}/deep_learning`);
    return res.json();
  },
  createDeepLearning: async (data: any) => {
    const res = await fetch(`${BASE_URL}/deep_learning`, {
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
  getVisualization: async () => {
    const res = await fetch(`${BASE_URL}/visualization`);
    return res.json();
  },
  createVisualization: async (data: any) => {
    const res = await fetch(`${BASE_URL}/visualization`, {
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
  getDeployment: async () => {
    const res = await fetch(`${BASE_URL}/deployment`);
    return res.json();
  },
  createDeployment: async (data: any) => {
    const res = await fetch(`${BASE_URL}/deployment`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
