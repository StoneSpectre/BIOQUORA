// Auto-generated API service for bioretriever
const BASE_URL = '/api/v1/bioretriever';

export const BioretrieverAPI = {
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
  getSemanticIndex: async () => {
    const res = await fetch(`${BASE_URL}/semantic_index`);
    return res.json();
  },
  createSemanticIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/semantic_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getVectorIndex: async () => {
    const res = await fetch(`${BASE_URL}/vector_index`);
    return res.json();
  },
  createVectorIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/vector_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getGraphIndex: async () => {
    const res = await fetch(`${BASE_URL}/graph_index`);
    return res.json();
  },
  createGraphIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/graph_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getCitationIndex: async () => {
    const res = await fetch(`${BASE_URL}/citation_index`);
    return res.json();
  },
  createCitationIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/citation_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getOntologyIndex: async () => {
    const res = await fetch(`${BASE_URL}/ontology_index`);
    return res.json();
  },
  createOntologyIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/ontology_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getDatasetIndex: async () => {
    const res = await fetch(`${BASE_URL}/dataset_index`);
    return res.json();
  },
  createDatasetIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/dataset_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getSoftwareIndex: async () => {
    const res = await fetch(`${BASE_URL}/software_index`);
    return res.json();
  },
  createSoftwareIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/software_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProtocolIndex: async () => {
    const res = await fetch(`${BASE_URL}/protocol_index`);
    return res.json();
  },
  createProtocolIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/protocol_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getModelIndex: async () => {
    const res = await fetch(`${BASE_URL}/model_index`);
    return res.json();
  },
  createModelIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/model_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getEducationIndex: async () => {
    const res = await fetch(`${BASE_URL}/education_index`);
    return res.json();
  },
  createEducationIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/education_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getMolecularIndex: async () => {
    const res = await fetch(`${BASE_URL}/molecular_index`);
    return res.json();
  },
  createMolecularIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/molecular_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProteinIndex: async () => {
    const res = await fetch(`${BASE_URL}/protein_index`);
    return res.json();
  },
  createProteinIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/protein_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getGenomicIndex: async () => {
    const res = await fetch(`${BASE_URL}/genomic_index`);
    return res.json();
  },
  createGenomicIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/genomic_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getClinicalIndex: async () => {
    const res = await fetch(`${BASE_URL}/clinical_index`);
    return res.json();
  },
  createClinicalIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/clinical_index`, {
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
  getEvidenceIndex: async () => {
    const res = await fetch(`${BASE_URL}/evidence_index`);
    return res.json();
  },
  createEvidenceIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/evidence_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getRankingIndex: async () => {
    const res = await fetch(`${BASE_URL}/ranking_index`);
    return res.json();
  },
  createRankingIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/ranking_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getProvenanceIndex: async () => {
    const res = await fetch(`${BASE_URL}/provenance_index`);
    return res.json();
  },
  createProvenanceIndex: async (data: any) => {
    const res = await fetch(`${BASE_URL}/provenance_index`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
  getIndexing: async () => {
    const res = await fetch(`${BASE_URL}/indexing`);
    return res.json();
  },
  createIndexing: async (data: any) => {
    const res = await fetch(`${BASE_URL}/indexing`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    return res.json();
  },
};
