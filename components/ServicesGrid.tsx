import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bot, Zap, X, ArrowRight, Database, Server, LineChart, Activity, Power, Layers, GitBranch, Network, BarChart3, Share2, Code2, TrendingUp, Workflow, BrainCircuit, Radar, UserCog } from 'lucide-react';
import { ServiceCardProps, ViewState } from '../types';
import { playSound } from '../utils/sound';

/* --- CUSTOM VISUALS COMPONENT --- */
const ServiceVisual: React.FC<{ type: string; isHovered: boolean }> = ({ type, isHovered }) => {
  const color = isHovered ? "#ea580c" : "#78716c"; // Orange vs Stone-500
  const opacity = isHovered ? 0.2 : 0.05;

  switch (type) {
    case 'analytics': // Snowflake/Tableau
      return (
        <svg className={`absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none transition-all duration-700 ${isHovered ? 'scale-110 opacity-100' : 'opacity-60'}`} viewBox="0 0 100 100">
           <g fill={isHovered ? color : "none"} stroke={color} strokeWidth="0.5" strokeOpacity={opacity} className="transition-all duration-500">
             {/* Bar Chart Abstract - Fills on hover */}
             <rect x="10" y="60" width="15" height="30" fillOpacity={isHovered ? 0.1 : 0} className={isHovered ? "animate-[pulse_2s_infinite]" : ""} />
             <rect x="30" y="40" width="15" height="50" fillOpacity={isHovered ? 0.2 : 0} className={isHovered ? "animate-[pulse_2s_infinite_100ms]" : ""} />
             <rect x="50" y="20" width="15" height="70" fillOpacity={isHovered ? 0.3 : 0} className={isHovered ? "animate-[pulse_2s_infinite_200ms]" : ""} />
             <rect x="70" y="50" width="15" height="40" fillOpacity={isHovered ? 0.15 : 0} className={isHovered ? "animate-[pulse_2s_infinite_300ms]" : ""} />
             
             {/* Snowflake-ish Hexagon - Rotates on hover */}
             <g className={isHovered ? "animate-[spin_10s_linear_infinite]" : ""} style={{transformOrigin: '85px 25px'}}>
                <path d="M85 15 L95 20 L95 30 L85 35 L75 30 L75 20 Z" strokeWidth="1" fill="none" />
                <circle cx="85" cy="25" r="2" fill={color} fillOpacity={opacity} />
             </g>
           </g>
        </svg>
      );
    case 'chat': // Neural/Chatbot
      return (
        <svg className={`absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none transition-all duration-700 ${isHovered ? 'scale-105' : ''}`} viewBox="0 0 100 100">
           <g fill="none" stroke={color} strokeWidth="0.5" strokeOpacity={opacity}>
              {/* Outer Rings */}
              <circle cx="50" cy="50" r="30" strokeDasharray="4 4" className={isHovered ? "animate-[spin_4s_linear_infinite]" : "animate-[spin_10s_linear_infinite]"} style={{transformOrigin: '50px 50px'}} />
              <circle cx="50" cy="50" r="35" strokeDasharray="2 6" className={isHovered ? "animate-[spin_6s_linear_infinite_reverse] opacity-50" : "opacity-0"} style={{transformOrigin: '50px 50px'}} />
              
              <circle cx="50" cy="50" r="20" strokeWidth="1" className={isHovered ? "stroke-tva-orange" : ""} />
              <path d="M30 50 H70 M50 30 V70" className={isHovered ? "animate-pulse stroke-tva-orange" : ""} />
              
              {/* Nodes - Expand on hover */}
              <circle cx="35" cy="35" r={isHovered ? 3 : 2} fill={color} fillOpacity={opacity} className="transition-all duration-300" />
              <circle cx="65" cy="65" r={isHovered ? 3 : 2} fill={color} fillOpacity={opacity} className="transition-all duration-300" />
              <circle cx="35" cy="65" r={isHovered ? 3 : 2} fill={color} fillOpacity={opacity} className="transition-all duration-300" />
              <circle cx="65" cy="35" r={isHovered ? 3 : 2} fill={color} fillOpacity={opacity} className="transition-all duration-300" />
           </g>
        </svg>
      );
    case 'anomaly': // Anomaly/Server
      return (
        <svg className="absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none transition-all duration-500" viewBox="0 0 100 100">
           {/* Normal Data Stream */}
           <path d="M0 80 Q 25 80 35 50 T 70 80 T 100 80" fill="none" stroke={color} strokeWidth="1" strokeOpacity={opacity} className={isHovered ? "animate-pulse" : ""} strokeDasharray={isHovered ? "5 2" : "none"} />
           
           {/* Baseline */}
           <path d="M0 90 Q 25 90 40 70 T 80 90 T 100 90" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity={opacity} />
           
           {/* Bounding Box */}
           <rect x="40" y="20" width="20" height="20" fill="none" stroke={isHovered ? "#ef4444" : color} strokeOpacity={isHovered ? 0.8 : opacity} className="transition-colors duration-300" strokeDasharray={isHovered ? "2 2" : ""} />
           
           {/* The Anomaly Dot */}
           <circle cx="50" cy="30" r={isHovered ? 6 : 4} fill={isHovered ? "#ef4444" : color} fillOpacity={isHovered ? 0.8 : 0} className="transition-all duration-300 animate-pulse" />
           {isHovered && (
               <circle cx="50" cy="30" r="10" stroke="#ef4444" strokeWidth="0.5" fill="none" className="animate-ping" />
           )}
        </svg>
      );
    case 'pipeline': // Data Pipelines
      return (
        <svg className="absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none transition-all duration-500" viewBox="0 0 100 100">
           <g fill="none" stroke={color} strokeWidth="0.8" strokeOpacity={opacity}>
             <path d="M10 20 H30 L40 30 H60 L70 20 H90" className={isHovered ? "stroke-tva-orange" : ""} />
             <path d="M10 50 H30 L40 60 H60 L70 50 H90" className={isHovered ? "stroke-tva-orange delay-100" : ""} />
             <path d="M10 80 H30 L40 70 H60 L70 80 H90" className={isHovered ? "stroke-tva-orange delay-200" : ""} />
             
             {/* Data Packets Moving */}
             {isHovered && (
                 <>
                    <circle r="2" fill="#ea580c">
                        <animateMotion dur="1.5s" repeatCount="indefinite" path="M10 20 H30 L40 30 H60 L70 20 H90" />
                    </circle>
                    <circle r="2" fill="#ea580c">
                        <animateMotion dur="2s" repeatCount="indefinite" path="M10 50 H30 L40 60 H60 L70 50 H90" />
                    </circle>
                    <circle r="2" fill="#ea580c">
                        <animateMotion dur="1.8s" repeatCount="indefinite" path="M10 80 H30 L40 70 H60 L70 80 H90" />
                    </circle>
                 </>
             )}

             {/* Nodes */}
             <circle cx="20" cy="20" r="2" fill={color} fillOpacity={opacity} />
             <circle cx="50" cy="30" r="2" fill={color} fillOpacity={opacity} />
             <circle cx="80" cy="20" r="2" fill={color} fillOpacity={opacity} />
           </g>
        </svg>
      );
    case 'knowledge': // Knowledge Graph
      return (
        <svg className="absolute right-0 bottom-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none transition-all duration-500" viewBox="0 0 100 100">
           <g fill={isHovered ? "#ea580c" : color} fillOpacity={isHovered ? 0.4 : opacity} stroke={color} strokeOpacity={opacity} strokeWidth={isHovered ? "1" : "0.5"} className="transition-all duration-500">
             {/* Central Node */}
             <circle cx="50" cy="50" r={isHovered ? 6 : 4} className="transition-all" />
             
             {/* Satellite Nodes */}
             <circle cx="20" cy="80" r="3" className={isHovered ? "animate-pulse" : ""} />
             <circle cx="80" cy="20" r="3" className={isHovered ? "animate-pulse delay-75" : ""} />
             <circle cx="80" cy="80" r="3" className={isHovered ? "animate-pulse delay-150" : ""} />
             <circle cx="20" cy="20" r="3" className={isHovered ? "animate-pulse delay-200" : ""} />
             
             {/* Links */}
             <line x1="50" y1="50" x2="20" y2="80" className={isHovered ? "stroke-tva-orange" : ""} />
             <line x1="50" y1="50" x2="80" y2="20" className={isHovered ? "stroke-tva-orange" : ""} />
             <line x1="50" y1="50" x2="80" y2="80" className={isHovered ? "stroke-tva-orange" : ""} />
             <line x1="50" y1="50" x2="20" y2="20" className={isHovered ? "stroke-tva-orange" : ""} />
             
             {/* Floating Nodes */}
             <circle cx="50" cy="20" r="2" className={isHovered ? "animate-bounce" : ""} />
             <line x1="50" y1="50" x2="50" y2="20" strokeDasharray="2 2" className={isHovered ? "opacity-100" : "opacity-30"} />
           </g>
        </svg>
      );
    default:
      return null;
  }
};

