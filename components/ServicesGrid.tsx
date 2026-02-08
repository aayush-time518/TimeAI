
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, LayoutDashboard, TrendingUp, Workflow, BrainCircuit, Radar, Bot, Power, Check, ChevronRight, Server, BadgeDollarSign, Calculator, LineChart, DatabaseZap, Layers, MessageSquare } from 'lucide-react';
import { ServiceCardProps, ViewState } from '../types';
import { playSound } from '../utils/sound';

const ServiceVisual: React.FC<{ type: string; isHovered: boolean }> = ({ type, isHovered }) => {
  return (
    <svg 
        className={`absolute right-[-20px] bottom-[-20px] w-48 h-48 pointer-events-none transition-all duration-700 ease-out ${isHovered ? 'opacity-100 rotate-0 translate-x-0' : 'opacity-5 rotate-12 translate-x-4'}`} 
        viewBox="0 0 100 100"
    >
       <circle 
         cx="80" cy="80" r="40" 
         stroke="currentColor" strokeWidth="1.5" fill="none" 
         className="transition-all duration-700 ease-out text-slate-900"
         style={{ r: isHovered ? 45 : 35, opacity: isHovered ? 0.08 : 0.05 }}
       />
       <path 
         d="M30 90 L90 30" 
         stroke="currentColor" strokeWidth="1.5" 
         className="transition-all duration-700 ease-out text-gray-700"
         style={{ 
             strokeDasharray: isHovered ? '100' : '4 8',
             transform: isHovered ? 'translate(5px, -5px)' : 'translate(0,0)'
         }}
       />
       <rect 
         x="60" y="60" width="30" height="30" 
         stroke="currentColor" strokeWidth="1.5" fill="none"
         className="transition-all duration-1000 ease-out text-slate-400"
         style={{ 
             opacity: isHovered ? 0.2 : 0,
             transform: isHovered ? 'rotate(15deg)' : 'rotate(0deg)',
             transformOrigin: '75px 75px'
         }} 
       />
    </svg>
  );
};

const SpotlightCard: React.FC<ServiceCardProps & { visualType: string }> = ({ title, description, icon, visualType, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => { setIsHovered(true); playSound('hover'); }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => { playSound('chime'); if (onClick) onClick(); }}
      className={`
        relative group h-full cursor-pointer rounded-2xl border-2 transition-all duration-500 ease-out overflow-hidden flex flex-col active:scale-[0.98]
        ${isHovered 
            ? 'bg-white border-gray-400 shadow-2xl shadow-gray-900/10 translate-y-[-4px]' 
            : 'bg-white border-gray-300 shadow-md hover:border-gray-400'}
      `}
    >
      <div className={`absolute inset-0 bg-gray-50/30 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

      <ServiceVisual type={visualType} isHovered={isHovered} />

      <div className="p-6 md:p-8 relative z-10 flex flex-col h-full">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${isHovered ? 'bg-gray-900 text-white shadow-xl shadow-gray-900/30 rotate-3 scale-110' : 'bg-gray-50 text-gray-900 border-2 border-gray-300 shadow-sm'}`}>
            {icon}
        </div>

        <h3 className={`text-lg md:text-xl font-black mb-3 transition-colors duration-300 ${isHovered ? 'text-gray-900' : 'text-gray-800'}`}>
            {title}
        </h3>
        
        <p className="text-gray-900 text-sm leading-relaxed mb-8 flex-grow font-black">
            {description}
        </p>

        <div className={`flex items-center font-black text-xs uppercase tracking-widest gap-2 transition-all duration-300 ${isHovered ? 'text-gray-900 translate-x-1' : 'text-gray-600'}`}>
            Explore Technical Specs <ChevronRight size={14} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </div>
      </div>
    </div>
  );
};

