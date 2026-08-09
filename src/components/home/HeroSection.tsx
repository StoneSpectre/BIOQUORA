import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Network } from "lucide-react";
import { Link } from "react-router-dom";
import EarlyAccessModal from "@/components/common/EarlyAccessModal";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#000000] text-gray-200">
      {/* Deep Tech God Mode Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="container relative py-20 sm:py-28 lg:py-40 z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-950/30 backdrop-blur-md px-4 py-1.5 text-xs font-mono text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
            BioFederated V2.0 Online
          </div>

          {/* Headline */}
          <h1 className="mb-6 animate-fade-in text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter">
            The <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Decentralized AI</span> Operating System for Biology
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-lg text-gray-400 sm:text-xl animate-fade-in max-w-2xl mx-auto font-mono leading-relaxed" style={{ animationDelay: "0.1s" }}>
            Democratizing "God Mode" research. 20 intelligent subsystems integrating Literature, Multi-Agent Swarms, Molecular Simulations, and Global Federated Learning.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row animate-fade-in mt-4" style={{ animationDelay: "0.2s" }}>
            <Link to="/launcher">
              <Button size="lg" className="h-14 px-8 text-lg font-bold gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] border border-indigo-400/50 transition-all hover:scale-105">
                <Zap className="h-5 w-5 fill-current animate-pulse" />
                Initialize BioCore (20 Stages)
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <EarlyAccessModal
              trigger={
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold gap-3 bg-[#050505]/80 backdrop-blur-sm border-gray-800 text-gray-300 hover:bg-gray-900 transition-all hover:border-gray-600">
                  <Network className="h-5 w-5 text-gray-500" />
                  Join the Federated Network
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
