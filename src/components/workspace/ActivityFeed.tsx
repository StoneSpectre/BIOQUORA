import { useQuery } from "@tanstack/react-query";
import { Activity, Clock, CheckCircle2, MessageSquare, Link as LinkIcon, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";

interface ActivityFeedProps {
  projectId: string;
}

const ACTION_ICONS: Record<string, any> = {
  "saved paper": LinkIcon,
  "added a comment to note": MessageSquare,
  "assigned paper to James Wilson": CheckCircle2,
  "generated AI Literature Review": Activity,
};

export function ActivityFeed({ projectId }: ActivityFeedProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['activity_feed', projectId],
    queryFn: async () => {
      // Temporary mock fetch to local api
      // const res = await fetch(`/api/workspace/projects/${projectId}/activity`);
      // return res.json();
      
      // Simulate network delay
      await new Promise(res => setTimeout(res, 800));
      return {
        events: [
          { id: "ev_1", user_name: "Dr. Sarah Chen", action: "saved paper", target: "LRRK2 kinase activity in Parkinson disease pathogenesis", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString() },
          { id: "ev_2", user_name: "James Wilson", action: "added a comment to note", target: "Mitochondrial Dysfunction Hypothesis", timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString() },
          { id: "ev_3", user_name: "You", action: "assigned paper to James Wilson", target: "Identification of SNCA mutations", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() },
          { id: "ev_4", user_name: "System", action: "generated AI Literature Review", target: "Parkinson's Disease Targets", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() },
        ]
      };
    }
  });

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-card/30 border border-border/50 rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-border/50 bg-background/50 backdrop-blur-md shrink-0">
        <Users className="h-4 w-4 text-primary" />
        <span className="font-semibold text-sm">Team Activity Feed</span>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <div className="relative border-l border-border/50 ml-4 space-y-8 pb-8">
            {data?.events.map((event: any, i: number) => {
              const Icon = ACTION_ICONS[event.action] || Clock;
              return (
                <div key={event.id} className="relative pl-8">
                  <div className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-background border border-border/50 flex items-center justify-center">
                    <Icon className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <div className="bg-background/50 border border-border/50 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-foreground">{event.user_name}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(event.timestamp), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="text-primary">{event.action}</span>: <span className="font-medium text-foreground">{event.target}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
