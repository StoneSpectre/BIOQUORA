// Auto-generated API service for biofactory
const BASE_URL = '/api/v1/biofactory';

export const BiofactoryAPI = {
  getAcquisition: async () => {
    const res = await fetch(`${BASE_URL}/acquisition`);
    return res.json();
  },
  createAcquisition: async (data: any) => {
    const res = await fetch(`${BASE_URL}/acquisition`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getLiterature: async () => {
    const res = await fetch(`${BASE_URL}/literature`);
    return res.json();
  },
  createLiterature: async (data: any) => {
    const res = await fetch(`${BASE_URL}/literature`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDataset: async () => {
    const res = await fetch(`${BASE_URL}/dataset`);
    return res.json();
  },
  createDataset: async (data: any) => {
    const res = await fetch(`${BASE_URL}/dataset`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getAnnotation: async () => {
    const res = await fetch(`${BASE_URL}/annotation`);
    return res.json();
  },
  createAnnotation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/annotation`, {
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
  getEmbedding: async () => {
    const res = await fetch(`${BASE_URL}/embedding`);
    return res.json();
  },
  createEmbedding: async (data: any) => {
    const res = await fetch(`${BASE_URL}/embedding`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getVector: async () => {
    const res = await fetch(`${BASE_URL}/vector`);
    return res.json();
  },
  createVector: async (data: any) => {
    const res = await fetch(`${BASE_URL}/vector`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getOntology: async () => {
    const res = await fetch(`${BASE_URL}/ontology`);
    return res.json();
  },
  createOntology: async (data: any) => {
    const res = await fetch(`${BASE_URL}/ontology`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getTaxonomy: async () => {
    const res = await fetch(`${BASE_URL}/taxonomy`);
    return res.json();
  },
  createTaxonomy: async (data: any) => {
    const res = await fetch(`${BASE_URL}/taxonomy`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMetadata: async () => {
    const res = await fetch(`${BASE_URL}/metadata`);
    return res.json();
  },
  createMetadata: async (data: any) => {
    const res = await fetch(`${BASE_URL}/metadata`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getModel: async () => {
    const res = await fetch(`${BASE_URL}/model`);
    return res.json();
  },
  createModel: async (data: any) => {
    const res = await fetch(`${BASE_URL}/model`, {
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
  getMonitoring: async () => {
    const res = await fetch(`${BASE_URL}/monitoring`);
    return res.json();
  },
  createMonitoring: async (data: any) => {
    const res = await fetch(`${BASE_URL}/monitoring`, {
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
  getProduction: async () => {
    const res = await fetch(`${BASE_URL}/production`);
    return res.json();
  },
  createProduction: async (data: any) => {
    const res = await fetch(`${BASE_URL}/production`, {
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
  getBiofactoryIndex: async () => {
    const res = await fetch(`${BASE_URL}/biofactory_index`);
    return res.json();
  },
  createBiofactoryIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/biofactory_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