/* --- SPOTLIGHT CARD COMPONENT --- */
const SpotlightCard: React.FC<ServiceCardProps & { visualType: string }> = ({ title, description, icon, details, visualType, onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsHovered(true);
    playSound('hover');
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        playSound('chime');
        if (onClick) onClick();
      }}
      className="relative group h-full cursor-pointer"
    >
      {/* Card Chassis */}
      <div className="h-full bg-tva-panel/20 border border-tva-cream/10 rounded-sm overflow-hidden transition-all duration-300 group-hover:border-tva-orange/50 group-hover:bg-tva-panel/40 flex flex-col relative">
        
        {/* Module Header */}
        <div className="px-4 py-3 border-b border-tva-cream/5 bg-tva-dark/30 flex items-center justify-between z-20">
           <div className="flex items-center gap-2 text-tva-cream/40 font-mono text-[10px] uppercase tracking-widest">
              <span className={`w-1.5 h-1.5 rounded-full ${isHovered ? 'bg-tva-orange shadow-[0_0_5px_#ea580c]' : 'bg-tva-cream/20'}`}></span>
              MOD-{title.split(' ')[0].substring(0,3).toUpperCase()}
           </div>
           <Activity size={12} className={`text-tva-cream/20 ${isHovered ? 'text-tva-orange' : ''}`} />
        </div>

        {/* Visual Background */}
        <ServiceVisual type={visualType} isHovered={isHovered} />

        {/* Spotlight Effect Layer */}
        <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
            style={{
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(234, 88, 12, 0.05), transparent 40%)`,
            }}
        />

        {/* Content */}
        <div className="p-6 flex-grow relative z-10 flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded bg-tva-dark border border-tva-cream/10 transition-colors duration-300 ${isHovered ? 'text-tva-orange border-tva-orange/30' : 'text-tva-cream/50'}`}>
                    {icon}
                </div>
                {/* Tech Badges Mini */}
                <div className="flex gap-1">
                   {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-tva-cream/10 rounded-sm"></div>)}
                </div>
            </div>

            <h3 className="text-xl font-mono font-bold text-tva-cream mb-3 group-hover:text-tva-orange transition-colors uppercase tracking-tight">
            {title}
            </h3>
            
            <p className="text-tva-cream/60 text-sm leading-relaxed mb-6 font-sans flex-grow">
            {description}
            </p>

            <div className="pt-4 border-t border-tva-cream/5 mt-auto flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                    {details.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 bg-tva-cream/5 text-tva-cream/40 rounded border border-transparent hover:border-tva-orange/20 transition-colors">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="text-tva-orange opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                    <ArrowRight size={16} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

/* --- SERVICE MODAL COMPONENT --- */
const ServiceModal: React.FC<{ service: ServiceCardProps; onClose: () => void }> = ({ service, onClose }) => {
  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; }
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="absolute inset-0 bg-tva-dark/90 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-tva-panel border-t-2 sm:border-2 border-tva-orange shadow-[0_0_50px_rgba(234,88,12,0.2)] rounded-t-xl sm:rounded-sm overflow-hidden animate-in slide-in-from-bottom-24 sm:zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        <div className="bg-tva-dark p-6 border-b border-tva-orange/30 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="hidden sm:block p-3 bg-tva-panel border border-tva-orange/50 rounded-sm text-tva-orange">
              {service.icon}
            </div>
            <div>
              <div className="text-xs text-tva-orange/70 font-mono uppercase tracking-widest mb-1 flex items-center gap-2">
                 <span className="w-2 h-2 bg-tva-green rounded-full animate-pulse"></span>
                 Classified Protocol
              </div>
              <h2 className="text-xl sm:text-2xl font-mono font-bold text-tva-cream uppercase">{service.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-tva-cream/50 hover:text-tva-orange transition-colors"><X size={24} /></button>
        </div>
        <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 bg-tva-panel/95 overflow-y-auto">
          <div>
            <h3 className="text-sm font-mono font-bold text-tva-orange mb-2 uppercase tracking-widest">01 // Operational Objective</h3>
            <div className="text-tva-cream/80 leading-relaxed font-sans text-base sm:text-lg border-l-2 border-tva-cream/10 pl-4">
               {service.description} {service.details.outcome}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-mono font-bold text-tva-orange mb-3 uppercase tracking-widest">02 // Core Capabilities</h3>
              <ul className="space-y-2">
                {service.details.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-tva-cream/70 font-mono">
                    <span className="text-tva-amber mt-1">▹</span>{feature}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-mono font-bold text-tva-orange mb-3 uppercase tracking-widest">03 // Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {service.details.techStack.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-tva-dark border border-tva-cream/10 rounded-sm text-xs text-tva-cream/60 font-mono hover:border-tva-orange/30 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-tva-dark/50 border-t border-tva-orange/20 flex justify-end shrink-0">
          <button 
            onClick={() => {
                onClose();
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-tva-orange text-tva-dark font-mono font-bold uppercase hover:bg-tva-amber transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            <Power size={16} /> Activate Protocol
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const ServicesGrid: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
  const [selectedService, setSelectedService] = useState<ServiceCardProps | null>(null);

  const services: (ServiceCardProps & { visualType: string })[] = [
    {
      title: "Predictive Intelligence",
      description: "Transcend reactive reporting. We engineer Snowflake data lakes that feed ensemble forecasting models, providing a periscope into next quarter's revenue with mathematical certainty.",
      icon: <TrendingUp size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Snowflake Data Cloud Architecture", "Ensemble Forecasting (Prophet + XGBoost)", "Monte Carlo Risk Simulation", "Automated Board Reporting"],
        techStack: ["Snowflake", "dbt", "Tableau", "Python", "Polars"],
        outcome: "Eliminate the 'fog of war' for CFOs. Reduce capital allocation variance by >94%."
      }
    },
    {
      title: "Knowledge Graph Core",
      description: "Amnesia is the enemy of efficiency. We weave your scattered PDFs, Slacks, and emails into a semantic Knowledge Graph, creating an immortal corporate brain that answers instantly.",
      icon: <Network size={24} />,
      visualType: 'knowledge',
      details: {
        features: ["Semantic Knowledge Graphs", "Vector Search (RAG)", "Source-Citated Answers", "Role-Based Data Governance"],
        techStack: ["Neo4j", "LangChain", "Weaviate", "Unstructured.io", "LlamaIndex"],
        outcome: "New hires reach full productivity in days, not months. The enterprise never forgets a fact again."
      }
    },
    {
      title: "Pipeline Architecture",
      description: "Stale data is a liability. We build autonomous dbt pipelines orchestrated by Airflow that treat your data as a continuous, living stream—never a stagnant pond.",
      icon: <Workflow size={24} />,
      visualType: 'pipeline',
      details: {
        features: ["Modern Data Stack (MDS)", "dbt Transformation Logic", "Airflow Orchestration", "Real-time CDC Streaming"],
        techStack: ["Apache Airflow", "dbt", "Kafka", "Fivetran", "AWS Glue"],
        outcome: "Latency reduced to <100ms. Decision-makers see the business as it is now, not as it was yesterday."
      }
    },
    {
      title: "Neural Support Interface",
      description: "Beyond simple chatbots. We deploy deterministic, neuro-symbolic agents that understand intent, execute API actions, and protect your brand voice with ironclad guardrails.",
      icon: <BrainCircuit size={24} />,
      visualType: 'chat',
      details: {
        features: ["Hybrid NLU (Symbolic + Generative)", "Action-Oriented Agents", "Secure PII Redaction", "Omnichannel Deployment"],
        techStack: ["Rasa", "Dialogflow CX", "LangChain", "Redis", "OpenAI"],
        outcome: "70% of support volume absorbed instantly. Agents handle the mundane; humans handle the extraordinary."
      }
    },
    {
      title: "Entropy Monitor",
      description: "Silence the noise. Our multivariate anomaly detection engines listen to the heartbeat of your infrastructure, identifying 'Black Swan' events before they breach the surface.",
      icon: <Radar size={24} />,
      visualType: 'anomaly',
      details: {
        features: ["Unsupervised Anomaly Detection", "Multivariate Gaussian Mixtures", "Root Cause Traceability", "Auto-Healing Scripts"],
        techStack: ["TensorFlow", "Prometheus", "Grafana", "Isolation Forests", "PagerDuty"],
        outcome: "Prevent outages before they occur. MTTD (Time to Detect) approaches zero."
      }
    },
    {
      title: "Staff Augmentation",
      description: "Deploy specific tactical units. We embed battle-hardened AI Architects and MLOps Engineers directly into your squad to accelerate delivery velocity immediately.",
      icon: <UserCog size={24} />,
      visualType: 'chat', // Reusing visual
      details: {
        features: ["Fractional CTO Services", "MLOps Infrastructure Setup", "LLM Fine-Tuning", "Rapid Prototyping Squads"],
        techStack: ["PyTorch", "Kubernetes", "Docker", "Terraform", "MLFlow"],
        outcome: "Bypass the 6-month hiring lag. Instant injection of senior-level capability into your codebase."
      }
    }
  ];

  return (
    <>
      <section className="py-20 bg-tva-dark border-t border-tva-orange/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-tva-panel/30 via-transparent to-transparent opacity-40"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-tva-orange rounded-full"></span>
                    <span className="text-tva-orange font-mono text-xs uppercase tracking-widest">Authorized Protocols</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-mono font-bold text-tva-cream tracking-tight">TIMELINE STABILIZATION</h2>
                <p className="text-tva-cream/60 font-sans text-lg mt-4 max-w-xl">
                Deploying advanced data architectures: Snowflake, Knowledge Graphs, and Autonomous Pipelines.
                </p>
            </div>
            
            {/* Decorative decorative bit */}
            <div className="hidden md:block text-right font-mono text-xs text-tva-cream/30">
                <div>SYS.VER.2.4.9</div>
                <div>ALL SYSTEMS NORMAL</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <SpotlightCard 
                key={i} 
                {...s} 
                onClick={() => setSelectedService(s)} 
              />
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </>
  );
};