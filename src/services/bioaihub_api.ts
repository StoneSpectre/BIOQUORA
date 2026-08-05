// Auto-generated API service for bioaihub
const BASE_URL = '/api/v1/bioaihub';

export const BioaihubAPI = {
  getDeveloper: async () => {
    const res = await fetch(`${BASE_URL}/developer`);
    return res.json();
  },
  createDeveloper: async (data: any) => {
    const res = await fetch(`${BASE_URL}/developer`, {
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
  getSdk: async () => {
    const res = await fetch(`${BASE_URL}/sdk`);
    return res.json();
  },
  createSdk: async (data: any) => {
    const res = await fetch(`${BASE_URL}/sdk`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getPlugin: async () => {
    const res = await fetch(`${BASE_URL}/plugin`);
    return res.json();
  },
  createPlugin: async (data: any) => {
    const res = await fetch(`${BASE_URL}/plugin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getExtension: async () => {
    const res = await fetch(`${BASE_URL}/extension`);
    return res.json();
  },
  createExtension: async (data: any) => {
    const res = await fetch(`${BASE_URL}/extension`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMarketplace: async () => {
    const res = await fetch(`${BASE_URL}/marketplace`);
    return res.json();
  },
  createMarketplace: async (data: any) => {
    const res = await fetch(`${BASE_URL}/marketplace`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getWorkflowMarket: async () => {
    const res = await fetch(`${BASE_URL}/workflow_market`);
    return res.json();
  },
  createWorkflowMarket: async (data: any) => {
    const res = await fetch(`${BASE_URL}/workflow_market`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getAgentMarket: async () => {
    const res = await fetch(`${BASE_URL}/agent_market`);
    return res.json();
  },
  createAgentMarket: async (data: any) => {
    const res = await fetch(`${BASE_URL}/agent_market`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getModelMarket: async () => {
    const res = await fetch(`${BASE_URL}/model_market`);
    return res.json();
  },
  createModelMarket: async (data: any) => {
    const res = await fetch(`${BASE_URL}/model_market`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDatasetMarket: async () => {
    const res = await fetch(`${BASE_URL}/dataset_market`);
    return res.json();
  },
  createDatasetMarket: async (data: any) => {
    const res = await fetch(`${BASE_URL}/dataset_market`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getBilling: async () => {
    const res = await fetch(`${BASE_URL}/billing`);
    return res.json();
  },
  createBilling: async (data: any) => {
    const res = await fetch(`${BASE_URL}/billing`, {
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
  getCertification: async () => {
    const res = await fetch(`${BASE_URL}/certification`);
    return res.json();
  },
  createCertification: async (data: any) => {
    const res = await fetch(`${BASE_URL}/certification`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getEnterprise: async () => {
    const res = await fetch(`${BASE_URL}/enterprise`);
    return res.json();
  },
  createEnterprise: async (data: any) => {
    const res = await fetch(`${BASE_URL}/enterprise`, {
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
  getCommunity: async () => {
    const res = await fetch(`${BASE_URL}/community`);
    return res.json();
  },
  createCommunity: async (data: any) => {
    const res = await fetch(`${BASE_URL}/community`, {
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
  getIntegration: async () => {
    const res = await fetch(`${BASE_URL}/integration`);
    return res.json();
  },
  createIntegration: async (data: any) => {
    const res = await fetch(`${BASE_URL}/integration`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getBioaihubIndex: async () => {
    const res = await fetch(`${BASE_URL}/bioaihub_index`);
    return res.json();
  },
  createBioaihubIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/bioaihub_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
