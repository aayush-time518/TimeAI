import React, { useRef, useState } from 'react';
import { ShoppingBag, Truck, Stethoscope, Briefcase, Landmark, ChevronRight, Scan, PieChart } from 'lucide-react';

const TiltCard: React.FC<{ 
    industry: { name: string; icon: React.ReactNode; useCase: string }; 
    index: number; 
    hoveredIndex: number | null; 
    setHoveredIndex: (i: number | null) => void 
}> = ({ industry, index, hoveredIndex, setHoveredIndex }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        
        // Tilt intensity (Max 15deg)
        const rotateY = (x / (rect.width / 2)) * 15;
        const rotateX = -(y / (rect.height / 2)) * 15;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
        setRotation({ x: 0, y: 0 }); // Reset to flat
    };

    return (
        <div 
            ref={cardRef}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: '1000px',
                zIndex: hoveredIndex === index ? 50 : 10
            }}
            className="relative group cursor-default"
        >
            <div 
                className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-300 ease-out shadow-sm border border-gray-100 bg-white"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${hoveredIndex === index ? 1.1 : 1})`,
                    borderColor: hoveredIndex === index ? 'rgba(37,99,235,0.3)' : 'rgb(243,244,246)',
                    boxShadow: hoveredIndex === index ? '0 20px 40px -10px rgba(37,99,235,0.3)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
                    color: hoveredIndex === index ? '#2563eb' : '#9ca3af'
                }}
            >
                {React.cloneElement(industry.icon as React.ReactElement<any>, { size: 24 })}
                <span className="text-[10px] font-bold uppercase tracking-wide">{industry.name}</span>
            </div>

            {/* Floating Glass Card (Replaces Dark HUD) */}
            <div 
                className={`
                    absolute top-full mt-6 left-1/2 -translate-x-1/2 w-72 
                    glass-card rounded-xl p-5 shadow-2xl border border-white/80
                    transition-all duration-500 ease-luxury origin-top
                `}
                style={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    transform: hoveredIndex === index 
                        ? `translate(-50%, 0) rotateX(${rotation.x * 0.5}deg) rotateY(${rotation.y * 0.5}deg)` 
                        : 'translate(-50%, -10px)',
                    visibility: hoveredIndex === index ? 'visible' : 'hidden',
                    pointerEvents: 'none' // Let mouse pass through to container
                }}
            >
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
                    {industry.useCase}
                </p>

                {/* Connecting Arrow/Line */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/80 rotate-45 border-l border-t border-white"></div>
            </div>
        </div>
    );
};

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
      {/* Soft gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-80"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-tva-orange/5 blur-[100px] rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <p className="text-center text-tva-orange text-xs font-bold uppercase tracking-widest mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          // Trusted By Innovators In
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12Perspective">
          {industries.map((ind, i) => (
            <TiltCard 
                key={i} 
                industry={ind} 
                index={i} 
                hoveredIndex={hoveredIndex} 
                setHoveredIndex={setHoveredIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};