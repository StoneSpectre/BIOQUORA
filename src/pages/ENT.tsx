import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Ear, Search, Database, BookOpen, Activity, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { searchPubMed, type PubMedArticle } from "@/lib/pubmed";
import { searchClinicalTrials, type ClinicalTrial } from "@/lib/clinicaltrials";

const ENT = () => {
  const { markModuleVisited } = useProgressTracking();

  const [pubmedQuery, setPubmedQuery] = useState("Otitis Media Rhinitis");
  const [pubmedResults, setPubmedResults] = useState<PubMedArticle[]>([]);
  const [isSearchingPubMed, setIsSearchingPubMed] = useState(false);

  const [clinicalQuery, setClinicalQuery] = useState("Tonsillectomy");
  const [clinicalResults, setClinicalResults] = useState<ClinicalTrial[]>([]);
  const [isSearchingClinical, setIsSearchingClinical] = useState(false);

  useEffect(() => {
    markModuleVisited('ent');
    handlePubMedSearch();
    handleClinicalSearch();
  }, [markModuleVisited]);

  const handlePubMedSearch = async () => {
    setIsSearchingPubMed(true);
    const results = await searchPubMed(pubmedQuery, 5);
    setPubmedResults(results);
    setIsSearchingPubMed(false);
  };

  const handleClinicalSearch = async () => {
    setIsSearchingClinical(true);
    const results = await searchClinicalTrials(clinicalQuery, 4);
    setClinicalResults(results);
    setIsSearchingClinical(false);
  };

  return (
    <Layout>
      <div className="container py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
              <Ear className="h-5 w-5 text-orange-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold">Otorhinolaryngology (ENT)</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore conditions of the ear, nose, and throat, examining everything from infectious etiologies to structural pathologies and their interventions.
          </p>
        </div>

        <Tabs defaultValue="explorer" className="w-full">
          <TabsList className="mb-8 flex w-full max-w-3xl bg-muted/50 p-1 overflow-x-auto h-auto flex-wrap">
            <TabsTrigger value="explorer" className="flex-1 min-w-[150px] gap-2 py-2">
              <BookOpen className="h-4 w-4" /> Concept Explorer
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex-1 min-w-[150px] gap-2 py-2">
              <Activity className="h-4 w-4" /> Interactive Simulation
            </TabsTrigger>
            <TabsTrigger value="research" className="flex-1 min-w-[150px] gap-2 py-2">
              <Search className="h-4 w-4" /> Research Literature
            </TabsTrigger>
            <TabsTrigger value="datasets" className="flex-1 min-w-[150px] gap-2 py-2">
              <Database className="h-4 w-4" /> Dataset Hub
            </TabsTrigger>
          </TabsList>

          <TabsContent value="explorer" className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Disease & Concept Explorer</h2>
              <p className="text-muted-foreground mb-6">Detailed structured knowledge covering essential subheadings for ENT conditions.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="flex flex-col border-border/60 hover:border-orange-500/30 transition-colors shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
                  <CardTitle className="text-xl text-orange-500">Acute Otitis Media (AOM)</CardTitle>
                </CardHeader>
                <CardContent className="pt-5 flex-1">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="definitions">
                      <AccordionTrigger className="text-left font-medium">Definitions</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p><strong>Acute Otitis Media (AOM)</strong> is an acute inflammation of the middle ear cleft, defined by the rapid onset of signs and symptoms of infection (such as otalgia or fever) accompanied by the presence of a middle ear effusion (MEE).</p>
                        <p>It must be distinguished from <em>Otitis Media with Effusion (OME)</em>, which involves fluid in the middle ear without signs of acute infection.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="pathology">
                      <AccordionTrigger className="text-left font-medium">Pathophysiology & Microbiology</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p><strong>Mechanism:</strong> Almost always preceded by a viral upper respiratory infection (URI) that causes inflammation and edema of the respiratory mucosa in the nasopharynx and Eustachian tube. This Eustachian tube dysfunction leads to negative middle ear pressure, transudation of fluid, and impaired mucociliary clearance.</p>
                        <p><strong>Microbiology:</strong> The stagnant fluid becomes secondarily colonized by bacteria ascending from the nasopharynx. The most common bacterial pathogens are <em>Streptococcus pneumoniae</em>, non-typable <em>Haemophilus influenzae</em>, and <em>Moraxella catarrhalis</em>. Viral co-infection (RSV, rhinovirus) is present in up to 50% of cases.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="clinical">
                      <AccordionTrigger className="text-left font-medium">Clinical Features</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Symptoms:</strong> Rapid onset of severe, throbbing ear pain (otalgia), fever, hearing loss, and disrupted sleep. Infants often present non-specifically with excessive crying, irritability, anorexia, and ear tugging/rubbing.</li>
                          <li><strong>Otorrhea:</strong> Purulent discharge may be seen if the tympanic membrane ruptures, which paradoxically brings immediate relief of pain due to pressure release.</li>
                          <li><strong>Otoscopic Findings:</strong> The tympanic membrane (TM) appears distinctly bulging, erythematous (red), opaque (cloudy), with a loss of the normal light reflex and obscured anatomical landmarks (like the handle of the malleus).</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="investigations">
                      <AccordionTrigger className="text-left font-medium">Investigations</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Pneumatic Otoscopy:</strong> The gold standard for diagnosis; demonstrates impaired or absent mobility of the tympanic membrane in response to applied pressure.</li>
                          <li><strong>Tympanometry:</strong> Will typically yield a Type B (flat) tympanogram, indicating fluid behind the eardrum.</li>
                          <li><strong>Audiometry:</strong> Shows a mild to moderate conductive hearing loss (usually reversible once fluid clears).</li>
                          <li><strong>Tympanocentesis:</strong> Aspiration of middle ear fluid. Rarely performed in routine practice but is the gold standard for identifying the causative pathogen in severely ill, immunocompromised, or highly refractory patients.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="treatment">
                      <AccordionTrigger className="text-left font-medium">Treatment & Guidelines</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p><strong>Pain Management:</strong> Essential first step using oral Ibuprofen or Acetaminophen.</p>
                        <p><strong>Observation Strategy:</strong> "Watchful waiting" for 48-72 hours without antibiotics is recommended by AAP guidelines for children &gt;2 years with mild symptoms and unilateral disease, as many cases resolve spontaneously.</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Antibiotic Therapy:</strong> When indicated, high-dose <em>Amoxicillin</em> (80-90 mg/kg/day) is first-line to overcome S. pneumoniae resistance. If there is concurrent conjunctivitis (suggesting H. influenzae) or failure after 48-72 hours, switch to <em>Amoxicillin-clavulanate</em>.</li>
                          <li><strong>Surgical:</strong> Myringotomy with Tympanostomy tube placement is indicated for recurrent AOM (defined as &ge;3 distinct, well-documented episodes in 6 months, or &ge;4 episodes in 1 year with at least 1 in the past 6 months).</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card className="flex flex-col border-border/60 hover:border-orange-500/30 transition-colors shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
                  <CardTitle className="text-xl text-orange-500">Allergic Rhinitis</CardTitle>
                </CardHeader>
                <CardContent className="pt-5 flex-1">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="definitions">
                      <AccordionTrigger className="text-left font-medium">Definitions & Classification</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p><strong>Allergic Rhinitis</strong> is a symptomatic, IgE-mediated inflammatory disease of the nasal mucosa triggered by exposure to airborne allergens.</p>
                        <p>The ARIA (Allergic Rhinitis and its Impact on Asthma) guidelines classify it by duration (<em>Intermittent</em> vs. <em>Persistent</em>) and severity (<em>Mild</em> vs. <em>Moderate-Severe</em>) rather than the older seasonal/perennial classification.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="pathology">
                      <AccordionTrigger className="text-left font-medium">Pathophysiology</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p><strong>Sensitization Phase:</strong> Initial exposure to an allergen leads to presentation by Antigen-Presenting Cells, Th2 cell activation, and B-cell class switching to produce allergen-specific IgE, which binds to high-affinity Fc&epsilon;RI receptors on tissue mast cells and basophils.</p>
                        <p><strong>Early Phase Reaction (Minutes):</strong> Re-exposure causes cross-linking of surface IgE, triggering rapid mast cell degranulation and release of preformed mediators (histamine, tryptase) and newly synthesized lipids (leukotrienes, prostaglandins). This causes immediate sneezing, itching, and rhinorrhea.</p>
                        <p><strong>Late Phase Reaction (Hours):</strong> Cytokine release (IL-4, IL-5, IL-13) drives massive infiltration of eosinophils, basophils, and T-cells, causing sustained mucosal edema and chronic nasal congestion.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="clinical">
                      <AccordionTrigger className="text-left font-medium">Clinical Features</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Primary Symptoms:</strong> Paroxysmal sneezing, copious clear/watery rhinorrhea, bilateral nasal congestion, and intense pruritus of the nose, palate, and eyes.</li>
                          <li><strong>Physical Exam Findings:</strong> Rhinoscopy reveals swollen, pale, bluish, and boggy (edematous) nasal turbinates with clear secretions.</li>
                          <li><strong>Classic Stigmata (especially in children):</strong> <em>"Allergic shiners"</em> (dark circles under the eyes from infraorbital venous pooling), <em>"Allergic salute"</em> (upward rubbing of the nose), and a resulting transverse nasal crease across the bridge of the nose.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="investigations">
                      <AccordionTrigger className="text-left font-medium">Investigations</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Clinical Diagnosis:</strong> Often diagnosed entirely based on a characteristic history and physical exam without needing lab tests.</li>
                          <li><strong>Allergy Testing:</strong> To identify specific triggers for avoidance or immunotherapy, performed via <strong>Skin Prick Testing (SPT)</strong> (highly sensitive, immediate results) or Serum specific IgE testing (e.g., ImmunoCAP/RAST).</li>
                          <li><strong>Nasal Smear:</strong> May show an abundance of eosinophils, though rarely needed in routine clinical practice.</li>
                          <li><strong>Nasal Endoscopy:</strong> Useful to rule out structural abnormalities, nasal polyposis, or chronic rhinosinusitis.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="treatment">
                      <AccordionTrigger className="text-left font-medium">Pharmacotherapy & Immunotherapy</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Environmental Control:</strong> Allergen avoidance (e.g., HEPA filters, dust mite covers).</li>
                          <li><strong>1st-Line Medical: Intranasal Corticosteroids (INCS)</strong> (e.g., <em>Fluticasone, Budesonide, Mometasone</em>). These are the most effective single-agent therapy, particularly for nasal congestion, by suppressing the late-phase inflammatory response.</li>
                          <li><strong>Antihistamines:</strong> Second-generation oral H1-antagonists (e.g., <em>Cetirizine, Loratadine, Fexofenadine</em>) are excellent for sneezing and itching but poor for congestion. Intranasal antihistamines (<em>Azelastine</em>) provide faster onset.</li>
                          <li><strong>Adjuncts:</strong> Leukotriene receptor antagonists (<em>Montelukast</em>) are useful in patients with concurrent allergic asthma. Short-term topical decongestants (<em>Oxymetazoline</em>) can be used for &lt;3 days (risk of rhinitis medicamentosa).</li>
                          <li><strong>Allergen Immunotherapy (AIT):</strong> Subcutaneous (SCIT) or sublingual (SLIT) immunotherapy introduces escalating doses of the allergen to induce immune tolerance (shifting Th2 to Th1/Treg response). It is the only disease-modifying treatment.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="simulation" className="animate-fade-in">
            <Card className="p-12 border-border/60 shadow-sm flex flex-col items-center justify-center text-center">
              <Activity className="h-12 w-12 text-orange-500/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Auditory Simulation</h3>
              <p className="text-muted-foreground">Interactive tympanic and cochlear simulations are coming in the next update.</p>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6 animate-fade-in">
            <div className="flex gap-4 mb-8 bg-muted/30 p-2 rounded-lg border border-border/50">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search ENT literature..." 
                  className="w-full bg-background border-none rounded-md pl-9 pr-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  value={pubmedQuery}
                  onChange={(e) => setPubmedQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePubMedSearch()}
                />
              </div>
              <Button onClick={handlePubMedSearch} disabled={isSearchingPubMed}>
                {isSearchingPubMed ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Search
              </Button>
            </div>
            
            <div className="space-y-4">
              {isSearchingPubMed ? (
                <div className="text-center py-8 text-muted-foreground"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" /></div>
              ) : (
                pubmedResults.map((paper, i) => (
                  <Card key={i} className="p-5 border-border/60 hover:border-orange-500/40 hover:shadow-md transition-all cursor-pointer">
                    <h3 className="font-medium text-base text-orange-500 mb-1">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{paper.authors} • <i>{paper.journal}</i> ({paper.year})</p>
                    <Button variant="secondary" size="sm" onClick={() => window.open(`https://pubmed.ncbi.nlm.nih.gov/${paper.id}/`, '_blank')}>Read on PubMed</Button>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="datasets" className="space-y-6 animate-fade-in">
            <div className="flex gap-4 mb-8 bg-muted/30 p-2 rounded-lg border border-border/50">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search ClinicalTrials.gov..." 
                  className="w-full bg-background border-none rounded-md pl-9 pr-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-orange-500 outline-none"
                  value={clinicalQuery}
                  onChange={(e) => setClinicalQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleClinicalSearch()}
                />
              </div>
              <Button onClick={handleClinicalSearch} disabled={isSearchingClinical}>
                {isSearchingClinical ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Search
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {isSearchingClinical ? (
                <div className="md:col-span-2 text-center py-8 text-muted-foreground"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-500" /></div>
              ) : (
                clinicalResults.map((trial, i) => (
                  <Card key={i} className="p-6 flex flex-col h-full border-border/60 hover:border-orange-500/30 transition-colors shadow-sm bg-gradient-to-br from-background to-muted/20">
                    <h3 className="font-semibold text-lg leading-tight line-clamp-3 mb-2">{trial.title}</h3>
                    <p className="text-sm text-foreground/80 mb-4"><span className="font-medium">Conditions:</span> {trial.conditions}</p>
                    <Button className="mt-auto" variant="default" onClick={() => window.open(`https://clinicaltrials.gov/study/${trial.nctId}`, '_blank')}>View on ClinicalTrials.gov</Button>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ENT;
