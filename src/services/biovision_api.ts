// Auto-generated API service for biovision
const BASE_URL = '/api/v1/biovision';

export const BiovisionAPI = {
  getImage: async () => {
    const res = await fetch(`${BASE_URL}/image`);
    return res.json();
  },
  createImage: async (data: any) => {
    const res = await fetch(`${BASE_URL}/image`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMicroscopy: async () => {
    const res = await fetch(`${BASE_URL}/microscopy`);
    return res.json();
  },
  createMicroscopy: async (data: any) => {
    const res = await fetch(`${BASE_URL}/microscopy`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getPathology: async () => {
    const res = await fetch(`${BASE_URL}/pathology`);
    return res.json();
  },
  createPathology: async (data: any) => {
    const res = await fetch(`${BASE_URL}/pathology`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getRadiology: async () => {
    const res = await fetch(`${BASE_URL}/radiology`);
    return res.json();
  },
  createRadiology: async (data: any) => {
    const res = await fetch(`${BASE_URL}/radiology`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMoleculeVisual: async () => {
    const res = await fetch(`${BASE_URL}/molecule_visual`);
    return res.json();
  },
  createMoleculeVisual: async (data: any) => {
    const res = await fetch(`${BASE_URL}/molecule_visual`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProteinStructure: async () => {
    const res = await fetch(`${BASE_URL}/protein_structure`);
    return res.json();
  },
  createProteinStructure: async (data: any) => {
    const res = await fetch(`${BASE_URL}/protein_structure`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getGenomicsVisual: async () => {
    const res = await fetch(`${BASE_URL}/genomics_visual`);
    return res.json();
  },
  createGenomicsVisual: async (data: any) => {
    const res = await fetch(`${BASE_URL}/genomics_visual`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getOmics: async () => {
    const res = await fetch(`${BASE_URL}/omics`);
    return res.json();
  },
  createOmics: async (data: any) => {
    const res = await fetch(`${BASE_URL}/omics`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getFigure: async () => {
    const res = await fetch(`${BASE_URL}/figure`);
    return res.json();
  },
  createFigure: async (data: any) => {
    const res = await fetch(`${BASE_URL}/figure`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getTable: async () => {
    const res = await fetch(`${BASE_URL}/table`);
    return res.json();
  },
  createTable: async (data: any) => {
    const res = await fetch(`${BASE_URL}/table`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getVideo: async () => {
    const res = await fetch(`${BASE_URL}/video`);
    return res.json();
  },
  createVideo: async (data: any) => {
    const res = await fetch(`${BASE_URL}/video`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getAudio: async () => {
    const res = await fetch(`${BASE_URL}/audio`);
    return res.json();
  },
  createAudio: async (data: any) => {
    const res = await fetch(`${BASE_URL}/audio`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMultimodalEmbedding: async () => {
    const res = await fetch(`${BASE_URL}/multimodal_embedding`);
    return res.json();
  },
  createMultimodalEmbedding: async (data: any) => {
    const res = await fetch(`${BASE_URL}/multimodal_embedding`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getSegmentation: async () => {
    const res = await fetch(`${BASE_URL}/segmentation`);
    return res.json();
  },
  createSegmentation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/segmentation`, {
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
  getExplanation: async () => {
    const res = await fetch(`${BASE_URL}/explanation`);
    return res.json();
  },
  createExplanation: async (data: any) => {
    const res = await fetch(`${BASE_URL}/explanation`, {
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
  getMultimodalIndex: async () => {
    const res = await fetch(`${BASE_URL}/multimodal_index`);
    return res.json();
  },
  createMultimodalIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/multimodal_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
