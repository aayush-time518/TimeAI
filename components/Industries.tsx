import React, { useState } from 'react';
import { ShoppingBag, Truck, Stethoscope, Briefcase, Landmark, ChevronRight, Scan } from 'lucide-react';

export const Industries: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const industries = [
    { 
        name: "Retail & E-commerce", 
        icon: <ShoppingBag />,
        useCase: "Dynamic inventory balancing across warehouses using predictive demand modeling."
    },
    { 
        name: "Logistics & Supply Chain", 
        icon: <Truck />,
        useCase: "Real-time route optimization and anomaly detection for shipment delays."
    },
    { 
        name: "Healthcare", 
        icon: <Stethoscope />,
        useCase: "Patient flow optimization and predictive resource allocation for ERs."
    },
    { 
        name: "Finance & Fintech", 
        icon: <Landmark />,
        useCase: "Millisecond fraud detection and automated regulatory compliance audits."
    },
    { 
        name: "Professional Services", 
        icon: <Briefcase />,
        useCase: "Automated client onboarding workflows and knowledge retrieval (RAG)."
    },
  ];

  return (
    <section className="py-20 bg-tva-panel border-t border-tva-orange/20 relative">
      <div className="absolute inset-0 bg-tva-dark/50 opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-center text-tva-orange text-sm font-mono font-bold uppercase tracking-widest mb-12 text-glow">
          // TRUSTED BY INNOVATORS IN
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {industries.map((ind, i) => (
            <div 
                key={i} 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                // Apply z-50 on hover to ensure tooltip renders on top of siblings
                className={`relative flex flex-col items-center gap-4 transition-all duration-300 group cursor-default ${hoveredIndex === i ? 'z-50' : 'z-10'}`}
            >
              {/* Icon Container */}
              <div className={`p-5 rounded-full border-2 transition-all duration-300 relative ${hoveredIndex === i ? 'bg-tva-orange text-tva-dark border-tva-cream scale-110 shadow-[0_0_30px_rgba(234,88,12,0.6)]' : 'bg-tva-dark text-tva-cream/50 border-tva-cream/10 hover:border-tva-orange/50'}`}>
                {ind.icon}
                {/* Ping Effect on Hover */}
                {hoveredIndex === i && (
                     <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-30"></span>
                )}
              </div>
              
              <span className={`text-sm font-mono font-medium uppercase tracking-wider transition-colors duration-300 ${hoveredIndex === i ? 'text-tva-orange' : 'text-tva-cream/50'}`}>{ind.name}</span>
              
              {/* Holographic HUD Modal */}
              <div className={`absolute top-full mt-6 left-1/2 -translate-x-1/2 w-72 md:w-80 bg-tva-dark/95 backdrop-blur-xl border border-tva-orange/40 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-none transition-all duration-500 ease-out origin-top transform perspective-[1000px] ${hoveredIndex === i ? 'opacity-100 rotate-x-0 translate-y-0 scale-100' : 'opacity-0 -rotate-x-30 -translate-y-4 scale-95'}`}>
                  
                  {/* Connecting Data Line */}
                  <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-tva-orange/0 via-tva-orange to-tva-orange/50 transition-all duration-500 ${hoveredIndex === i ? 'h-6 opacity-100' : 'h-0 opacity-0'}`}></div>
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-tva-orange rotate-45 border border-tva-dark z-10"></div>

                  {/* Header Bar */}
                  <div className="bg-tva-orange/10 border-b border-tva-orange/20 p-3 flex justify-between items-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-tva-orange"></div>
                      <span className="text-[10px] font-mono font-bold text-tva-orange uppercase tracking-widest flex items-center gap-2">
                        <Scan size={12} className="animate-pulse" />
                        Use Case Detected
                      </span>
                      <div className="flex gap-1">
                          <div className="w-1 h-1 bg-tva-orange/50 rounded-full"></div>
                          <div className="w-1 h-1 bg-tva-orange/50 rounded-full"></div>
                          <div className="w-1 h-1 bg-tva-orange/50 rounded-full"></div>
                      </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 relative">
                      {/* Grid Background pattern */}
                      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(234,88,12,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(234,88,12,0.1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
                      
                      <p className="text-tva-cream/90 text-sm font-sans leading-relaxed relative z-10 border-l-2 border-tva-cream/10 pl-3">
                          {ind.useCase}
                      </p>
                  </div>
                  
                  {/* Footer Stats Line */}
                  <div className="bg-black/40 p-2 border-t border-tva-orange/10 flex justify-between items-center text-[9px] font-mono text-tva-cream/30 uppercase tracking-widest">
                      <span>Match Confidence: 99.8%</span>
                      <span>ID: {i + 140}X</span>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};