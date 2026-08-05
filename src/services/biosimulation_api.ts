// Auto-generated API service for biosimulation
const BASE_URL = '/api/v1/biosimulation';

export const BiosimulationAPI = {
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
  getMolecularModel: async () => {
    const res = await fetch(`${BASE_URL}/molecular_model`);
    return res.json();
  },
  createMolecularModel: async (data: any) => {
    const res = await fetch(`${BASE_URL}/molecular_model`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProteinModel: async () => {
    const res = await fetch(`${BASE_URL}/protein_model`);
    return res.json();
  },
  createProteinModel: async (data: any) => {
    const res = await fetch(`${BASE_URL}/protein_model`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getCellularModel: async () => {
    const res = await fetch(`${BASE_URL}/cellular_model`);
    return res.json();
  },
  createCellularModel: async (data: any) => {
    const res = await fetch(`${BASE_URL}/cellular_model`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getTissueModel: async () => {
    const res = await fetch(`${BASE_URL}/tissue_model`);
    return res.json();
  },
  createTissueModel: async (data: any) => {
    const res = await fetch(`${BASE_URL}/tissue_model`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getPhysiologyModel: async () => {
    const res = await fetch(`${BASE_URL}/physiology_model`);
    return res.json();
  },
  createPhysiologyModel: async (data: any) => {
    const res = await fetch(`${BASE_URL}/physiology_model`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getSystemsBiology: async () => {
    const res = await fetch(`${BASE_URL}/systems_biology`);
    return res.json();
  },
  createSystemsBiology: async (data: any) => {
    const res = await fetch(`${BASE_URL}/systems_biology`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getOmicsModel: async () => {
    const res = await fetch(`${BASE_URL}/omics_model`);
    return res.json();
  },
  createOmicsModel: async (data: any) => {
    const res = await fetch(`${BASE_URL}/omics_model`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDiseaseModel: async () => {
    const res = await fetch(`${BASE_URL}/disease_model`);
    return res.json();
  },
  createDiseaseModel: async (data: any) => {
    const res = await fetch(`${BASE_URL}/disease_model`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getPkPd: async () => {
    const res = await fetch(`${BASE_URL}/pk_pd`);
    return res.json();
  },
  createPkPd: async (data: any) => {
    const res = await fetch(`${BASE_URL}/pk_pd`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getEpidemiology: async () => {
    const res = await fetch(`${BASE_URL}/epidemiology`);
    return res.json();
  },
  createEpidemiology: async (data: any) => {
    const res = await fetch(`${BASE_URL}/epidemiology`, {
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
  getDigitalTwin: async () => {
    const res = await fetch(`${BASE_URL}/digital_twin`);
    return res.json();
  },
  createDigitalTwin: async (data: any) => {
    const res = await fetch(`${BASE_URL}/digital_twin`, {
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
  getSensitivity: async () => {
    const res = await fetch(`${BASE_URL}/sensitivity`);
    return res.json();
  },
  createSensitivity: async (data: any) => {
    const res = await fetch(`${BASE_URL}/sensitivity`, {
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
  getSimulationIndex: async () => {
    const res = await fetch(`${BASE_URL}/simulation_index`);
    return res.json();
  },
  createSimulationIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/simulation_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
