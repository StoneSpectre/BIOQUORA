import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Network } from "lucide-react";
import { Link } from "react-router-dom";
import EarlyAccessModal from "@/components/common/EarlyAccessModal";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#020617] text-gray-200">
      {/* Professional Gradient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      <div className="container relative py-20 sm:py-28 lg:py-40 z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/30 backdrop-blur-md px-4 py-1.5 text-xs font-mono text-blue-300 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            BioFederated Platform Live
          </div>

          {/* Headline */}
          <h1 className="mb-6 animate-fade-in text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            The <span className="text-blue-500">Decentralized AI</span> Operating System for Biology
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-lg text-gray-400 sm:text-xl animate-fade-in max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: "0.1s" }}>
            An enterprise-grade research platform. 20 intelligent subsystems integrating medical literature, multi-agent swarms, molecular simulations, and secure global federated learning.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in mt-4" style={{ animationDelay: "0.2s" }}>
            <Link to="/launcher">
              <Button size="lg" className="h-14 px-8 text-lg font-semibold gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all">
                <BookOpen className="h-5 w-5" />
                Access Bioquora Platform
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <EarlyAccessModal
              trigger={
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold gap-2 bg-transparent border-gray-700 text-gray-300 hover:bg-gray-900 transition-all">
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
