import { LucideIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  colorClass: string;
  concepts?: string[];
  delay?: number;
}

export function ModuleCard({
  title,
  description,
  icon: Icon,
  path,
  colorClass,
  concepts,
  delay = 0,
}: ModuleCardProps) {
  return (
    <Link
      to={path}
      className="group animate-fade-in flex flex-col w-full h-full"
      style={{ animationDelay: `${delay}s` }}
    >
      <article className="relative flex-1 flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-[#0a0a0c] p-7 transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-1">
        {/* Icon */}
        <div
          className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-900 border border-gray-800 transition-transform duration-300 group-hover:scale-110",
            colorClass === "text-cardio" && "border-red-900/50",
            colorClass === "text-renal" && "border-blue-900/50",
            colorClass === "text-immune" && "border-green-900/50",
            colorClass === "text-systems" && "border-indigo-900/50",
            colorClass === "text-purple-500" && "border-purple-900/50",
            colorClass === "text-pink-500" && "border-pink-900/50",
            colorClass === "text-orange-500" && "border-orange-900/50",
            colorClass === "text-blue-500" && "border-blue-900/50",
            colorClass === "text-yellow-500" && "border-yellow-900/50",
            colorClass === "text-sky-500" && "border-sky-900/50",
            colorClass === "text-amber-500" && "border-amber-900/50"
          )}
        >
          <Icon className={cn("h-6 w-6", colorClass)} />
        </div>

        {/* Content */}
        <h3 className="mb-2 text-xl font-bold text-gray-200">{title}</h3>
        <p className="mb-6 text-sm text-gray-400 leading-relaxed">
          {description}
        </p>

        {/* Concepts List */}
        {concepts && concepts.length > 0 && (
          <div className="mb-6 space-y-2 flex-1">
            {concepts.map((concept, idx) => (
              <div key={idx} className="flex items-start text-xs text-gray-500 font-mono">
                <CheckCircle2 className={cn("w-3.5 h-3.5 mr-2 mt-0.5 shrink-0 opacity-70", colorClass)} />
                <span className="leading-tight">{concept}</span>
              </div>
            ))}
          </div>
        )}

        {/* Arrow indicator */}
        <div className="mt-auto flex items-center gap-2 text-sm font-bold text-blue-500 transition-transform duration-300 group-hover:translate-x-1 uppercase tracking-wider">
          Explore Module
          <ArrowRight className="h-4 w-4" />
        </div>

        {/* Decorative gradient on hover */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none",
            "bg-gradient-to-br from-transparent via-transparent to-blue-500/5"
          )}
        />
      </article>
    </Link>
  );
}
