
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, LayoutDashboard, TrendingUp, Workflow, BrainCircuit, Radar, Bot, Power, Check, ChevronRight, Server, BadgeDollarSign, Calculator, LineChart, DatabaseZap, Layers } from 'lucide-react';
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
         className="transition-all duration-700 ease-out text-tva-orange"
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
        relative group h-full cursor-pointer rounded-2xl border transition-all duration-500 ease-out overflow-hidden flex flex-col active:scale-[0.98]
        ${isHovered 
            ? 'bg-white border-tva-orange/50 shadow-2xl shadow-tva-orange/10 translate-y-[-4px]' 
            : 'bg-white border-gray-100 shadow-sm hover:border-gray-200'}
      `}
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-50/20 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

      <ServiceVisual type={visualType} isHovered={isHovered} />

      <div className="p-6 md:p-8 relative z-10 flex flex-col h-full">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${isHovered ? 'bg-tva-orange text-white shadow-lg shadow-tva-orange/30 rotate-3' : 'bg-gray-50 text-gray-500 border border-gray-100'}`}>
            {icon}
        </div>

        <h3 className={`text-lg md:text-xl font-bold mb-3 transition-colors duration-300 ${isHovered ? 'text-gray-900' : 'text-gray-800'}`}>
            {title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow font-medium">
            {description}
        </p>

        <div className={`flex items-center font-bold text-xs uppercase tracking-widest gap-2 transition-all duration-300 ${isHovered ? 'text-tva-orange translate-x-1' : 'text-gray-400'}`}>
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
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-3xl bg-white h-[85vh] sm:h-auto sm:max-h-[85vh] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-16 sm:zoom-in-95 duration-500 ease-out-expo flex flex-col border border-white/20">
        
        <div className="p-6 md:p-8 border-b border-gray-100 bg-white/80 backdrop-blur-sm flex justify-between items-start shrink-0 relative z-10">
            <div className="flex gap-4 md:gap-6 items-center">
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 text-tva-orange shrink-0 shadow-sm">
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 28 })}
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 leading-tight tracking-tight">{service.title}</h2>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wide border border-green-100">
                        <TrendingUp size={10} />
                        {service.details.outcome}
                    </div>
                </div>
            </div>
            <button 
                onClick={onClose} 
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
            >
                <X size={18} />
            </button>
        </div>

        <div className="p-6 md:p-10 overflow-y-auto flex-1 bg-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full pointer-events-none opacity-50"></div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px flex-1 bg-gray-100"></div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Business Value</h3>
                        <div className="h-px flex-1 bg-gray-100"></div>
                    </div>
                    <ul className="space-y-4">
                        {service.details.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 group">
                                <div className="mt-0.5 w-5 h-5 rounded-full bg-orange-50 text-tva-orange flex items-center justify-center shrink-0 border border-orange-100 group-hover:bg-tva-orange group-hover:text-white transition-colors">
                                    <Check size={10} strokeWidth={3} />
                                </div>
                                <span className="leading-relaxed font-medium">{feat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-6">
                     <div className="flex items-center gap-2 mb-4">
                        <div className="h-px flex-1 bg-gray-100"></div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Core Tech Stack</h3>
                        <div className="h-px flex-1 bg-gray-100"></div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <div className="flex flex-wrap gap-2">
                            {service.details.techStack.map((tech, i) => (
                                <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-bold text-slate-600 shadow-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="bg-blue-50/50 rounded-xl p-5 border border-blue-100">
                        <p className="text-xs text-blue-800 leading-relaxed italic">
                            "Connecting your private data to modern AI patterns for high-fidelity enterprise logic."
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50/80 backdrop-blur flex justify-end shrink-0 pb-8 sm:pb-6">
            <button 
                onClick={() => { onClose(); const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); }}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-tva-orange hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 text-sm active:scale-95 transform duration-200"
            >
                <Power size={16} /> Deploy Architecture
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
      <section className="py-20 md:py-32 bg-white relative border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 via-transparent to-transparent opacity-60 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 mb-6 tracking-tight">Enterprise Services</h2>
            <p className="text-lg md:text-xl text-gray-500 font-normal leading-relaxed">
                We bridge the gap between human language and machine logic to deliver <span className="text-tva-orange font-bold relative inline-block">
                    operational velocity
                    <svg className="absolute w-full h-2 bottom-0 left-0 text-tva-orange/20" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
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
