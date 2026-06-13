import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { WorkspaceLayout } from "@/components/workspace/WorkspaceLayout";
import { PapersTable } from "@/components/workspace/PapersTable";
import { NoteEditor } from "@/components/workspace/NoteEditor";
import { ReviewDraftUI } from "@/components/workspace/ReviewDraftUI";
import { TopicMapVis } from "@/components/workspace/TopicMapVis";
import { ActivityFeed } from "@/components/workspace/ActivityFeed";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceApi } from "@/lib/api/workspace";
import { Layers, Plus, ExternalLink, Activity, Network, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjectSocket } from "@/hooks/useProjectSocket";

export default function Workspace() {
  const queryClient = useQueryClient();
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  // Fetch all projects for the user
  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: workspaceApi.getProjects,
  });

  // Create a demo project mutation
  const createProjectMutation = useMutation({
    mutationFn: () => workspaceApi.createProject({
      title: "BRCA1 Oncology Research",
      description: "Literature review for BRCA1 pathway mutations in breast cancer.",
      visibility: "private"
    }),
    onSuccess: (newProject) => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setActiveProjectId(newProject.id);
    }
  });

  // Set first project active by default if none selected
  useEffect(() => {
    if (projects && projects.length > 0 && !activeProjectId) {
      setActiveProjectId(projects[0].id);
    }
  }, [projects, activeProjectId]);

  // Connect to the WebSocket when a project is active
  useProjectSocket(activeProjectId);

  // Fetch literature stats for the active project
  const { data: stats } = useQuery({
    queryKey: ['literatureStats', activeProjectId],
    queryFn: () => workspaceApi.getStats(activeProjectId!),
    enabled: !!activeProjectId
  });

  const [activeView, setActiveView] = useState("papers");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20">
      <Header />
      
      {loadingProjects ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground flex items-center gap-2">
            <Layers className="h-5 w-5 opacity-50" /> Loading Workspace...
          </div>
        </div>
      ) : !projects || projects.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="h-20 w-20 bg-muted/30 rounded-full flex items-center justify-center mb-6">
            <Layers className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Welcome to Your Workspace</h1>
          <p className="text-muted-foreground max-w-md mb-8">
            Your personal research environment. Organize saved papers, annotate literature, and seamlessly connect your readings to the biomedical knowledge graph.
          </p>
          <Button 
            onClick={() => createProjectMutation.mutate()}
            disabled={createProjectMutation.isPending}
            className="gap-2"
          >
            {createProjectMutation.isPending ? "Creating..." : (
              <>
                <Plus className="h-4 w-4" />
                Initialize Demo Project
              </>
            )}
          </Button>
        </div>
      ) : activeProjectId ? (
        <WorkspaceLayout projectId={activeProjectId} activeView={activeView} setActiveView={setActiveView}>
          {/* Top Statistics Dashboard Strip */}
          <div className="h-14 border-b border-border/50 bg-card/30 flex items-center px-6 gap-6 shrink-0">
            <div className="text-sm font-semibold text-foreground flex items-center gap-2 mr-4">
              <Activity className="h-4 w-4 text-fuchsia-500" />
              Literature Activity
            </div>
            
            <div className="flex items-center gap-8 text-xs font-medium">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-[10px] uppercase tracking-wider">Total</span>
                <span className="text-foreground">{stats?.total || 0}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-500 text-[10px] uppercase tracking-wider">Unread</span>
                <span className="text-slate-400">{stats?.unread || 0}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-blue-500 text-[10px] uppercase tracking-wider">Reading</span>
                <span className="text-blue-400">{stats?.reading || 0}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-emerald-500 text-[10px] uppercase tracking-wider">Done</span>
                <span className="text-emerald-400">{stats?.done || 0}</span>
              </div>
              <div className="h-6 w-px bg-border/50 mx-2"></div>
              <div className="flex flex-col">
                <span className="text-teal-500 text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <Network className="h-3 w-3" /> Graph Linked
                </span>
                <span className="text-teal-400">{stats?.graph_linked || 0}</span>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-3">
              <div className="flex -space-x-2 mr-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-[10px] text-emerald-500 font-bold z-20">SC</div>
                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-[10px] text-blue-500 font-bold z-10">JW</div>
              </div>
              <Button size="sm" variant="outline" className="h-8 gap-2 border-primary/20 hover:bg-primary/10" onClick={() => {
                const email = prompt("Enter teammate's email to invite:");
                if (email) alert(`Invitation sent to ${email}!`);
              }}>
                <UserPlus className="h-3.5 w-3.5" />
                Invite
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden p-6">
            {activeView === "papers" && <PapersTable projectId={activeProjectId} />}
            {activeView === "notes" && <NoteEditor projectId={activeProjectId} />}
            {activeView === "ai_review" && <ReviewDraftUI projectId={activeProjectId} />}
            {activeView === "research_map" && <TopicMapVis projectId={activeProjectId} />}
            {activeView === "activity" && <ActivityFeed projectId={activeProjectId} />}
          </div>
        </WorkspaceLayout>
      ) : null}
    </div>
  );
}
