import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Wind, Info, Search, Database, BookOpen, Activity, ArrowRight, Loader2, BrainCircuit } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useProgressTracking } from "@/hooks/useProgressTracking";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { searchPubMed, type PubMedArticle } from "@/lib/pubmed";
import { searchClinicalTrials, type ClinicalTrial } from "@/lib/clinicaltrials";
import { PathwayModal } from "@/components/common/PathwayModal";

const Respiratory = () => {
  const { markModuleVisited } = useProgressTracking();

  const [pubmedQuery, setPubmedQuery] = useState("COPD exacerbation ABG");
  const [pubmedResults, setPubmedResults] = useState<PubMedArticle[]>([]);
  const [isSearchingPubMed, setIsSearchingPubMed] = useState(false);

  const [clinicalQuery, setClinicalQuery] = useState("COPD");
  const [clinicalResults, setClinicalResults] = useState<ClinicalTrial[]>([]);
  const [isSearchingClinical, setIsSearchingClinical] = useState(false);

  useEffect(() => {
    markModuleVisited('respiratory');
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
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
              <Wind className="h-5 w-5 text-blue-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold">Respiratory Intelligence</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore pulmonary physiology, gas exchange, and pathologies like COPD and Asthma through interactive research data.
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
              <p className="text-muted-foreground mb-6">Structured biomedical knowledge linking respiratory physiology and pathology.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="flex flex-col border-border/60 hover:border-blue-500/30 transition-colors shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40 bg-muted/10">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-blue-500">COPD</CardTitle>
                    <Badge variant="outline">Pathology</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-5 flex-1 space-y-5">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    Chronic Obstructive Pulmonary Disease is a chronic inflammatory lung disease that causes obstructed airflow from the lungs.
                  </p>
                  <PathwayModal id="copd" variant="outline" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="simulation" className="animate-fade-in">
            <Card className="p-12 border-border/60 shadow-sm flex flex-col items-center justify-center text-center">
              <Activity className="h-12 w-12 text-blue-500/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Respiratory Simulation Under Development</h3>
              <p className="text-muted-foreground">Interactive gas exchange and spirometry models are coming in the next update.</p>
            </Card>
          </TabsContent>

          <TabsContent value="research" className="space-y-6 animate-fade-in">
            <div className="flex gap-4 mb-8 bg-muted/30 p-2 rounded-lg border border-border/50">
              <div className="relative flex-1 flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search respiratory literature..." 
                  className="w-full bg-background border-none rounded-md pl-9 pr-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                <div className="text-center py-8 text-muted-foreground"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" /></div>
              ) : (
                pubmedResults.map((paper, i) => (
                  <Card key={i} className="p-5 border-border/60 hover:border-blue-500/40 hover:shadow-md transition-all cursor-pointer">
                    <h3 className="font-medium text-base text-blue-500 mb-1">{paper.title}</h3>
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
                  className="w-full bg-background border-none rounded-md pl-9 pr-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                <div className="md:col-span-2 text-center py-8 text-muted-foreground"><Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" /></div>
              ) : (
                clinicalResults.map((trial, i) => (
                  <Card key={i} className="p-6 flex flex-col h-full border-border/60 hover:border-blue-500/30 transition-colors shadow-sm bg-gradient-to-br from-background to-muted/20">
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

export default Respiratory;
