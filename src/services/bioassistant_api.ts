// Auto-generated API service for bioassistant
const BASE_URL = '/api/v1/bioassistant';

export const BioassistantAPI = {
  getAssistant: async () => {
    const res = await fetch(`${BASE_URL}/assistant`);
    return res.json();
  },
  createAssistant: async (data: any) => {
    const res = await fetch(`${BASE_URL}/assistant`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getUserProfile: async () => {
    const res = await fetch(`${BASE_URL}/user_profile`);
    return res.json();
  },
  createUserProfile: async (data: any) => {
    const res = await fetch(`${BASE_URL}/user_profile`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getResearchWorkspace: async () => {
    const res = await fetch(`${BASE_URL}/research_workspace`);
    return res.json();
  },
  createResearchWorkspace: async (data: any) => {
    const res = await fetch(`${BASE_URL}/research_workspace`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProject: async () => {
    const res = await fetch(`${BASE_URL}/project`);
    return res.json();
  },
  createProject: async (data: any) => {
    const res = await fetch(`${BASE_URL}/project`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getLiteratureWorkspace: async () => {
    const res = await fetch(`${BASE_URL}/literature_workspace`);
    return res.json();
  },
  createLiteratureWorkspace: async (data: any) => {
    const res = await fetch(`${BASE_URL}/literature_workspace`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getWriting: async () => {
    const res = await fetch(`${BASE_URL}/writing`);
    return res.json();
  },
  createWriting: async (data: any) => {
    const res = await fetch(`${BASE_URL}/writing`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProgrammingWorkspace: async () => {
    const res = await fetch(`${BASE_URL}/programming_workspace`);
    return res.json();
  },
  createProgrammingWorkspace: async (data: any) => {
    const res = await fetch(`${BASE_URL}/programming_workspace`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getStatisticsWorkspace: async () => {
    const res = await fetch(`${BASE_URL}/statistics_workspace`);
    return res.json();
  },
  createStatisticsWorkspace: async (data: any) => {
    const res = await fetch(`${BASE_URL}/statistics_workspace`, {
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
  getMeeting: async () => {
    const res = await fetch(`${BASE_URL}/meeting`);
    return res.json();
  },
  createMeeting: async (data: any) => {
    const res = await fetch(`${BASE_URL}/meeting`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getLaboratory: async () => {
    const res = await fetch(`${BASE_URL}/laboratory`);
    return res.json();
  },
  createLaboratory: async (data: any) => {
    const res = await fetch(`${BASE_URL}/laboratory`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getFunding: async () => {
    const res = await fetch(`${BASE_URL}/funding`);
    return res.json();
  },
  createFunding: async (data: any) => {
    const res = await fetch(`${BASE_URL}/funding`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getConference: async () => {
    const res = await fetch(`${BASE_URL}/conference`);
    return res.json();
  },
  createConference: async (data: any) => {
    const res = await fetch(`${BASE_URL}/conference`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getPersonalization: async () => {
    const res = await fetch(`${BASE_URL}/personalization`);
    return res.json();
  },
  createPersonalization: async (data: any) => {
    const res = await fetch(`${BASE_URL}/personalization`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMemoryPreferences: async () => {
    const res = await fetch(`${BASE_URL}/memory_preferences`);
    return res.json();
  },
  createMemoryPreferences: async (data: any) => {
    const res = await fetch(`${BASE_URL}/memory_preferences`, {
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
  getProductivity: async () => {
    const res = await fetch(`${BASE_URL}/productivity`);
    return res.json();
  },
  createProductivity: async (data: any) => {
    const res = await fetch(`${BASE_URL}/productivity`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
