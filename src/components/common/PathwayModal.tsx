import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { pathwaysData } from "@/data/pathwaysData";
import { Activity, Pill, Stethoscope, Dna, ArrowRight } from "lucide-react";

interface PathwayModalProps {
  id: string;
  triggerText?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  className?: string;
}

export function PathwayModal({ 
  id, 
  triggerText = "Explore Full Pathway", 
  variant = "default",
  className = "w-full mt-auto"
}: PathwayModalProps) {
  const data = pathwaysData[id];

  if (!data) {
    return (
      <Button className={className} variant={variant} disabled>
        Content Unavailable
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={className} variant={variant}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden bg-background border-border/60">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 border-b border-border/40 bg-muted/10 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="bg-background text-primary/80 border-primary/20">
                {data.category}
              </Badge>
            </div>
            <DialogTitle className="text-2xl sm:text-3xl font-semibold text-primary">
              {data.title}
            </DialogTitle>
            <DialogDescription className="text-base mt-3 text-foreground/90 leading-relaxed">
              {data.overview}
            </DialogDescription>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-background to-muted/5">
            <div className="space-y-10 pb-6">
              
              {/* Pathophysiology Mechanisms */}
              <section>
                <div className="flex items-center gap-2 mb-4 border-b border-border/50 pb-2">
                  <Dna className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Pathophysiology & Mechanisms</h3>
                </div>
                <div className="space-y-3 bg-muted/20 p-5 rounded-xl border border-border/30">
                  {data.mechanisms.map((point, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-primary/70" />
                      <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Clinical Presentation */}
              <section>
                <div className="flex items-center gap-2 mb-4 border-b border-border/50 pb-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Clinical Presentation</h3>
                </div>
                <ul className="space-y-3 pl-2">
                  {data.clinical.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary/60 mt-2 shrink-0" />
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{point}</p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Pharmacology */}
              <section>
                <div className="flex items-center gap-2 mb-4 border-b border-border/50 pb-2">
                  <Pill className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Pharmacological Interventions</h3>
                </div>
                <div className="grid gap-3">
                  {data.pharmacology.map((point, i) => (
                    <div key={i} className="bg-background border border-border/60 p-4 rounded-lg shadow-sm hover:border-primary/30 transition-colors">
                      <p className="text-sm sm:text-base text-foreground/80">{point}</p>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