const ServiceModal: React.FC<{ service: ServiceCardProps; onClose: () => void }> = ({ service, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; }
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-white h-[90vh] sm:h-auto sm:max-h-[90vh] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 sm:zoom-in-95 duration-500 ease-out-expo flex flex-col border border-gray-300">
        
        <div className="p-8 md:p-12 border-b-2 border-gray-300 bg-white flex justify-between items-center shrink-0 relative z-10 shadow-sm">
            <div className="flex gap-6 md:gap-8 items-center flex-1 min-w-0">
                <div className="p-6 bg-gray-100 rounded-2xl border-2 border-gray-300 text-gray-900 shrink-0 shadow-md">
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 36 })}
                </div>
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 leading-tight tracking-tight">{service.title}</h2>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-900 text-xs font-black uppercase tracking-wide border-2 border-gray-300 shadow-md">
                        <TrendingUp size={14} />
                        {service.details.outcome}
                    </div>
                </div>
            </div>
            <button 
                onClick={onClose} 
                className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 hover:scale-110 active:scale-95 flex items-center justify-center text-gray-900 transition-all ml-4 shrink-0 shadow-md hover:shadow-lg border-2 border-gray-300"
                aria-label="Close modal"
            >
                <X size={22} />
            </button>
        </div>

        <div className="p-8 md:p-14 overflow-y-auto flex-1 bg-white relative">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-8">
                    <div className="mb-8">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-4">
                            <span className="h-px flex-1 bg-gray-300"></span>
                            <span>Business Value</span>
                            <span className="h-px flex-1 bg-gray-300"></span>
                        </h3>
                    </div>
                    <ul className="space-y-6">
                        {service.details.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-4 text-base text-gray-900 group">
                                <div className="mt-0.5 w-6 h-6 rounded-lg bg-gray-900 text-white flex items-center justify-center shrink-0 border-2 border-gray-900 group-hover:bg-gray-800 group-hover:border-gray-800 transition-all shadow-sm group-hover:shadow-md">
                                    <Check size={14} strokeWidth={3} />
                                </div>
                                <span className="leading-relaxed font-black pt-1 group-hover:text-gray-700 transition-colors">{feat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-8">
                    <div className="mb-8">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-8 flex items-center gap-4">
                            <span className="h-px flex-1 bg-gray-300"></span>
                            <span>Core Tech Stack</span>
                            <span className="h-px flex-1 bg-gray-300"></span>
                        </h3>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-7 border-2 border-gray-300 shadow-md">
                        <div className="flex flex-wrap gap-3">
                            {service.details.techStack.map((tech, i) => (
                                <span key={i} className="px-4 py-2.5 bg-white border-2 border-gray-300 rounded-lg text-sm font-black text-gray-900 shadow-sm hover:border-gray-400 hover:shadow-md transition-all">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-xl p-7 border-2 border-gray-300 shadow-md">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-gray-200 rounded-xl text-gray-900 shrink-0 border-2 border-gray-300 shadow-sm">
                                <MessageSquare size={20} />
                            </div>
                            <p className="text-sm text-gray-900 leading-relaxed font-black pt-1">
                                "Connecting your private data to modern AI patterns for high-fidelity enterprise logic."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-6 md:p-8 border-t border-gray-300 bg-white flex justify-end shrink-0">
            <button 
                onClick={() => { onClose(); const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); }}
                className="w-full sm:w-auto px-12 py-4.5 bg-gray-900 text-white font-black rounded-xl hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/30 hover:scale-105 transition-all flex items-center justify-center gap-3 text-base active:scale-95 transform duration-200 shadow-lg border-2 border-gray-700/20"
            >
                <Power size={20} className="drop-shadow-sm" /> Deploy Architecture
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
      title: "RAG Chatbots",
      description: "Bridge the gap between your private archives and active intelligence with secure RAG interfaces that cite every source.",
      icon: <Bot size={24} />,
      visualType: 'chat',
      details: {
        features: ["Eliminate information search friction", "Enable sub-second document lookup", "Ground AI answers in verified files", "Maintain strict data sovereignty"],
        techStack: ["Gemini 3 Pro", "Pinecone Vector Store", "LangChain Framework", "Private Cloud Hosting"],
        outcome: "Recover 400+ man-hours monthly per department."
      }
    },
    {
      title: "Pricing Strategy",
      description: "Optimize revenue through high-precision elastic modeling and econometric simulations that identify the ideal price point for maximum ROI.",
      icon: <BadgeDollarSign size={24} />,
      visualType: 'pricing',
      details: {
        features: ["Dynamic price elasticity modeling", "Competitor real-time variance tracking", "Econometric ROI simulations", "Automated A/B price test orchestration"],
        techStack: ["Python (Statsmodels)", "Causal ML", "BigQuery ML", "Prophet Forecasting"],
        outcome: "Maximize gross margins by up to 18%."
      }
    },
    {
      title: "Demand Forecasting",
      description: "Master temporal complexity with predictive engines that identify demand signals and market variance before they impact margins.",
      icon: <TrendingUp size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Identify hidden market cycles", "Reduce inventory waste through precision", "Model complex scenario variance", "Predict demand spikes 14 days out"],
        techStack: ["Temporal Fusion Transformers", "TensorFlow", "BigQuery", "Snowflake"],
        outcome: "Achieve 98% inventory precision."
      }
    },
    {
      title: "Dashboards",
      description: "Transform static metrics into command centers with generative UI that builds real-time KPI visualizations based on user intent.",
      icon: <LayoutDashboard size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Instant generative KPI reporting", "Natural Language data exploration", "Automated anomaly surfacing", "Executive-level strategic summaries"],
        techStack: ["React & Generative UI", "BigQuery ML", "Looker API", "Tailwind CSS"],
        outcome: "Accelerate executive decision loops by 4x."
      }
    },
    {
      title: "Workflow Automation",
      description: "Replace manual operational loops with autonomous LangGraph agents that reason through complex API logic and multi-step tasks.",
      icon: <Workflow size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Automate multi-step back-office ops", "Orchestrate logic across SAP and Slack", "Deploy self-healing reasoning loops", "Trigger secure API actions autonomously"],
        techStack: ["LangGraph Agents", "n8n Orchestration", "REST API Bridge", "Webhooks"],
        outcome: "Automate 95% of high-volume repetitive tasks."
      }
    },
    {
      title: "ML Solutions",
      description: "Build proprietary domain mastery through model fine-tuning (LoRA/QLoRA) and DPO alignment tailored to your unique challenges.",
      icon: <BrainCircuit size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Proprietary domain model mastery", "Fine-tuning for specialized sectors", "Alignment via Direct Preference Opt (DPO)", "High-efficiency 4-bit quantization"],
        techStack: ["PyTorch", "LoRA/QLoRA Adapters", "Unsloth Kernels", "DPO Alignment"],
        outcome: "Deploy specialized models that outperform generic LLMs."
      }
    },
    {
      title: "Data Pipelines",
      description: "Automate the flow of enterprise intelligence with robust ELT/ETL pipelines designed for high-availability and zero-loss stream processing.",
      icon: <DatabaseZap size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Automated ELT/ETL orchestration", "Real-time stream processing", "Data lakehouse architecture", "Automated schema drift detection"],
        techStack: ["Apache Airflow", "dbt", "Snowflake", "Google Cloud Pub/Sub"],
        outcome: "Achieve 99.9% data pipeline reliability."
      }
    }
  ];

  return (
    <>
      <section className="py-24 md:py-36 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 relative border-b border-gray-200 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 via-transparent to-transparent opacity-60 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
            <h2 className="text-4xl md:text-6xl font-sans font-black text-gray-900 mb-8 tracking-tight">Enterprise Services</h2>
            <p className="text-lg md:text-xl text-gray-900 font-black leading-relaxed">
                We bridge the gap between human language and machine logic to deliver <span className="text-gray-900 font-black relative inline-block">
                    operational velocity
                    <svg className="absolute w-full h-2 bottom-0 left-0 text-gray-300" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
                </span>. 
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
