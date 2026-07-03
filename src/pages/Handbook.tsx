import React, { useState, useEffect } from 'react';
import { Layout } from "@/components/layout/Layout";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Book, ChevronRight, BookOpen } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const VOLUMES = [
  {
    title: "Volume I: Semantic Layer",
    folder: "volume-1-semantic-layer",
    chapters: [
      { id: "ch1-introduction-to-biomedical-knowledge", title: "Chapter 1: Intro to Biomedical Knowledge" },
      { id: "ch2-biomedical-ontologies", title: "Chapter 2: Biomedical Ontologies" },
      { id: "ch3-biomedical-identifier-systems", title: "Chapter 3: Identifiers & Mappings" },
      { id: "ch4-knowledge-representation", title: "Chapter 4: Advanced Graph Data Modeling" },
      { id: "ch5-entity-resolution", title: "Chapter 5: Literature as Evidence" },
      { id: "ch6-semantic-search", title: "Chapter 6: Hybrid Semantic Search" },
      { id: "ch7-knowledge-graph-design", title: "Chapter 7: Knowledge Graph Design" },
      { id: "ch8-research-papers", title: "Chapter 8: Research Papers & Literature" },
      { id: "ch9-books-reading-plan", title: "Chapter 9: Books & Reading Plan" },
      { id: "ch10-implementation", title: "Chapter 10: Implementation Roadmap" }
    ]
  },
  {
    title: "Volume II: Infrastructure",
    folder: "volume-2-infrastructure",
    chapters: [
      { id: "ch1-infrastructure-philosophy", title: "Chapter 1: Compute & Storage Philosophy" },
      { id: "ch2-data-sources", title: "Chapter 2: Data Sources & Ingestion" },
      { id: "ch3-data-engineering", title: "Chapter 3: Data Engineering Pipelines" },
      { id: "ch4-storage-layer", title: "Chapter 4: Storage & Data Lake" },
      { id: "ch5-metadata", title: "Chapter 5: Metadata & Governance" },
      { id: "ch6-healthcare-standards", title: "Chapter 6: FHIR & OMOP Standards" },
      { id: "ch7-api-architecture", title: "Chapter 7: API Architecture" },
      { id: "ch8-pipeline-orchestration", title: "Chapter 8: Pipeline Orchestration" },
      { id: "ch9-search-infrastructure", title: "Chapter 9: Search Infrastructure" },
      { id: "ch10-production-architecture", title: "Chapter 10: Production & MLOps Architecture" },
      { id: "ch11-research-papers", title: "Chapter 11: Core Engineering Literature" },
      { id: "ch12-implementation-architecture", title: "Chapter 12: Implementation Architecture" }
    ]
  }
];

export default function Handbook() {
  const [activeChapter, setActiveChapter] = useState<{folder: string, id: string}>({ folder: VOLUMES[0].folder, id: VOLUMES[0].chapters[0].id });
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/docs/${activeChapter.folder}/${activeChapter.id}.md`);
        if (response.ok) {
          const text = await response.text();
          setMarkdown(text);
        } else {
          setMarkdown('# Error\\nCould not load chapter. File not found in public directory.');
        }
      } catch (e) {
        setMarkdown('# Error\\nFailed to fetch chapter.');
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [activeChapter]);

  return (
    <Layout>
      <div className="flex h-[calc(100vh-4rem)] bg-slate-950 text-slate-200">
        
        {/* Table of Contents Sidebar */}
        <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col h-full shrink-0">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-100">
              <BookOpen className="text-cyan-400" size={20} />
              Engineering Handbook
            </h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              {VOLUMES.map((vol, vIdx) => (
                <div key={vIdx}>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Book size={14} /> {vol.title}
                  </h3>
                  <div className="space-y-1">
                    {vol.chapters.map((ch) => {
                      const isActive = activeChapter.id === ch.id && activeChapter.folder === vol.folder;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => setActiveChapter({ folder: vol.folder, id: ch.id })}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-md text-sm transition-all flex items-start gap-2",
                            isActive 
                              ? "bg-cyan-500/20 text-cyan-300 font-medium" 
                              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          )}
                        >
                          {isActive && <ChevronRight size={14} className="mt-0.5 shrink-0" />}
                          <span className={cn("flex-1", !isActive && "pl-5")}>{ch.title}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Markdown Reader */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8 md:p-12">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-10 bg-slate-800 rounded w-3/4"></div>
                <div className="h-4 bg-slate-800 rounded w-full mt-8"></div>
                <div className="h-4 bg-slate-800 rounded w-5/6"></div>
                <div className="h-4 bg-slate-800 rounded w-full"></div>
                <div className="h-4 bg-slate-800 rounded w-4/5"></div>
              </div>
            ) : (
              <div className="prose prose-invert prose-slate prose-headings:text-slate-100 prose-a:text-cyan-400 prose-code:text-emerald-300 prose-pre:bg-slate-900 max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {markdown}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
