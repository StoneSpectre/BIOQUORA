// Auto-generated API service for bioworkflow
const BASE_URL = '/api/v1/bioworkflow';

export const BioworkflowAPI = {
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
  getWorkflowTemplate: async () => {
    const res = await fetch(`${BASE_URL}/workflow_template`);
    return res.json();
  },
  createWorkflowTemplate: async (data: any) => {
    const res = await fetch(`${BASE_URL}/workflow_template`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getExecution: async () => {
    const res = await fetch(`${BASE_URL}/execution`);
    return res.json();
  },
  createExecution: async (data: any) => {
    const res = await fetch(`${BASE_URL}/execution`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDependency: async () => {
    const res = await fetch(`${BASE_URL}/dependency`);
    return res.json();
  },
  createDependency: async (data: any) => {
    const res = await fetch(`${BASE_URL}/dependency`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getScheduler: async () => {
    const res = await fetch(`${BASE_URL}/scheduler`);
    return res.json();
  },
  createScheduler: async (data: any) => {
    const res = await fetch(`${BASE_URL}/scheduler`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getExperiment: async () => {
    const res = await fetch(`${BASE_URL}/experiment`);
    return res.json();
  },
  createExperiment: async (data: any) => {
    const res = await fetch(`${BASE_URL}/experiment`, {
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
  getPublication: async () => {
    const res = await fetch(`${BASE_URL}/publication`);
    return res.json();
  },
  createPublication: async (data: any) => {
    const res = await fetch(`${BASE_URL}/publication`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getCollaboration: async () => {
    const res = await fetch(`${BASE_URL}/collaboration`);
    return res.json();
  },
  createCollaboration: async (data: any) => {
    const res = await fetch(`${BASE_URL}/collaboration`, {
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
  getMilestone: async () => {
    const res = await fetch(`${BASE_URL}/milestone`);
    return res.json();
  },
  createMilestone: async (data: any) => {
    const res = await fetch(`${BASE_URL}/milestone`, {
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
  getBioworkflowIndex: async () => {
    const res = await fetch(`${BASE_URL}/bioworkflow_index`);
    return res.json();
  },
  createBioworkflowIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/bioworkflow_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
