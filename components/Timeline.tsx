import React from 'react';
import { ScanSearch, Cpu, Network, RefreshCw, ArrowRight, Clock } from 'lucide-react';

const STEPS = [
    {
      id: "01",
      title: "Audit & Map",
      desc: "We scan your databases and workflows to identify latency bottlenecks in 48 hours.",
      icon: <ScanSearch size={24} />,
    },
    {
      id: "02",
      title: "Architect",
      desc: "Our engineers design bespoke AI agents tailored to your specific topology.",
      icon: <Cpu size={24} />,
    },
    {
      id: "03",
      title: "Validate",
      desc: "We run in 'shadow mode' to prove ROI before a single line of code goes live.",
      icon: <Network size={24} />,
    },
    {
      id: "04",
      title: "Automate",
      desc: "Full deployment with self-healing feedback loops that continuously optimize.",
      icon: <RefreshCw size={24} />,
    }
];

export const Timeline: React.FC = () => {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 border-t border-gray-200">
       <div className="container mx-auto px-6">
         
         <div className="max-w-3xl mx-auto text-center mb-20">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-full mb-8 shadow-md">
                 <Clock size={14} className="text-gray-900" />
                 <span className="text-xs font-black text-gray-900 uppercase tracking-wide">The Protocol</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-sans font-black text-gray-900 mb-8 tracking-tight">
                 From Chaos to Clarity
             </h2>
             <p className="text-lg md:text-xl text-gray-900 font-black max-w-2xl mx-auto leading-relaxed">
                 A streamlined 4-step process to transform your legacy infrastructure into an intelligent, autonomous system.
             </p>
         </div>

         <div className="grid md:grid-cols-4 gap-8 relative">
             {/* Connecting Line with Animated Data Stream - Hidden */}
             {/* <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gray-200 -z-0 overflow-hidden rounded-full">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tva-orange/80 to-transparent w-1/3 animate-[shimmer_2s_infinite]"></div>
             </div> */}

             {STEPS.map((step, idx) => (
                 <div key={idx} className="relative group">
                     {/* Card Container */}
                     <div className="bg-white p-8 rounded-2xl border-2 border-gray-300 shadow-md hover:shadow-2xl hover:-translate-y-2 hover:border-gray-400 transition-all duration-500 ease-out h-full flex flex-col items-start relative z-10 group-hover:bg-gray-50">
                         
                         {/* Number Badge */}
                         <div className="absolute top-6 right-6 text-4xl font-bold text-gray-100 font-mono group-hover:text-gray-200 transition-colors">
                             {step.id}
                         </div>

                         {/* Icon Box */}
                         <div className="w-14 h-14 rounded-xl bg-gray-50 text-gray-900 flex items-center justify-center mb-6 border-2 border-gray-300 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all duration-500 shadow-md group-hover:shadow-xl relative overflow-hidden">
                             {step.icon}
                             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                         </div>

                         <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                             {step.title}
                         </h3>
                         
                         <p className="text-gray-800 text-sm leading-relaxed font-semibold">
                             {step.desc}
                         </p>
                     </div>
                 </div>
             ))}
         </div>

         <div className="mt-20 text-center">
             <button className="inline-flex items-center gap-2 text-sm font-black text-gray-900 uppercase tracking-widest hover:gap-4 transition-all hover:text-gray-700">
                 View Documentation <ArrowRight size={16} />
             </button>
         </div>

       </div>
    </section>
  );
};
