import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, LayoutDashboard, TrendingUp, Workflow, BrainCircuit, Radar, Bot, Power, Check, ChevronRight } from 'lucide-react';
import { ServiceCardProps, ViewState } from '../types';
import { playSound } from '../utils/sound';

/* --- CUSTOM VISUALS COMPONENT (Clean Lines) --- */
const ServiceVisual: React.FC<{ type: string; isHovered: boolean }> = ({ type, isHovered }) => {
  return (
    <svg 
        className={`absolute right-[-20px] bottom-[-20px] w-48 h-48 pointer-events-none transition-all duration-700 ease-out ${isHovered ? 'opacity-10 rotate-0' : 'opacity-5 rotate-12'}`} 
        viewBox="0 0 100 100"
    >
       {/* Abstract geometric shapes that react to hover */}
       <circle 
         cx="80" cy="80" r="40" 
         stroke="currentColor" strokeWidth="1.5" fill="none" 
         className="transition-all duration-700 ease-out text-slate-900"
         style={{ r: isHovered ? 45 : 35, opacity: isHovered ? 0.2 : 0.1 }}
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
             opacity: isHovered ? 0.3 : 0,
             transform: isHovered ? 'rotate(15deg)' : 'rotate(0deg)',
             transformOrigin: '75px 75px'
         }} 
       />
    </svg>
  );
};

/* --- CLEAN CARD --- */
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
      <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-50/30 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>

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
            View Specs <ChevronRight size={14} className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
        </div>
      </div>
    </div>
  );
};

/* --- SERVICE MODAL --- */
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
        
        {/* Header */}
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

        {/* Content */}
        <div className="p-6 md:p-10 overflow-y-auto flex-1 bg-white relative">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-gray-50 to-transparent rounded-bl-full pointer-events-none opacity-50"></div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
                <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="h-px flex-1 bg-gray-100"></div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Capabilities</h3>
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
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stack</h3>
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
                            "This architecture is designed for millisecond latency and maximum data privacy, ensuring compliance with SOC2 standards."
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50/80 backdrop-blur flex justify-end shrink-0 pb-8 sm:pb-6">
            <button 
                onClick={() => { onClose(); const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); }}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-tva-orange hover:shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 text-sm active:scale-95 transform duration-200"
            >
                <Power size={16} /> Initialize Project
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
      title: "Knowledge Agents (RAG)",
      description: "Turn your static PDFs and SharePoint drives into an active conversation. Our agents provide instant, cited answers.",
      icon: <Bot size={24} />,
      visualType: 'chat',
      details: {
        features: ["Semantic Search", "Multi-Turn Context", "Citation-Backed Answers", "Role-Based Access Control"],
        techStack: ["OpenAI", "Pinecone", "LangChain", "Azure"],
        outcome: "70% reduction in support ticket volume."
      }
    },
    {
      title: "Predictive Forecasting",
      description: "Stop using Excel averages. Use neural networks to predict inventory shortages and revenue dips.",
      icon: <TrendingUp size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Seasonality Analysis", "Trend Decomposition", "External Regressors", "Confidence Intervals"],
        techStack: ["Prophet", "Python", "Snowflake", "Tableau"],
        outcome: "94% forecast accuracy with 25% lower holding costs."
      }
    },
    {
      title: "Intelligent Dashboards",
      description: "Dashboards that build themselves. Ask questions in plain English and get real-time charts.",
      icon: <LayoutDashboard size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Text-to-SQL", "Dynamic Visual Generation", "Anomaly Alerts", "Executive Summaries"],
        techStack: ["React", "BigQuery", "Looker", "dbt"],
        outcome: "Zero latency between question and answer."
      }
    },
    {
      title: "Sentiment Intelligence",
      description: "Analyze thousands of customer reviews and tickets instantly to find friction points.",
      icon: <Radar size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Aspect-Based Sentiment", "Crisis Detection", "Competitor Analysis", "Automated Triage"],
        techStack: ["HuggingFace", "Python", "Twitter API"],
        outcome: "Preemptively identify churn risks."
      }
    },
    {
      title: "Custom ML Solutions",
      description: "Bespoke models for niche problems: Fraud detection, computer vision for QC, or route optimization.",
      icon: <BrainCircuit size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Proprietary Training", "Edge Deployment", "Continuous Learning", "Explainable AI"],
        techStack: ["TensorFlow", "PyTorch", "AWS SageMaker"],
        outcome: "Solve high-value problems generic AI can't touch."
      }
    },
    {
      title: "Data Infrastructure",
      description: "The plumbing behind the intelligence. We build robust, automated pipelines to keep your data clean.",
      icon: <Workflow size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Automated ETL", "Model Monitoring", "Feature Stores", "Serverless Inference"],
        techStack: ["Airflow", "Kafka", "Kubernetes", "Terraform"],
        outcome: "99.9% uptime and scalable architecture."
      }
    }
  ];

  return (
    <>
      <section className="py-20 md:py-32 bg-white relative border-b border-gray-100 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[500px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 via-transparent to-transparent opacity-60 pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 mb-6 tracking-tight">Enterprise Solutions</h2>
            <p className="text-lg md:text-xl text-gray-500 font-normal leading-relaxed">
                We don't just provide software; we provide <span className="text-tva-orange font-bold relative inline-block">
                    clarity
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
