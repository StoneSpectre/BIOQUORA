# BIOQUORA FOUNDER BIBLE

## STEP 1.2 — PubMed Central (PMC) Ecosystem (God Mode Deep Implementation)

### 1. Overview
PubMed Central (PMC) is the largest free full-text biomedical literature repository in the world.
Maintained by the National Library of Medicine (NLM), National Center for Biotechnology Information (NCBI), and National Institutes of Health (NIH).
Unlike PubMed, PMC stores complete articles.

### 2. Official Resources
* **Main Portal**: [pmc.ncbi.nlm.nih.gov](https://pmc.ncbi.nlm.nih.gov)
* **About PMC**: [pmc.ncbi.nlm.nih.gov/about/](https://pmc.ncbi.nlm.nih.gov/about/)
* **PMC Open Access**: [pmc.ncbi.nlm.nih.gov/tools/openftlist/](https://pmc.ncbi.nlm.nih.gov/tools/openftlist/)
* **FTP Server**: [ftp.ncbi.nlm.nih.gov/pub/pmc/](https://ftp.ncbi.nlm.nih.gov/pub/pmc/)
* **Bulk Downloads**: [ftp.ncbi.nlm.nih.gov/pub/pmc/oa_bulk/](https://ftp.ncbi.nlm.nih.gov/pub/pmc/oa_bulk/)
* **Open Access XML**: [ftp.ncbi.nlm.nih.gov/pub/pmc/oa_bulk/xml/](https://ftp.ncbi.nlm.nih.gov/pub/pmc/oa_bulk/xml/)
* **Open Access PDFs**: [ftp.ncbi.nlm.nih.gov/pub/pmc/oa_bulk/pdf/](https://ftp.ncbi.nlm.nih.gov/pub/pmc/oa_bulk/pdf/)
* **API**: [ncbi.nlm.nih.gov/pmc/tools/developers/](https://www.ncbi.nlm.nih.gov/pmc/tools/developers/)

### 3. Data Scale
Approximately:
* 10+ million full-text articles
* 8+ TB of XML and PDFs
* Thousands of journals
* Updated daily
* Millions of images
* Millions of tables
* Millions of supplementary files

---

### 4. What to Extract

**Bibliographic Metadata**
* PMCID, PMID, DOI, Title, Subtitle, Journal, ISSN, Publisher, Publication Date, Authors, Affiliations, ORCID.

**Full Text**
* Abstract, Introduction, Background, Materials & Methods, Methods, Results, Discussion, Conclusion, Future Work, Acknowledgements, Funding, References.

**Figures**
* Images, Captions, Figure legends, Labels, Figure numbering. *(Store separately)*.

**Tables**
* Headers, Rows, Values, Footnotes, Captions. *(Convert into structured JSON)*.

**Supplementary Files**
* CSV, Excel, Images, Videos, PDF, ZIP, FASTA, VCF, GTF, BAM, CRAM.

**Mathematical Content**
* Equations, LaTeX, MathML, Symbols.

**References**
* DOI, PMID, Authors, Journal, Citation Context, Year. *(Build citation graph)*.

---

### 5. XML Structure
PMC XML contains standard JATS tags:
`<article>`, `<front>`, `<body>`, `<sec>`, `<p>`, `<table-wrap>`, `<fig>`, `<back>`, `<ref-list>`
Every tag should be parsed.

---

### 6. APIs
* **Search API**: Search articles
* **OAI-PMH**: Harvest metadata
* **FTP**: Bulk download
* **ID Converter API**: PMID ↔ PMCID ↔ DOI - [pmc.ncbi.nlm.nih.gov/tools/idconv-api/](https://pmc.ncbi.nlm.nih.gov/tools/idconv-api/)

---

### 7. Licenses
Store and respect licenses:
CC-BY, CC-BY-SA, CC0, CC-BY-NC, Publisher License.
*Only redistribute content according to each article's license.*

---

### 8. AI Extraction

**Named Entity Recognition**
* Diseases, Drugs, Genes, Proteins, Chemicals, Organisms, Cell Types, Biomarkers.

**Relation Extraction**
* Drug → Treats → Disease
* Gene → Associated With → Disease
* Protein → Interacts → Protein
* Mutation → Causes → Disease

**Summarization**
* Short summary, Detailed summary, Clinical implications, Research limitations, Future directions.

---

### 9. Embeddings
Create embeddings for:
* Full article
* Abstract
* Paragraph
* Figure caption
* Table
* Section
* Reference context

---

### 10. Knowledge Graph
**Nodes**:
Paper, Figure, Table, Author, Institution, Journal, Disease, Drug, Gene, Protein, Pathway, Clinical Trial.

**Edges**:
cites, authored_by, contains_figure, contains_table, discusses, validates, contradicts, extends.

---

### 11. Storage Pipeline
`PMC` → `XML` → `Parser` → `JSON` → `Entity Extraction` → `Embeddings` → `Knowledge Graph` → `Vector Database` → `Bioquora Search`

---

### 12. Research Papers About PMC
* **PMC Overview**: [pmc.ncbi.nlm.nih.gov/articles/PMC1423005/](https://pmc.ncbi.nlm.nih.gov/articles/PMC1423005/)
* **PMC XML Specification**: [jats.nlm.nih.gov](https://jats.nlm.nih.gov)
* **NISO JATS Standard**: [jats.nlm.nih.gov/publishing/](https://jats.nlm.nih.gov/publishing/)
* **PMC Developer Guide**: [ncbi.nlm.nih.gov/pmc/tools/developers/](https://www.ncbi.nlm.nih.gov/pmc/tools/developers/)

---

### 13. GitHub Projects
* **PMC XML Parser**: [github.com/titipata/pubmed_parser](https://github.com/titipata/pubmed_parser)
* **GROBID**: [github.com/kermitt2/grobid](https://github.com/kermitt2/grobid)
* **Science Parse**: [github.com/allenai/science-parse](https://github.com/allenai/science-parse)
* **Unstructured**: [github.com/Unstructured-IO/unstructured](https://github.com/Unstructured-IO/unstructured)
* **Marker**: [github.com/VikParuchuri/marker](https://github.com/VikParuchuri/marker)

---

### 14. Python Libraries
Biopython, pubmed-parser, lxml, BeautifulSoup, xmltodict, pymupdf, pdfplumber.

---

### 15. Integration into Bioquora
PMC becomes the full-text intelligence layer.

**Pipeline**:
`PMC XML/PDF` → `Full-text parser` → `Section extraction` → `Figure & table extraction` → `Named entity recognition` → `Relationship extraction` → `Citation graph` → `Knowledge graph` → `Embeddings` → `Hybrid search (keyword + semantic)` → `Biomedical reasoning engine`

PMC complements PubMed: PubMed provides rich metadata and abstracts, while PMC supplies the full text, figures, tables, and supplementary materials needed for deeper retrieval, knowledge graph construction, and evidence synthesis.

---

### STEP 1.2 Status
✅ **PubMed Central (PMC): 100% Deeply Implemented**

**BioLiterature Progress**
* ✅ Step 1.1: PubMed
* ✅ Step 1.2: PubMed Central (PMC)

*Next: Step 1.3 — Europe PMC, covering literature, preprints, grants, patents, APIs, ORCID integration, text mining annotations, bulk downloads, and linked biomedical resources in the same level of depth.*
