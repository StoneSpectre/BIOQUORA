import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Eye, Search, Database, BookOpen, Activity, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { searchPubMed, type PubMedArticle } from "@/lib/pubmed";
import { searchClinicalTrials, type ClinicalTrial } from "@/lib/clinicaltrials";

const Ophthalmology = () => {
  const { markModuleVisited } = useProgressTracking();

  const [pubmedQuery, setPubmedQuery] = useState("Glaucoma Retinopathy");
  const [pubmedResults, setPubmedResults] = useState<PubMedArticle[]>([]);
  const [isSearchingPubMed, setIsSearchingPubMed] = useState(false);

  const [clinicalQuery, setClinicalQuery] = useState("Cataract Surgery");
  const [clinicalResults, setClinicalResults] = useState<ClinicalTrial[]>([]);
  const [isSearchingClinical, setIsSearchingClinical] = useState(false);

  useEffect(() => {
    markModuleVisited('ophthalmology');
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
              <Eye className="h-5 w-5 text-sky-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold">Ophthalmology</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore disorders of the eye, from anterior segment pathologies like cataracts to posterior segment diseases like glaucoma and retinopathy.
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
              <p className="text-muted-foreground mb-6">Detailed structured knowledge covering essential subheadings for ophthalmic conditions.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="flex flex-col border-border/60 hover:border-sky-500/30 transition-colors shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
                  <CardTitle className="text-xl text-sky-500">Primary Open-Angle Glaucoma</CardTitle>
                </CardHeader>
                <CardContent className="pt-5 flex-1">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="definitions">
                      <AccordionTrigger className="text-left font-medium">Definitions & Classification</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p><strong>Primary Open-Angle Glaucoma (POAG)</strong> is a chronic, progressive optic neuropathy characterized by characteristic morphological changes at the optic nerve head and retinal nerve fiber layer (RNFL), with subsequent visual field defects.</p>
                        <p>It is typically, but not always, associated with elevated intraocular pressure (IOP &gt; 21 mmHg). When classic glaucomatous damage occurs with an IOP consistently &le; 21 mmHg, it is termed <strong>Normal Tension Glaucoma (NTG)</strong>.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="pathology">
                      <AccordionTrigger className="text-left font-medium">Pathophysiology</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p><strong>Mechanical Theory:</strong> Increased resistance to aqueous humor outflow through the juxtacanalicular trabecular meshwork and the inner wall of Schlemm's canal leads to elevated IOP. This pressure causes mechanical bowing and compression of the <strong>lamina cribrosa</strong>, resulting in blockade of axonal transport in retinal ganglion cells (RGCs).</p>
                        <p><strong>Vascular Theory:</strong> Impaired vascular autoregulation and microvascular ischemia at the optic nerve head contribute to neurotrophin deprivation, oxidative stress, and eventual apoptotic death of RGCs (predominant in NTG).</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="clinical">
                      <AccordionTrigger className="text-left font-medium">Clinical Features</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>POAG is famously known as the <em>"silent thief of sight"</em> because it is entirely asymptomatic until advanced stages.</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Visual Field Defects:</strong> Begins with paracentral scotomas or a nasal step (Roenne's nasal step). Progresses to an arcuate (Bjerrum) scotoma, leaving a temporal island and central tubular vision before total blindness.</li>
                          <li><strong>Fundoscopic Signs:</strong> Increased cup-to-disc (C/D) ratio (&gt;0.5 or asymmetry &gt;0.2 between eyes), focal notching of the neuroretinal rim (especially inferiorly/superiorly - ISNT rule violation), disc hemorrhage (Drance splinter hemorrhages), bayoneting of blood vessels at the disc margin, and peripapillary atrophy.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="investigations">
                      <AccordionTrigger className="text-left font-medium">Investigations & Diagnostics</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Tonometry:</strong> Goldmann Applanation Tonometry (GAT) is the gold standard for measuring IOP.</li>
                          <li><strong>Pachymetry:</strong> Measures Central Corneal Thickness (CCT). Thin corneas underestimate true IOP; thick corneas overestimate it.</li>
                          <li><strong>Gonioscopy:</strong> Essential to confirm open angles (Shaffer grade 3 or 4) and rule out secondary causes like pigment dispersion or pseudoexfoliation syndrome.</li>
                          <li><strong>Perimetry:</strong> Standard Automated Perimetry (Humphrey Visual Field 24-2 or 10-2) to detect and monitor functional vision loss.</li>
                          <li><strong>Imaging (OCT):</strong> Optical Coherence Tomography quantifies structural loss by measuring RNFL thickness and the Ganglion Cell Complex (GCC) in the macula.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="treatment">
                      <AccordionTrigger className="text-left font-medium">Pharmacological & Surgical Treatment</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>The core principle is lowering IOP by 20-30% from baseline.</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>1st-Line Medical:</strong> Prostaglandin analogs (<em>Latanoprost, Bimatoprost</em>) to increase uveoscleral outflow. Side effects include eyelash growth and iris hyperpigmentation.</li>
                          <li><strong>2nd-Line Medical:</strong> Beta-blockers (<em>Timolol</em>) to decrease aqueous production (contraindicated in asthma/COPD). Alpha-2 agonists (<em>Brimonidine</em>), and Carbonic Anhydrase Inhibitors (<em>Dorzolamide</em>).</li>
                          <li><strong>Laser Therapy:</strong> Selective Laser Trabeculoplasty (SLT) stimulates meshwork remodeling to enhance outflow. Often used as first-line therapy today.</li>
                          <li><strong>Surgical:</strong> Trabeculectomy (creating a subconjunctival filtration bleb, often with antimetabolites like Mitomycin-C), Aqueous Shunt implantation (Baerveldt/Ahmed tubes), or Minimally Invasive Glaucoma Surgery (MIGS) such as the iStent.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card className="flex flex-col border-border/60 hover:border-sky-500/30 transition-colors shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
                  <CardTitle className="text-xl text-sky-500">Cataract</CardTitle>
                </CardHeader>
                <CardContent className="pt-5 flex-1">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="definitions">
                      <AccordionTrigger className="text-left font-medium">Definitions & Subtypes</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>A <strong>Cataract</strong> is any opacification, clouding, or discoloration of the crystalline lens that causes a reduction in visual acuity or degrades optical quality.</p>
                        <p>Major morphological subtypes include: <strong>Nuclear Sclerotic</strong> (most common, central yellowing/hardening due to aging), <strong>Cortical</strong> (spoke-like peripheral opacities common in diabetics), and <strong>Posterior Subcapsular</strong> (plaque-like opacity at the posterior pole, highly symptomatic for glare, associated with chronic steroid use and radiation).</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="pathology">
                      <AccordionTrigger className="text-left font-medium">Pathophysiology</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>The lens continues to grow throughout life without shedding cells. Over time, oxidative stress, UV radiation exposure, and altered lens metabolism lead to the conformational change, misfolding, and cross-linking of lens <strong>crystallin proteins</strong>.</p>
                        <p>In nuclear sclerosis, an accumulation of urochrome pigments causes a yellow/brown discoloration (<em>brunescence</em>). In cortical cataracts, localized alterations in lens fiber hydration and osmotic imbalances cause clefts and vacuoles.</p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="clinical">
                      <AccordionTrigger className="text-left font-medium">Clinical Features</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Painless, progressive blurring and dimming of vision.</li>
                          <li><strong>Glare and Halos:</strong> Light scattering causes severe glare from oncoming headlights (classic complaint for posterior subcapsular cataracts).</li>
                          <li><strong>Myopic Shift ("Second Sight"):</strong> Nuclear cataracts increase the refractive index of the lens, causing a myopic shift. Older hyperopic/presbyopic patients may temporarily find they can read without glasses again.</li>
                          <li>Diminished color perception (colors appear washed out or yellowed) and monocular diplopia.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="investigations">
                      <AccordionTrigger className="text-left font-medium">Investigations</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Slit-Lamp Biomicroscopy:</strong> Performed after pupillary dilation to visualize and grade the lens opacity (e.g., using the LOCS III grading system).</li>
                          <li><strong>Visual Acuity:</strong> Best-corrected visual acuity (BCVA) with pinhole testing to evaluate macular potential.</li>
                          <li><strong>Fundoscopy:</strong> Direct and indirect ophthalmoscopy to rule out concurrent retinal diseases (e.g., macular degeneration) that might limit post-operative visual potential.</li>
                          <li><strong>Biometry:</strong> Optical Coherence Biometry or Ultrasound A-scan to precisely measure axial length and corneal curvature, essential for calculating the correct intraocular lens (IOL) power prior to surgery.</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="treatment">
                      <AccordionTrigger className="text-left font-medium">Surgical Treatment</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground space-y-2">
                        <p>There is no effective medical treatment; management is purely surgical when vision loss interferes with daily activities.</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>Phacoemulsification:</strong> The gold standard. An ultrasonic handpiece emulsifies the lens nucleus through a 2.2-2.8mm clear corneal incision after creating a continuous curvilinear capsulorhexis (CCC). The cortex is aspirated, leaving the posterior capsule intact.</li>
                          <li><strong>Intraocular Lens (IOL) Implantation:</strong> A foldable acrylic or silicone IOL is injected into the capsular bag. Options include monofocal, toric (to correct astigmatism), and multifocal/EDOF (to provide near and distance vision).</li>
                          <li><strong>ECCE / MSICS:</strong> Extracapsular Cataract Extraction or Manual Small Incision Cataract Surgery are used for extremely dense, rock-hard cataracts or in resource-limited settings.</li>
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
              <Activity className="h-12 w-12 text-sky-500/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visual Pathway Simulation</h3>
              <p className="text-muted-foreground">Interactive optic nerve and retinal simulations are coming in the next update.</p>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6 animate-fade-in">
            <div className="flex gap-4 mb-8 bg-muted/30 p-2 rounded-lg border border-border/50">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search ophthalmic literature..." 
                  className="w-full bg-background border-none rounded-md pl-9 pr-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-sky-500 outline-none"
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
                <div className="text-center py-8 text-muted-foreground"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-sky-500" /></div>
              ) : (
                pubmedResults.map((paper, i) => (
                  <Card key={i} className="p-5 border-border/60 hover:border-sky-500/40 hover:shadow-md transition-all cursor-pointer">
                    <h3 className="font-medium text-base text-sky-500 mb-1">{paper.title}</h3>
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
                  className="w-full bg-background border-none rounded-md pl-9 pr-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-sky-500 outline-none"
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
                <div className="md:col-span-2 text-center py-8 text-muted-foreground"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-sky-500" /></div>
              ) : (
                clinicalResults.map((trial, i) => (
                  <Card key={i} className="p-6 flex flex-col h-full border-border/60 hover:border-sky-500/30 transition-colors shadow-sm bg-gradient-to-br from-background to-muted/20">
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

export default Ophthalmology;
