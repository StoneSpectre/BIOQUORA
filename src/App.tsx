import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Cardiovascular from "./pages/Cardiovascular";
import Renal from "./pages/Renal";
import Immunology from "./pages/Immunology";
import Nervous from "./pages/Nervous";
import Reproductive from "./pages/Reproductive";
import SystemThinking from "./pages/SystemThinking";
import Ophthalmology from "./pages/Ophthalmology";
import ENT from "./pages/ENT";
import Hepatic from "./pages/Hepatic";
import Respiratory from "./pages/Respiratory";
import Endocrine from "./pages/Endocrine";
import About from "./pages/About";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import TermsOfService from "./pages/TermsOfService";
import HackathonPitch from "./pages/HackathonPitch";

import { KnowledgeGraph } from "./pages/KnowledgeGraph";
import { Analytics } from "./pages/Analytics";
import BioquoraDashboard from "./pages/BioquoraPhase";
import Assistant from "./pages/Assistant";
import ExplorerSelector from "./pages/ExplorerSelector";
import ExplorerV1 from "./pages/ExplorerV1";
import ExplorerV2 from "./pages/ExplorerV2";
import NotFound from "./pages/NotFound";
import DiagnosticDashboard from "./pages/DiagnosticDashboard";
import Steps67 from "./pages/Steps67";
import Phase4 from "./pages/Phase4";
import Phase5 from "./pages/Phase5";
import GraphRAGDemo from "./pages/GraphRAGDemo";
import Marketplace from "./pages/Marketplace";
import Academy from "./pages/Academy";
import DeveloperPortal from "./pages/DeveloperPortal";
import Collaboration from "./pages/Collaboration";
import Governance from "./pages/Governance";
import BioValidateDashboard from "./pages/BioValidateDashboard";
import AIEvaluation from "./pages/AIEvaluation";
import Reproducibility from "./pages/Reproducibility";
import ScientificReporting from "./pages/ScientificReporting";
import BioCloudConsole from "./pages/BioCloudConsole";
import BioCloudIAM from "./pages/BioCloudIAM";
import BioCloudCompute from "./pages/BioCloudCompute";
import BioCloudWorkspaces from "./pages/BioCloudWorkspaces";
import BioNetInstitutionRegistry from "./pages/BioNetInstitutionRegistry";
import BioNetFederatedSearch from "./pages/BioNetFederatedSearch";
import BioNetGraph from "./pages/BioNetGraph";
import BioNetCollaboration from "./pages/BioNetCollaboration";
import BioConnectProfile from "./pages/BioConnectProfile";
import BioConnectCommunity from "./pages/BioConnectCommunity";
import BioConnectReputation from "./pages/BioConnectReputation";
import BioConnectHub from "./pages/BioConnectHub";
import BioMarketExplorer from "./pages/BioMarketExplorer";
import BioMarketAssetDetails from "./pages/BioMarketAssetDetails";
import BioMarketProvenance from "./pages/BioMarketProvenance";
import BioMarketEnterprise from "./pages/BioMarketEnterprise";
import BioLabWorkspace from "./pages/BioLabWorkspace";
import BioLabWorkflowBuilder from "./pages/BioLabWorkflowBuilder";
import BioLabNotebook from "./pages/BioLabNotebook";
import BioLabExecution from "./pages/BioLabExecution";
import BioClinicalStudyRegistry from "./pages/BioClinicalStudyRegistry";
import BioClinicalProtocolBuilder from "./pages/BioClinicalProtocolBuilder";
import BioClinicalCohortEngine from "./pages/BioClinicalCohortEngine";
import BioClinicalStatistics from "./pages/BioClinicalStatistics";
import BioPharmaTargetDiscovery from "./pages/BioPharmaTargetDiscovery";
import BioPharmaCompoundLibrary from "./pages/BioPharmaCompoundLibrary";
import BioPharmaVirtualScreening from "./pages/BioPharmaVirtualScreening";
import BioPharmaChemistryWorkspace from "./pages/BioPharmaChemistryWorkspace";
import BioDigitalCellModeling from "./pages/BioDigitalCellModeling";
import BioDigitalTissueEngine from "./pages/BioDigitalTissueEngine";
import BioDigitalSystemsPhysiology from "./pages/BioDigitalSystemsPhysiology";
import BioDigitalSimulationCore from "./pages/BioDigitalSimulationCore";
import BioOSDesktop from "./pages/BioOSDesktop";
import BioOSResearchCopilot from "./pages/BioOSResearchCopilot";
import BioOSUniversalSearch from "./pages/BioOSUniversalSearch";
import BioOSAppStore from "./pages/BioOSAppStore";
import BioKnowledgeGraph from "./pages/BioKnowledgeGraph";
import BioKnowledgeLiterature from "./pages/BioKnowledgeLiterature";
import BioKnowledgeEvidence from "./pages/BioKnowledgeEvidence";
import BioKnowledgeOntology from "./pages/BioKnowledgeOntology";
import BioSearchEngine from "./pages/BioSearchEngine";
import BioSearchAnswers from "./pages/BioSearchAnswers";
import BioSearchExplorer from "./pages/BioSearchExplorer";
import BioSearchAssistant from "./pages/BioSearchAssistant";
import BioScientistMission from "./pages/BioScientistMission";
import BioScientistPlanner from "./pages/BioScientistPlanner";
import BioScientistAgents from "./pages/BioScientistAgents";
import BioScientistWriter from "./pages/BioScientistWriter";
import BioStudioIDE from "./pages/BioStudioIDE";
import BioStudioWorkflows from "./pages/BioStudioWorkflows";
import BioStudioModels from "./pages/BioStudioModels";
import BioStudioDeployment from "./pages/BioStudioDeployment";
import BioPublishWorkspace from "./pages/BioPublishWorkspace";
import BioPublishEditor from "./pages/BioPublishEditor";
import BioPublishReview from "./pages/BioPublishReview";
import BioPublishArchive from "./pages/BioPublishArchive";
import BioLearnWorkspace from "./pages/BioLearnWorkspace";
import BioLearnTutor from "./pages/BioLearnTutor";
import BioLearnCourses from "./pages/BioLearnCourses";
import BioLearnSimulator from "./pages/BioLearnSimulator";
import BioEnterpriseWorkspace from "./pages/BioEnterpriseWorkspace";
import BioEnterpriseAdmin from "./pages/BioEnterpriseAdmin";
import BioEnterpriseAnalytics from "./pages/BioEnterpriseAnalytics";
import BioEnterpriseDigitalTwin from "./pages/BioEnterpriseDigitalTwin";
import BioInnovationWorkspace from "./pages/BioInnovationWorkspace";
import BioInnovationStartupBuilder from "./pages/BioInnovationStartupBuilder";
import BioInnovationVentureIntelligence from "./pages/BioInnovationVentureIntelligence";
import BioInnovationObservatory from "./pages/BioInnovationObservatory";
import BioEarthFederation from "./pages/BioEarthFederation";
import BioEarthObservatory from "./pages/BioEarthObservatory";
import BioEarthPublicHealth from "./pages/BioEarthPublicHealth";
import BioEarthDigitalTwin from "./pages/BioEarthDigitalTwin";
import BioFutureWorkspace from "./pages/BioFutureWorkspace";
import BioFutureScenarioStudio from "./pages/BioFutureScenarioStudio";
import BioFutureRoadmapBuilder from "./pages/BioFutureRoadmapBuilder";
import BioFutureObservatory from "./pages/BioFutureObservatory";
import BioCivilizationWorkspace from "./pages/BioCivilizationWorkspace";
import BioCivilizationMemoryEngine from "./pages/BioCivilizationMemoryEngine";
import BioCivilizationHeritageVault from "./pages/BioCivilizationHeritageVault";
import BioCivilizationAtlas from "./pages/BioCivilizationAtlas";
import BioFoundationWorkspace from "./pages/BioFoundationWorkspace";
import BioFoundationModelRegistry from "./pages/BioFoundationModelRegistry";
import BioFoundationReasoningEngine from "./pages/BioFoundationReasoningEngine";
import BioFoundationEvaluation from "./pages/BioFoundationEvaluation";
import BioAgentsWorkspace from "./pages/BioAgentsWorkspace";
import BioAgentsCollaboration from "./pages/BioAgentsCollaboration";
import BioAgentsRegistry from "./pages/BioAgentsRegistry";
import BioAgentsGovernance from "./pages/BioAgentsGovernance";
import BioReasonWorkspace from "./pages/BioReasonWorkspace";
import BioReasonEvidence from "./pages/BioReasonEvidence";
import BioReasonCausalGraph from "./pages/BioReasonCausalGraph";
import BioReasonUncertainty from "./pages/BioReasonUncertainty";
import BioMemoryWorkspace from "./pages/BioMemoryWorkspace";
import BioMemoryGraph from "./pages/BioMemoryGraph";
import BioMemoryTimeline from "./pages/BioMemoryTimeline";
import BioMemoryGovernance from "./pages/BioMemoryGovernance";
import BioRetrieverWorkspace from "./pages/BioRetrieverWorkspace";
import BioRetrieverGraphRAG from "./pages/BioRetrieverGraphRAG";
import BioRetrieverOntology from "./pages/BioRetrieverOntology";
import BioRetrieverRanking from "./pages/BioRetrieverRanking";
import BioVisionWorkspace from "./pages/BioVisionWorkspace";
import BioVisionMicroscopy from "./pages/BioVisionMicroscopy";
import BioVisionRadiology from "./pages/BioVisionRadiology";
import BioCoderWorkspace from "./pages/BioCoderWorkspace";
import BioCoderPipelines from "./pages/BioCoderPipelines";
import BioCoderNotebooks from "./pages/BioCoderNotebooks";
import BioSimulationWorkspace from "./pages/BioSimulationWorkspace";
import BioSimulationMolecular from "./pages/BioSimulationMolecular";
import BioSimulationDigitalTwin from "./pages/BioSimulationDigitalTwin";
import BioValidatorWorkspace from "./pages/BioValidatorWorkspace";
import BioValidatorTrustScore from "./pages/BioValidatorTrustScore";
import BioValidatorProvenance from "./pages/BioValidatorProvenance";
import BioAssistantWorkspace from "./pages/BioAssistantWorkspace";
import BioAssistantLiterature from "./pages/BioAssistantLiterature";
import BioAssistantWriting from "./pages/BioAssistantWriting";
import BioInferenceWorkspace from "./pages/BioInferenceWorkspace";
import BioInferenceRouting from "./pages/BioInferenceRouting";
import BioInferenceMonitoring from "./pages/BioInferenceMonitoring";
import BioSafeWorkspace from "./pages/BioSafeWorkspace";
import BioSafePrivacy from "./pages/BioSafePrivacy";
import BioSafeAudit from "./pages/BioSafeAudit";
import BioEvalWorkspace from "./pages/BioEvalWorkspace";
import BioEvalLeaderboard from "./pages/BioEvalLeaderboard";
import BioEvalAnalytics from "./pages/BioEvalAnalytics";
import BioWorkflowWorkspace from "./pages/BioWorkflowWorkspace";
import BioWorkflowDesigner from "./pages/BioWorkflowDesigner";
import BioWorkflowMonitor from "./pages/BioWorkflowMonitor";
import BioFactoryWorkspace from "./pages/BioFactoryWorkspace";
import BioFactoryPipelines from "./pages/BioFactoryPipelines";
import BioFactoryDeployments from "./pages/BioFactoryDeployments";
import BioAIHubWorkspace from "./pages/BioAIHubWorkspace";
import BioAIHubMarketplace from "./pages/BioAIHubMarketplace";
import BioAIHubDocs from "./pages/BioAIHubDocs";
import BioLearningWorkspace from "./pages/BioLearningWorkspace";
import BioLearningMetrics from "./pages/BioLearningMetrics";
import BioLearningGovernance from "./pages/BioLearningGovernance";
import BioFederatedWorkspace from "./pages/BioFederatedWorkspace";
import BioFederatedTopology from "./pages/BioFederatedTopology";
import BioFederatedPrivacy from "./pages/BioFederatedPrivacy";
import BioASIWorkspace from "./pages/BioASIWorkspace";
import BioASIMissionControl from "./pages/BioASIMissionControl";
import BioASICognition from "./pages/BioASICognition";
import BioCoreWorkspace from "./pages/BioCoreWorkspace";
import BioCoreRouting from "./pages/BioCoreRouting";
import BioCoreCivilization from "./pages/BioCoreCivilization";
import BioquoraLauncher from "./pages/BioquoraLauncher";
import BioquoraCopilotDAG from "./components/bioquora-copilot-dag";
import PredictiveML from "./pages/PredictiveML";
import RecommendationEngine from "./pages/RecommendationEngine";

