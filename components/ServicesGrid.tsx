import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bot, X, ArrowRight, LayoutDashboard, TrendingUp, Workflow, BrainCircuit, Radar, Power, FileCode, Check, Shield } from 'lucide-react';
import { ServiceCardProps, ViewState } from '../types';
import { playSound } from '../utils/sound';

/* --- CUSTOM VISUALS COMPONENT (Clean Lines) --- */
const ServiceVisual: React.FC<{ type: string; isHovered: boolean }> = ({ type, isHovered }) => {
  const primaryColor = "#dc2626"; // Swiss Red
  const secondaryColor = "#e2e8f0"; 

  // Simplified Abstract Visuals
  return (
    <svg className="absolute right-[-20px] bottom-[-20px] w-40 h-40 opacity-5 pointer-events-none transition-transform duration-500" style={{ transform: isHovered ? 'scale(1.1)' : 'scale(1)' }} viewBox="0 0 100 100">
       <circle cx="80" cy="80" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
       <path d="M40 80 L80 40" stroke="currentColor" strokeWidth="2" />
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
        relative group h-full cursor-pointer rounded-xl border transition-all duration-300 ease-out overflow-hidden flex flex-col
        ${isHovered ? 'bg-white border-tva-orange shadow-lg translate-y-[-2px]' : 'bg-white border-gray-200 shadow-sm'}
      `}
    >
      <ServiceVisual type={visualType} isHovered={isHovered} />

      <div className="p-8 relative z-10 flex flex-col h-full">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 ${isHovered ? 'bg-tva-orange text-white' : 'bg-gray-100 text-gray-500'}`}>
            {icon}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3">
            {title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
            {description}
        </p>

        <div className={`flex items-center font-bold text-xs uppercase tracking-widest gap-2 transition-all ${isHovered ? 'text-tva-orange gap-3' : 'text-gray-400'}`}>
            Details <ArrowRight size={14} />
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 ease-out-expo flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 bg-white flex justify-between items-start">
            <div className="flex gap-4 md:gap-6">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-tva-orange shrink-0">
                    {React.cloneElement(service.icon as React.ReactElement<any>, { size: 32 })}
                </div>
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{service.title}</h2>
                    <p className="text-xs md:text-sm text-gray-500 font-medium">{service.details.outcome}</p>
                </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-900 transition-colors p-2">
                <X size={24} />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-6">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Core Capabilities</h3>
                    <ul className="space-y-4">
                        {service.details.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                <Check size={16} className="text-tva-orange mt-0.5 shrink-0" />
                                <span className="leading-relaxed">{feat}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Technical Architecture</h3>
                    <div className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                        <div className="flex flex-wrap gap-2">
                            {service.details.techStack.map((tech, i) => (
                                <span key={i} className="px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button 
                onClick={() => { onClose(); const el = document.getElementById('contact'); if(el) el.scrollIntoView({behavior:'smooth'}); }}
                className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-tva-orange transition-colors flex items-center gap-2 text-sm"
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
      <section className="py-24 md:py-32 bg-white relative border-b border-gray-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 mb-6 tracking-tight">Enterprise Solutions</h2>
            <p className="text-xl text-gray-500 font-normal leading-relaxed">
                We don't just provide software; we provide <span className="text-tva-orange font-bold">clarity</span>. 
            </p>
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
