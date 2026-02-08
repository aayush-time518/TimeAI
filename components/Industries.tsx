
import React, { useRef, useState } from 'react';
import { ShoppingBag, Truck, Stethoscope, Briefcase, Landmark, PieChart, Activity, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

const IndustryData = [
  { 
      name: "Retail", 
      icon: <ShoppingBag />,
      useCase: "Dynamic inventory balancing using predictive demand modeling and seasonal variance analysis.",
      color: "blue",
      stat: "22% Waste Redux"
  },
  { 
      name: "Logistics", 
      icon: <Truck />,
      useCase: "Real-time route optimization and delay prediction through multi-modal sensor fusion.",
      color: "orange",
      stat: "Sub-Hour Accuracy"
  },
  { 
      name: "Healthcare", 
      icon: <Stethoscope />,
      useCase: "Patient flow optimization and resource allocation via high-fidelity predictive modeling.",
      color: "green",
      stat: "99% SLA Uptime"
  },
  { 
      name: "Fintech", 
      icon: <Landmark />,
      useCase: "Millisecond fraud detection and compliance audits leveraging real-time stream processing.",
      color: "purple",
      stat: "< 10ms Latency"
  },
  { 
      name: "Enterprise", 
      icon: <Briefcase />,
      useCase: "Automated knowledge retrieval (RAG) and cognitive onboarding for global distributed teams.",
      color: "slate",
      stat: "SOC2 Hardened"
  },
];

const TiltCard: React.FC<{ 
    industry: typeof IndustryData[0]; 
    index: number; 
    hoveredIndex: number | null; 
    setHoveredIndex: (i: number | null) => void 
}> = ({ industry, index, hoveredIndex, setHoveredIndex }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        setRotation({ x: -(y / (rect.height / 2)) * 10, y: (x / (rect.width / 2)) * 10 });
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setRotation({ x: 0, y: 0 });
    };

    const colors: Record<string, string> = {
        blue: 'text-gray-700 bg-gray-50 border-gray-200',
        orange: 'text-gray-700 bg-gray-50 border-gray-200',
        green: 'text-gray-700 bg-gray-50 border-gray-200',
        purple: 'text-gray-700 bg-gray-50 border-gray-200',
        slate: 'text-gray-700 bg-gray-50 border-gray-200',
    };

    const accentColors: Record<string, string> = {
        blue: 'bg-gray-700',
        orange: 'bg-gray-700',
        green: 'bg-gray-700',
        purple: 'bg-gray-700',
        slate: 'bg-gray-700',
    };

    const isActive = hoveredIndex === index;

    return (
        <div 
            ref={cardRef}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
            style={{ perspective: '1200px', zIndex: isActive ? 50 : 10 }}
        >
            {/* Main Interactive Card */}
            <div 
                className={`
                    w-24 h-24 md:w-32 md:h-32 rounded-3xl flex flex-col items-center justify-center gap-3 
                    transition-all duration-300 ease-out border shadow-sm group
                    ${isActive ? 'bg-white shadow-2xl scale-110 border-gray-400' : 'bg-white border-gray-300 opacity-80'}
                `}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    borderColor: isActive ? 'rgba(0,0,0,0.1)' : 'transparent',
                }}
            >
                <div className={`p-3 md:p-4 rounded-2xl transition-all duration-500 border-2 ${isActive ? colors[industry.color] + ' border-gray-300 shadow-md' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                    {React.cloneElement(industry.icon as React.ReactElement<any>, { 
                        size: 24,
                        className: isActive ? 'animate-pulse' : ''
                    })}
                </div>
                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                    {industry.name}
                </span>

                {/* Real-time Status Pulse */}
                {isActive && (
                    <div className="absolute top-2 right-2">
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${accentColors[industry.color]}`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${accentColors[industry.color]}`}></span>
                        </span>
                    </div>
                )}
            </div>

            {/* Tooltip HUD */}
            <div 
                className={`
                    absolute top-full mt-4 left-1/2 -translate-x-1/2 w-[260px] sm:w-80 
                    bg-white backdrop-blur-xl rounded-2xl p-5 shadow-2xl border-2 border-gray-300
                    transition-all duration-500 ease-out origin-top pointer-events-none
                    ${isActive ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'}
                `}
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${accentColors[industry.color]}`}></div>
                        <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">Active System</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-[9px] font-mono text-gray-900 font-black">
                        <Activity size={10} /> {industry.stat}
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="flex flex-col gap-1 text-left">
                        <h4 className="text-[8px] font-black text-gray-800 uppercase tracking-[0.2em]">Industry</h4>
                        <p className="text-sm font-black text-gray-900">{industry.name}</p>
                    </div>
                    <div className="h-px bg-gray-300 w-full"></div>
                    <h4 className="text-[10px] font-black text-gray-900 flex items-center gap-2">
                        <Zap size={12} className="text-gray-900" />
                        Core Logic
                    </h4>
                    <p className="text-[11px] text-gray-900 leading-relaxed font-black text-left">
                        {industry.useCase}
                    </p>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-300 flex items-center justify-between">
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                    </div>
                    <span className="text-[8px] font-black text-gray-900 uppercase tracking-wider">SECURED</span>
                </div>

                {/* Arrow */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-gray-300"></div>
            </div>
        </div>
    );
};

export const Industries: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 relative overflow-hidden border-t border-gray-200">
      {/* Visual background accents */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.03)_0%,transparent_70%)]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-gray-300 rounded-full mb-6 shadow-sm">
                <Globe size={12} className="text-gray-900" />
                <span className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em]">Global Domain Presence</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-sans font-black text-gray-900 mb-6 tracking-tight">
                Trusted by <span className="text-gray-900">Industry Leaders</span>
            </h2>
            <p className="text-base md:text-lg text-gray-900 font-black">
                Our intelligence architecture scales across diverse sectors, providing the same millisecond precision for global logistics as it does for high-stakes fintech.
            </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 lg:gap-16">
          {IndustryData.map((ind, i) => (
            <TiltCard 
                key={i} 
                industry={ind} 
                index={i} 
                hoveredIndex={hoveredIndex} 
                setHoveredIndex={setHoveredIndex} 
            />
          ))}
        </div>

        {/* Dynamic Data Stream Line */}
        <div className="mt-32 max-w-4xl mx-auto relative h-px bg-gray-100">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-tva-orange/40 to-transparent animate-[shimmer_2s_infinite]"></div>
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 px-6">
                 <div className="flex items-center gap-3">
                    <Cpu size={14} className="text-gray-600" />
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]">Continuous Sync Engine</span>
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
};
