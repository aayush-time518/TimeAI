import React, { useState } from 'react';
import { Database, BrainCircuit, Network, Share2, Layers, Cpu, FileText, Lock, GitBranch, Zap, Search, Code2, ArrowDown, ArrowUp } from 'lucide-react';

export const TechArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rag' | 'graph' | 'fine-tune'>('graph');

  const methods = {
    rag: {
      title: "Vector RAG",
      desc: "Retrieval-Augmented Generation for massive document ingestion.",
      icon: <Database className="w-6 h-6" />,
      details: "Best for: Policy manuals, large PDF archives, and static knowledge bases. We chunk data into 512-token vectors for semantic similarity search.",
      stats: ["99% Retrieval Accuracy", "<200ms Latency"]
    },
    graph: {
      title: "Knowledge Graphs",
      desc: "Structured relationships for complex reasoning.",
      icon: <Network className="w-6 h-6" />,
      details: "Best for: Supply chain dependencies and fraud detection. Unlike vectors, graphs understand that 'Client A' is connected to 'Risk B' via 'Transaction C'.",
      stats: ["Multi-hop Reasoning", "Deterministic Logic"]
    },
    'fine-tune': {
      title: "Model Fine-Tuning",
      desc: "Custom weights for domain-specific language.",
      icon: <BrainCircuit className="w-6 h-6" />,
      details: "Best for: Medical coding, legal drafting, and brand voice adherence. We train Llama 3 or Gemini on your specific dataset to alter the model's behavior.",
      stats: ["Zero Hallucination", "Brand Safety"]
    }
  };

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-200 relative overflow-hidden">
      {/* Dynamic Background Pattern (Light) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full mb-6 shadow-sm">
                <Code2 size={12} className="text-tva-orange" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Under the Hood</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 mb-6 tracking-tight">
                Our <span className="text-tva-orange">Neural Engine</span>
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed">
                We don't use generic wrappers. We architect bespoke cognitive engines using a hybrid of Knowledge Graphs, Vector Stores, and Fine-Tuned Models.
            </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Interactive Selector (Light Mode) */}
            <div className="lg:col-span-4 space-y-3">
                {(Object.entries(methods) as [keyof typeof methods, typeof methods['rag']][]).map(([key, data]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key as any)}
                        className={`w-full text-left p-6 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
                            activeTab === key 
                            ? 'bg-white border-tva-orange shadow-lg ring-1 ring-tva-orange/10 scale-[1.02]' 
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        {activeTab === key && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tva-orange"></div>}
                        
                        <div className="flex items-center justify-between mb-3">
                            <span className={`p-2 rounded-lg transition-colors ${activeTab === key ? 'bg-tva-orange text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-tva-orange'}`}>
                                {data.icon}
                            </span>
                            {activeTab === key && <Zap size={16} className="text-tva-orange animate-pulse" />}
                        </div>
                        <h3 className={`font-bold text-lg mb-1 ${activeTab === key ? 'text-gray-900' : 'text-gray-600'}`}>{data.title}</h3>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{data.desc}</p>
                    </button>
                ))}
            </div>

            {/* Visualization Stage (Dark 'Monitor' Look) */}
            <div className="lg:col-span-8">
                <div className="relative min-h-[500px] bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col transform transition-transform duration-500">
                    
                    {/* HUD Header */}
                    <div className="bg-slate-950/50 p-4 border-b border-white/5 flex justify-between items-center backdrop-blur-sm">
                         <div className="flex gap-2">
                             <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                             <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                         </div>
                         <div className="font-mono text-xs text-slate-500 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            SYS_MONITOR // {activeTab.toUpperCase()}
                         </div>
                    </div>

                    {/* Diagram Canvas */}
                    <div className="flex-1 relative p-8 flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-90">
                        
                        {/* Central Schematic */}
                        <div className="relative z-10 w-full max-w-lg">
                            
                            {/* INPUT LAYER */}
                            <div className="flex justify-center mb-6">
                                <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-xs font-mono text-slate-300 flex items-center gap-2 shadow-lg">
                                    <FileText size={12} className="text-slate-400" /> UNSTRUCTURED DATA
                                </div>
                            </div>
                            
                            {/* Flow Line Down */}
                            <div className="flex justify-center mb-2">
                                <ArrowDown size={16} className="text-slate-600 animate-bounce" />
                            </div>

                            {/* PROCESSING CORE */}
                            <div className="bg-slate-800/80 backdrop-blur-md border border-tva-orange/40 p-8 rounded-2xl relative overflow-hidden transition-all duration-500 group shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tva-orange to-indigo-500"></div>
                                 
                                 <div className="relative z-10">
                                     <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-3">
                                         {methods[activeTab].icon} {methods[activeTab].title}
                                     </h4>
                                     <p className="text-slate-400 text-sm mb-6 leading-relaxed border-l-2 border-slate-600 pl-4">
                                         {methods[activeTab].details}
                                     </p>

                                     <div className="grid grid-cols-2 gap-4">
                                         {methods[activeTab].stats.map((stat, i) => (
                                             <div key={i} className="bg-slate-900/50 p-3 rounded border border-slate-700 flex flex-col justify-center">
                                                 <div className="text-tva-orange text-[10px] font-bold uppercase tracking-wider mb-1">Metric</div>
                                                 <div className="text-white font-mono text-sm">{stat}</div>
                                             </div>
                                         ))}
                                     </div>
                                 </div>

                                 {/* Background Icon Watermark */}
                                 <div className="absolute -right-6 -bottom-6 text-white/5 rotate-[-15deg] pointer-events-none">
                                     {activeTab === 'graph' ? <Share2 size={180} /> : activeTab === 'rag' ? <Layers size={180} /> : <Cpu size={180} />}
                                 </div>
                            </div>

                            {/* Flow Line Down */}
                            <div className="flex justify-center mt-2">
                                <ArrowDown size={16} className="text-slate-600 animate-bounce" />
                            </div>

                            {/* OUTPUT LAYER */}
                            <div className="flex justify-center mt-6">
                                <div className="bg-indigo-500/10 border border-indigo-500/30 px-6 py-2 rounded-full text-xs font-mono text-indigo-300 flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                    <Zap size={12} /> ACTIONABLE INTELLIGENCE
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

      </div>
    </section>
  );
};