import Workspace from "./pages/Workspace";
import ResearchCopilot from "./pages/ResearchCopilot";

import BioquoraExplorer from "./components/BioquoraExplorer";
import RecommendationOnboarding from "./components/RecommendationOnboarding";
import RecommendationPhase2 from "./components/RecommendationPhase2";
import FoundationDashboard from "./pages/FoundationDashboard";
import Handbook from "./pages/Handbook";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cardiovascular" element={<Cardiovascular />} />
            <Route path="/renal" element={<Renal />} />
            <Route path="/immunology" element={<Immunology />} />
            <Route path="/nervous" element={<Nervous />} />
            <Route path="/reproductive" element={<Reproductive />} />
            <Route path="/system-thinking" element={<SystemThinking />} />
            <Route path="/ophthalmology" element={<Ophthalmology />} />
            <Route path="/ent" element={<ENT />} />
            <Route path="/hepatic" element={<Hepatic />} />
            <Route path="/respiratory" element={<Respiratory />} />
            <Route path="/endocrine" element={<Endocrine />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/roadmap" element={<BioquoraDashboard />} />
            <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/explorer" element={<ExplorerSelector />} />
            <Route path="/diagnostic" element={<DiagnosticDashboard />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/explorer-v1" element={<ExplorerV1 />} />
            <Route path="/explorer-v2" element={<ExplorerV2 />} />
            <Route path="/steps-6-7" element={<Steps67 />} />
            <Route path="/phase4" element={<Phase4 />} />
            <Route path="/phase5" element={<Phase5 />} />
            <Route path="/predictive-ml" element={<PredictiveML />} />
            <Route path="/recommendation-engine" element={<RecommendationEngine />} />
            <Route path="/copilot" element={<ResearchCopilot />} />
            <Route path="/bioquora-explorer" element={<BioquoraExplorer />} />
            <Route path="/recommendations" element={<RecommendationOnboarding />} />
            <Route path="/recommendations/phase2" element={<RecommendationPhase2 />} />
            <Route path="/graphrag-demo" element={<GraphRAGDemo />} />
            <Route path="/copilot-dag" element={<BioquoraCopilotDAG />} />
            <Route path="/foundation" element={<FoundationDashboard />} />
            <Route path="/handbook" element={<Handbook />} />
            <Route path="/graphrag-demo" element={<GraphRAGDemo />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/developers" element={<DeveloperPortal />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/biovalidate" element={<BioValidateDashboard />} />
            <Route path="/ai-evaluation" element={<AIEvaluation />} />
            <Route path="/reproducibility" element={<Reproducibility />} />
            <Route path="/scientific-reporting" element={<ScientificReporting />} />
            <Route path="/biocloud-console" element={<BioCloudConsole />} />
            <Route path="/biocloud-iam" element={<BioCloudIAM />} />
            <Route path="/biocloud-compute" element={<BioCloudCompute />} />
            <Route path="/biocloud-workspaces" element={<BioCloudWorkspaces />} />
            <Route path="/bionet-institutions" element={<BioNetInstitutionRegistry />} />
            <Route path="/bionet-search" element={<BioNetFederatedSearch />} />
            <Route path="/bionet-graph" element={<BioNetGraph />} />
            <Route path="/bionet-collaboration" element={<BioNetCollaboration />} />
            <Route path="/bioconnect-profile" element={<BioConnectProfile />} />
            <Route path="/bioconnect-community" element={<BioConnectCommunity />} />
            <Route path="/bioconnect-reputation" element={<BioConnectReputation />} />
            <Route path="/bioconnect-hub" element={<BioConnectHub />} />
            <Route path="/biomarket-explorer" element={<BioMarketExplorer />} />
            <Route path="/biomarket-asset" element={<BioMarketAssetDetails />} />
            <Route path="/biomarket-provenance" element={<BioMarketProvenance />} />
            <Route path="/biomarket-enterprise" element={<BioMarketEnterprise />} />
            <Route path="/biolab-workspace" element={<BioLabWorkspace />} />
            <Route path="/biolab-workflow" element={<BioLabWorkflowBuilder />} />
            <Route path="/biolab-notebook" element={<BioLabNotebook />} />
            <Route path="/biolab-execution" element={<BioLabExecution />} />
            <Route path="/bioclinical-studies" element={<BioClinicalStudyRegistry />} />
            <Route path="/bioclinical-protocol" element={<BioClinicalProtocolBuilder />} />
            <Route path="/bioclinical-cohorts" element={<BioClinicalCohortEngine />} />
            <Route path="/bioclinical-statistics" element={<BioClinicalStatistics />} />
            <Route path="/biopharma-targets" element={<BioPharmaTargetDiscovery />} />
            <Route path="/biopharma-compounds" element={<BioPharmaCompoundLibrary />} />
            <Route path="/biopharma-screening" element={<BioPharmaVirtualScreening />} />
            <Route path="/biopharma-chemistry" element={<BioPharmaChemistryWorkspace />} />
            <Route path="/biodigital-cells" element={<BioDigitalCellModeling />} />
            <Route path="/biodigital-tissues" element={<BioDigitalTissueEngine />} />
            <Route path="/biodigital-systems" element={<BioDigitalSystemsPhysiology />} />
            <Route path="/biodigital-simulations" element={<BioDigitalSimulationCore />} />
            <Route path="/bioos-desktop" element={<BioOSDesktop />} />
            <Route path="/bioos-copilot" element={<BioOSResearchCopilot />} />
            <Route path="/bioos-search" element={<BioOSUniversalSearch />} />
            <Route path="/bioos-appstore" element={<BioOSAppStore />} />
            <Route path="/bioknowledge-graph" element={<BioKnowledgeGraph />} />
            <Route path="/bioknowledge-literature" element={<BioKnowledgeLiterature />} />
            <Route path="/bioknowledge-evidence" element={<BioKnowledgeEvidence />} />
            <Route path="/bioknowledge-ontology" element={<BioKnowledgeOntology />} />
            <Route path="/biosearch-home" element={<BioSearchEngine />} />
            <Route path="/biosearch-answers" element={<BioSearchAnswers />} />
            <Route path="/biosearch-explorer" element={<BioSearchExplorer />} />
            <Route path="/biosearch-assistant" element={<BioSearchAssistant />} />
            <Route path="/bioscientistx-mission" element={<BioScientistMission />} />
            <Route path="/bioscientistx-planner" element={<BioScientistPlanner />} />
            <Route path="/bioscientistx-agents" element={<BioScientistAgents />} />
            <Route path="/bioscientistx-writer" element={<BioScientistWriter />} />
            <Route path="/biostudio-ide" element={<BioStudioIDE />} />
            <Route path="/biostudio-workflows" element={<BioStudioWorkflows />} />
            <Route path="/biostudio-models" element={<BioStudioModels />} />
            <Route path="/biostudio-deployment" element={<BioStudioDeployment />} />
            <Route path="/biopublish-workspace" element={<BioPublishWorkspace />} />
            <Route path="/biopublish-editor" element={<BioPublishEditor />} />
            <Route path="/biopublish-review" element={<BioPublishReview />} />
            <Route path="/biopublish-archive" element={<BioPublishArchive />} />
            <Route path="/biolearn-workspace" element={<BioLearnWorkspace />} />
            <Route path="/biolearn-tutor" element={<BioLearnTutor />} />
            <Route path="/biolearn-courses" element={<BioLearnCourses />} />
            <Route path="/biolearn-simulator" element={<BioLearnSimulator />} />
            <Route path="/bioenterprise-workspace" element={<BioEnterpriseWorkspace />} />
            <Route path="/bioenterprise-admin" element={<BioEnterpriseAdmin />} />
            <Route path="/bioenterprise-analytics" element={<BioEnterpriseAnalytics />} />
            <Route path="/bioenterprise-twin" element={<BioEnterpriseDigitalTwin />} />
            <Route path="/bioinnovation-workspace" element={<BioInnovationWorkspace />} />
            <Route path="/bioinnovation-startup" element={<BioInnovationStartupBuilder />} />
            <Route path="/bioinnovation-venture" element={<BioInnovationVentureIntelligence />} />
            <Route path="/bioinnovation-observatory" element={<BioInnovationObservatory />} />
            <Route path="/bioearth-federation" element={<BioEarthFederation />} />
            <Route path="/bioearth-observatory" element={<BioEarthObservatory />} />
            <Route path="/bioearth-health" element={<BioEarthPublicHealth />} />
            <Route path="/bioearth-twin" element={<BioEarthDigitalTwin />} />
            <Route path="/biofuture-workspace" element={<BioFutureWorkspace />} />
            <Route path="/biofuture-scenarios" element={<BioFutureScenarioStudio />} />
            <Route path="/biofuture-roadmap" element={<BioFutureRoadmapBuilder />} />
            <Route path="/biofuture-observatory" element={<BioFutureObservatory />} />
            <Route path="/biocivilization-workspace" element={<BioCivilizationWorkspace />} />
            <Route path="/biocivilization-memory" element={<BioCivilizationMemoryEngine />} />
            <Route path="/biocivilization-heritage" element={<BioCivilizationHeritageVault />} />
            <Route path="/biocivilization-atlas" element={<BioCivilizationAtlas />} />
            <Route path="/biofoundation-workspace" element={<BioFoundationWorkspace />} />
            <Route path="/biofoundation-registry" element={<BioFoundationModelRegistry />} />
            <Route path="/biofoundation-reasoning" element={<BioFoundationReasoningEngine />} />
            <Route path="/biofoundation-evaluation" element={<BioFoundationEvaluation />} />
            <Route path="/bioagents-workspace" element={<BioAgentsWorkspace />} />
            <Route path="/bioagents-collaboration" element={<BioAgentsCollaboration />} />
            <Route path="/bioagents-registry" element={<BioAgentsRegistry />} />
            <Route path="/bioagents-governance" element={<BioAgentsGovernance />} />
            <Route path="/bioreason-workspace" element={<BioReasonWorkspace />} />
            <Route path="/bioreason-evidence" element={<BioReasonEvidence />} />
            <Route path="/bioreason-causal" element={<BioReasonCausalGraph />} />
            <Route path="/bioreason-uncertainty" element={<BioReasonUncertainty />} />
            <Route path="/biomemory-workspace" element={<BioMemoryWorkspace />} />
            <Route path="/biomemory-graph" element={<BioMemoryGraph />} />
            <Route path="/biomemory-timeline" element={<BioMemoryTimeline />} />
            <Route path="/biomemory-governance" element={<BioMemoryGovernance />} />
            <Route path="/bioretriever-workspace" element={<BioRetrieverWorkspace />} />
            <Route path="/bioretriever-graphrag" element={<BioRetrieverGraphRAG />} />
            <Route path="/bioretriever-ontology" element={<BioRetrieverOntology />} />
            <Route path="/bioretriever-ranking" element={<BioRetrieverRanking />} />
            <Route path="/biovision-workspace" element={<BioVisionWorkspace />} />
            <Route path="/biovision-microscopy" element={<BioVisionMicroscopy />} />
            <Route path="/biovision-radiology" element={<BioVisionRadiology />} />
            <Route path="/biocoder-workspace" element={<BioCoderWorkspace />} />
            <Route path="/biocoder-pipelines" element={<BioCoderPipelines />} />
            <Route path="/biocoder-notebooks" element={<BioCoderNotebooks />} />
            <Route path="/biosimulation-workspace" element={<BioSimulationWorkspace />} />
            <Route path="/biosimulation-molecular" element={<BioSimulationMolecular />} />
            <Route path="/biosimulation-digitaltwin" element={<BioSimulationDigitalTwin />} />
            <Route path="/biovalidator-workspace" element={<BioValidatorWorkspace />} />
            <Route path="/biovalidator-trustscore" element={<BioValidatorTrustScore />} />
            <Route path="/biovalidator-provenance" element={<BioValidatorProvenance />} />
            <Route path="/bioassistant-workspace" element={<BioAssistantWorkspace />} />
            <Route path="/bioassistant-literature" element={<BioAssistantLiterature />} />
            <Route path="/bioassistant-writing" element={<BioAssistantWriting />} />
            <Route path="/bioinference-workspace" element={<BioInferenceWorkspace />} />
            <Route path="/bioinference-routing" element={<BioInferenceRouting />} />
            <Route path="/bioinference-monitoring" element={<BioInferenceMonitoring />} />
            <Route path="/biosafe-workspace" element={<BioSafeWorkspace />} />
            <Route path="/biosafe-privacy" element={<BioSafePrivacy />} />
            <Route path="/biosafe-audit" element={<BioSafeAudit />} />
            <Route path="/bioeval-workspace" element={<BioEvalWorkspace />} />
            <Route path="/bioeval-leaderboard" element={<BioEvalLeaderboard />} />
            <Route path="/bioeval-analytics" element={<BioEvalAnalytics />} />
            <Route path="/bioworkflow-workspace" element={<BioWorkflowWorkspace />} />
            <Route path="/bioworkflow-designer" element={<BioWorkflowDesigner />} />
            <Route path="/bioworkflow-monitor" element={<BioWorkflowMonitor />} />
            <Route path="/biofactory-workspace" element={<BioFactoryWorkspace />} />
            <Route path="/biofactory-pipelines" element={<BioFactoryPipelines />} />
            <Route path="/biofactory-deployments" element={<BioFactoryDeployments />} />
            <Route path="/bioaihub-workspace" element={<BioAIHubWorkspace />} />
            <Route path="/bioaihub-marketplace" element={<BioAIHubMarketplace />} />
            <Route path="/bioaihub-docs" element={<BioAIHubDocs />} />
            <Route path="/biolearning-workspace" element={<BioLearningWorkspace />} />
            <Route path="/biolearning-metrics" element={<BioLearningMetrics />} />
            <Route path="/biolearning-governance" element={<BioLearningGovernance />} />
            <Route path="/biofederated-workspace" element={<BioFederatedWorkspace />} />
            <Route path="/biofederated-topology" element={<BioFederatedTopology />} />
            <Route path="/biofederated-privacy" element={<BioFederatedPrivacy />} />
            <Route path="/bioasi-workspace" element={<BioASIWorkspace />} />
            <Route path="/bioasi-missioncontrol" element={<BioASIMissionControl />} />
            <Route path="/bioasi-cognition" element={<BioASICognition />} />
            <Route path="/biocore-workspace" element={<BioCoreWorkspace />} />
            <Route path="/biocore-routing" element={<BioCoreRouting />} />
            <Route path="/biocore-civilization" element={<BioCoreCivilization />} />
            <Route path="/launcher" element={<BioquoraLauncher />} />
            <Route path="/pitch" element={<HackathonPitch />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

































