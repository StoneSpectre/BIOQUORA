// Auto-generated API service for biosafe
const BASE_URL = '/api/v1/biosafe';

export const BiosafeAPI = {
  getIdentity: async () => {
    const res = await fetch(`${BASE_URL}/identity`);
    return res.json();
  },
  createIdentity: async (data: any) => {
    const res = await fetch(`${BASE_URL}/identity`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getAuthentication: async () => {
    const res = await fetch(`${BASE_URL}/authentication`);
    return res.json();
  },
  createAuthentication: async (data: any) => {
    const res = await fetch(`${BASE_URL}/authentication`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getAuthorization: async () => {
    const res = await fetch(`${BASE_URL}/authorization`);
    return res.json();
  },
  createAuthorization: async (data: any) => {
    const res = await fetch(`${BASE_URL}/authorization`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getPolicy: async () => {
    const res = await fetch(`${BASE_URL}/policy`);
    return res.json();
  },
  createPolicy: async (data: any) => {
    const res = await fetch(`${BASE_URL}/policy`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getPrivacy: async () => {
    const res = await fetch(`${BASE_URL}/privacy`);
    return res.json();
  },
  createPrivacy: async (data: any) => {
    const res = await fetch(`${BASE_URL}/privacy`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getRisk: async () => {
    const res = await fetch(`${BASE_URL}/risk`);
    return res.json();
  },
  createRisk: async (data: any) => {
    const res = await fetch(`${BASE_URL}/risk`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getCompliance: async () => {
    const res = await fetch(`${BASE_URL}/compliance`);
    return res.json();
  },
  createCompliance: async (data: any) => {
    const res = await fetch(`${BASE_URL}/compliance`, {
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
  getIncident: async () => {
    const res = await fetch(`${BASE_URL}/incident`);
    return res.json();
  },
  createIncident: async (data: any) => {
    const res = await fetch(`${BASE_URL}/incident`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getSecurityEvent: async () => {
    const res = await fetch(`${BASE_URL}/security_event`);
    return res.json();
  },
  createSecurityEvent: async (data: any) => {
    const res = await fetch(`${BASE_URL}/security_event`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getModelSecurity: async () => {
    const res = await fetch(`${BASE_URL}/model_security`);
    return res.json();
  },
  createModelSecurity: async (data: any) => {
    const res = await fetch(`${BASE_URL}/model_security`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getApiSecurity: async () => {
    const res = await fetch(`${BASE_URL}/api_security`);
    return res.json();
  },
  createApiSecurity: async (data: any) => {
    const res = await fetch(`${BASE_URL}/api_security`, {
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
  getThreat: async () => {
    const res = await fetch(`${BASE_URL}/threat`);
    return res.json();
  },
  createThreat: async (data: any) => {
    const res = await fetch(`${BASE_URL}/threat`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getTrust: async () => {
    const res = await fetch(`${BASE_URL}/trust`);
    return res.json();
  },
  createTrust: async (data: any) => {
    const res = await fetch(`${BASE_URL}/trust`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getBiosafeIndex: async () => {
    const res = await fetch(`${BASE_URL}/biosafe_index`);
    return res.json();
  },
  createBiosafeIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/biosafe_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
