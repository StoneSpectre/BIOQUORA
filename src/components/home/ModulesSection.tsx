import { Heart, Droplet, Shield, Brain, Zap, Baby, Waves, Wind, ActivitySquare, Eye, Ear, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { ModuleCard } from "./ModuleCard";
import { useRef } from "react";

const modules = [
  {
    title: "Cardiovascular Physiology",
    description: "Interactive hemodynamic models with real-time Frank-Starling curves, MAP trends, and oxygen delivery calculations.",
    icon: Heart,
    path: "/cardiovascular",
    colorClass: "text-red-500",
    concepts: [
      "Frank-Starling Hemodynamics",
      "Mean Arterial Pressure (MAP) Variance",
      "Myocardial Oxygen Demand",
      "Ventricular Compliance Modeling"
    ]
  },
  {
    title: "Renal Physiology",
    description: "Explore autoregulation curves, MAP vs GFR relationships, and understand why creatinine is a lagging marker.",
    icon: Droplet,
    path: "/renal",
    colorClass: "text-blue-500",
    concepts: [
      "Glomerular Filtration Dynamics",
      "Tubuloglomerular Feedback",
      "Acid-Base Buffering Systems",
      "RAAS Pathway Activation"
    ]
  },
  {
    title: "Immunology & Inflammation",
    description: "Visualize cytokine cascades, immune-vascular coupling, and understand sepsis as a coupled control failure.",
    icon: Shield,
    path: "/immunology",
    colorClass: "text-green-500",
    concepts: [
      "Cytokine Storm Cascades",
      "Macrophage Phagocytosis",
      "T-Cell Receptor Binding",
      "Autoimmune Pathway Inhibitors"
    ]
  },
  {
    title: "ICU Systems Thinking",
    description: "Essays on clinical reasoning: why treating numbers harms patients and why explainability beats accuracy.",
    icon: Brain,
    path: "/system-thinking",
    colorClass: "text-indigo-400",
    concepts: [
      "Multi-Organ Failure Cascades",
      "Hemodynamic Phenotyping",
      "Causal Clinical Reasoning",
      "Predictive Mortality Indices"
    ]
  },
  {
    title: "Nervous System",
    description: "Analyze action potentials, neurotransmitter dynamics, and explore the pathology of neurodegenerative states.",
    icon: Zap,
    path: "/nervous",
    colorClass: "text-purple-500",
    concepts: [
      "Action Potential Propagation",
      "Synaptic Cleft Dynamics",
      "Blood-Brain Barrier Integrity",
      "Neuroplasticity Modeling"
    ]
  },
  {
    title: "Reproductive",
    description: "Track complex hormonal feedback loops, ovarian cycles, and physiological changes during gestation.",
    icon: Baby,
    path: "/reproductive",
    colorClass: "text-pink-500",
    concepts: [
      "Hormonal Feedback Loops",
      "Endometrial Receptivity",
      "Fetal-Maternal Circulation",
      "Embryogenesis Stages"
    ]
  },
  {
    title: "Hepatic",
    description: "Understand hepatic lobule hemodynamics, bilirubin metabolism, and portal hypertension mechanisms.",
    icon: Waves,
    path: "/hepatic",
    colorClass: "text-orange-500",
    concepts: [
      "Bilirubin Metabolism",
      "Portal Venous Hypertension",
      "Cytochrome P450 Clearances",
      "Hepatocyte Regeneration"
    ]
  },
  {
    title: "Respiratory",
    description: "Visualize V/Q mismatch, alveolar gas equations, and the mechanics of ARDS.",
    icon: Wind,
    path: "/respiratory",
    colorClass: "text-cyan-500",
    concepts: [
      "V/Q Mismatch Topologies",
      "Alveolar Gas Equations",
      "Compliance vs Resistance",
      "ARDS Pathophysiology"
    ]
  },
  {
    title: "Endocrine",
    description: "Explore the HPA axis, thyroid regulation, and the multi-system impact of hormone imbalances.",
    icon: ActivitySquare,
    path: "/endocrine",
    colorClass: "text-yellow-500",
    concepts: [
      "HPA Axis Regulation",
      "Insulin Resistance Pathways",
      "Thyroid Feedback Loops",
      "Glucocorticoid Signaling"
    ]
  },
  {
    title: "Ophthalmology",
    description: "Analyze aqueous humor dynamics, retinal phototransduction, and glaucoma pathophysiology.",
    icon: Eye,
    path: "/ophthalmology",
    colorClass: "text-sky-500",
    concepts: [
      "Retinal Phototransduction",
      "Aqueous Humor Dynamics",
      "Intraocular Pressure Variance",
      "Optic Nerve Neuropathy"
    ]
  },
  {
    title: "ENT",
    description: "Discover vestibular balance, auditory transduction, and the mechanisms of conductive vs sensorineural loss.",
    icon: Ear,
    path: "/ent",
    colorClass: "text-amber-600",
    concepts: [
      "Vestibular Kinematics",
      "Cochlear Transduction",
      "Sensorineural Deficits",
      "Olfactory Receptor Mapping"
    ]
  },
  {
    title: "Recommendations Engine",
    description: "Personalized research paper recommendations driven by semantic vector embeddings and Anthropic Claude AI explanations.",
    icon: Layers,
    path: "/recommendations",
    colorClass: "text-amber-400",
    concepts: [
      "Semantic Vector Embeddings",
      "Retrieval-Augmented Generation",
      "Citation Knowledge Graphs",
      "Automated Literature Review"
    ]
  },
];

export function ModulesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 overflow-hidden relative bg-[#020617] border-t border-gray-900">
      <div className="container mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">Explore Scientific Modules</h2>
        <p className="mx-auto max-w-2xl text-gray-400 font-mono">
          Each domain module presents physiology as interconnected systems with
          real-time AI visualizations and actionable clinical interpretations.
        </p>
      </div>

      <div className="relative w-full max-w-[100vw] group">
        {/* Left Arrow */}
        <button 
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white border border-gray-700 shadow-2xl transition-all hover:bg-gray-800 hover:scale-110 sm:group-hover:flex"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>

        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex w-full gap-8 overflow-x-auto snap-x snap-mandatory py-10 px-6 sm:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {modules.map((module, idx) => (
            <div key={module.path} className="w-[320px] sm:w-[400px] shrink-0 snap-center h-full">
              <ModuleCard {...module} delay={idx * 0.1} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white border border-gray-700 shadow-2xl transition-all hover:bg-gray-800 hover:scale-110 sm:group-hover:flex"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      </div>
    </section>
  );
}
