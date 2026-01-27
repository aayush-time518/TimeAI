import React from 'react';
import { ShoppingBag, Truck, Stethoscope, Briefcase, Landmark } from 'lucide-react';

export const Industries: React.FC = () => {
  const industries = [
    { name: "Retail & E-commerce", icon: <ShoppingBag /> },
    { name: "Logistics & Supply Chain", icon: <Truck /> },
    { name: "Healthcare", icon: <Stethoscope /> },
    { name: "Finance & Fintech", icon: <Landmark /> },
    { name: "Professional Services", icon: <Briefcase /> },
  ];

  return (
    <section className="py-20 bg-tva-panel border-t border-tva-orange/20 relative">
      <div className="absolute inset-0 bg-tva-dark/50 opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-center text-tva-orange text-sm font-mono font-bold uppercase tracking-widest mb-10 text-glow">
          // TRUSTED BY INNOVATORS IN
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {industries.map((ind, i) => (
            <div key={i} className="flex flex-col items-center gap-3 text-tva-cream/50 hover:text-tva-orange transition-all duration-300 group cursor-default hover:scale-105">
              <div className="p-4 bg-tva-dark rounded-full border border-tva-cream/10 group-hover:border-tva-orange/50 group-hover:shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all">
                {ind.icon}
              </div>
              <span className="text-sm font-mono font-medium uppercase tracking-wider">{ind.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};