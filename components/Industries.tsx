import React, { useState } from 'react';
import { ShoppingBag, Truck, Stethoscope, Briefcase, Landmark, ChevronRight, Scan, PieChart } from 'lucide-react';

export const Industries: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const industries = [
    { 
        name: "Retail", 
        icon: <ShoppingBag />,
        useCase: "Dynamic inventory balancing using predictive demand modeling."
    },
    { 
        name: "Logistics", 
        icon: <Truck />,
        useCase: "Real-time route optimization and delay prediction."
    },
    { 
        name: "Healthcare", 
        icon: <Stethoscope />,
        useCase: "Patient flow optimization and resource allocation."
    },
    { 
        name: "Fintech", 
        icon: <Landmark />,
        useCase: "Millisecond fraud detection and compliance audits."
    },
    { 
        name: "Enterprise", 
        icon: <Briefcase />,
        useCase: "Automated onboarding and knowledge retrieval (RAG)."
    },
  ];

  return (
    <section className="py-24 bg-tva-dark border-t border-gray-200 relative">
      {/* Soft gradient background - Contained in overflow-hidden wrapper to prevent scrollbars while allowing content to pop out */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-80"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-tva-orange/5 blur-[100px] rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-center text-tva-orange text-xs font-bold uppercase tracking-widest mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          // Trusted By Innovators In
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {industries.map((ind, i) => (
            <div 
                key={i} 
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative group cursor-default ${hoveredIndex === i ? 'z-[60]' : 'z-10'}`}
            >
              {/* Icon Circle */}
              <div className={`
                w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-700 ease-luxury
                ${hoveredIndex === i 
                    ? 'bg-tva-orange text-white shadow-glow-blue scale-110 -translate-y-2 rotate-3' 
                    : 'bg-white text-gray-400 border border-gray-100 hover:border-tva-orange/30 hover:text-tva-orange hover:shadow-lg'}
              `}>
                {React.cloneElement(ind.icon as React.ReactElement, { size: 24, className: "transition-transform duration-700" })}
                <span className="text-[10px] font-bold uppercase tracking-wide">{ind.name}</span>
              </div>
              
              {/* Floating Glass Card (Replaces Dark HUD) */}
              <div className={`
                absolute top-full mt-6 left-1/2 -translate-x-1/2 w-72 
                glass-card rounded-xl p-5 shadow-2xl border border-white/80
                transition-all duration-700 ease-luxury origin-top
                ${hoveredIndex === i 
                    ? 'opacity-100 translate-y-0 scale-100 visible' 
                    : 'opacity-0 -translate-y-4 scale-95 invisible'}
              `}>
                  {/* Decorative Header */}
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-100/50">
                      <div className="flex items-center gap-2 text-tva-orange text-[10px] font-bold uppercase tracking-wider">
                          <PieChart size={12} /> Use Case
                      </div>
                      <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-tva-orange/40 animate-pulse"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-tva-orange/20"></div>
                      </div>
                  </div>

                  {/* Content */}
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {ind.useCase}
                  </p>

                  {/* Connecting Arrow/Line */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/80 rotate-45 border-l border-t border-white"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};