
import { Database, BrainCircuit, Network, Zap, Search, Code2, Target, Play, Pause, CheckCircle2, Workflow, FileText, Cpu, Server, GitBranch, Settings, MessageSquare, Share2, Layers, Activity, ShieldCheck, FastForward, Binary, UserCheck, HardDrive, Infinity, Repeat, Box, Scaling, RefreshCcw, Gauge, Loader2, Sparkles, Filter, DatabaseZap, Terminal, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

/* --- RESPONSIVE SIMULATIONS --- */

const RagSimulation: React.FC = () => {
    const [step, setStep] = useState(0); 

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((s) => (s + 1) % 5);
        }, 2200);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 p-2 md:p-4 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]"></div>
            
            <div className="relative w-full h-full max-w-2xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-4">
                
                {/* 1. DOCUMENT INGESTION */}
                <div className={`relative transition-all duration-700 flex flex-col items-center shrink-0 ${step <= 1 ? 'scale-90 md:scale-100 opacity-100' : 'scale-75 md:scale-90 opacity-40'}`}>
                    <div className="w-14 h-20 md:w-20 md:h-28 bg-white rounded shadow-2xl relative overflow-hidden flex flex-col p-2 gap-1 border border-slate-200">
                        {step === 0 && (
                            <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center">
                                <Loader2 className="w-3 h-3 md:w-4 md:h-4 text-tva-orange animate-spin" />
                            </div>
                        )}
                        <div className="h-1.5 w-2/3 bg-slate-200 rounded"></div>
                        <div className="h-1 w-full bg-slate-100 rounded"></div>
                        <div className={`absolute inset-0 flex flex-col gap-1 p-1 transition-opacity duration-500 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
                            {Array.from({length: 6}).map((_, i) => (
                                <div key={i} className="flex-1 bg-blue-500/20 border border-blue-500/30 rounded-sm"></div>
                            ))}
                        </div>
                        <div className={`absolute top-0 left-0 w-full h-1 bg-tva-orange shadow-[0_0_10px_#dc2626] z-20 ${step === 0 ? 'animate-[scanVertical_1.5s_linear_infinite]' : 'hidden'}`}></div>
                    </div>
                </div>

                {/* 2. VECTOR PIPELINE */}
                <div className="flex-0 flex flex-col items-center justify-center relative w-full md:max-w-[120px]">
                     <div className={`w-1/2 md:w-full h-10 md:h-14 border border-slate-800 rounded-xl bg-slate-900/50 flex flex-col items-center justify-center gap-1 transition-all duration-700 ${step === 2 ? 'border-blue-500 shadow-glow-blue' : 'opacity-30'}`}>
                        <Binary className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                        <div className="w-8 md:w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full bg-blue-500 transition-all duration-1000 ${step === 2 ? 'w-full' : 'w-0'}`}></div>
                        </div>
                     </div>
                </div>

                {/* 3. VECTOR STORAGE */}
                <div className={`relative flex flex-col items-center transition-all duration-700 shrink-0 ${step >= 3 ? 'scale-90 md:scale-100 opacity-100' : 'scale-75 md:scale-90 opacity-20'}`}>
                    <div className={`w-20 h-20 md:w-28 md:h-28 border-2 rounded-[1.25rem] md:rounded-[1.5rem] flex items-center justify-center bg-slate-900/90 backdrop-blur-md transition-all duration-700 ${step >= 3 ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'border-slate-800'}`}>
                         <DatabaseZap className={`w-6 h-6 md:w-8 md:h-8 transition-colors duration-500 ${step >= 3 ? 'text-blue-400' : 'text-slate-700'}`} />
                         {step === 4 && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Search className="text-tva-orange w-4 h-4 md:w-5 md:h-5 animate-bounce" />
                            </div>
                         )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MLSimulation: React.FC = () => {
    const [cycle, setCycle] = useState(0); 

    useEffect(() => {
        const timer = setInterval(() => {
            setCycle((c) => (c + 1) % 5);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 bg-slate-950 flex items-center justify-center p-2 md:p-4 overflow-hidden">
            <div className="relative w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
                
                {/* 1. MODEL UNIT WITH LORA/QLORA ADAPTERS */}
                <div className="relative shrink-0 scale-[0.75] md:scale-100">
                    <div className={`w-32 h-40 md:w-44 md:h-60 border-2 rounded-[2rem] bg-slate-900/60 backdrop-blur-xl flex flex-col items-center justify-center p-4 transition-all duration-1000 relative ${cycle === 0 ? 'border-blue-500 shadow-glow-blue' : 'border-slate-800'}`}>
                        {/* Core Processor */}
                        <div className="relative mb-3">
                             <Cpu size={28} className={`transition-colors duration-500 ${cycle >= 1 ? 'text-slate-600' : 'text-blue-400'}`} />
                             {cycle >= 3 && <Sparkles className="absolute -top-2 -right-2 w-3 h-3 text-blue-400 animate-pulse" />}
                        </div>
                        <div className="text-[8px] font-mono text-slate-400 font-black text-center uppercase tracking-tighter mb-4">Llama-3-70B<br/>BASE_WEIGHTS</div>

                        {/* LoRA Adapters Visual */}
                        <div className={`absolute -right-4 top-1/4 transition-all duration-700 ${cycle >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                            <div className={`px-2 py-1.5 border-2 border-dashed rounded-xl bg-purple-950/90 flex flex-col items-center gap-0.5 shadow-2xl ${cycle === 2 ? 'border-purple-400 animate-pulse shadow-[0_0_20px_rgba(168,85,247,0.4)]' : 'border-slate-700'}`}>
                                <Layers size={14} className="text-purple-400" />
                                <span className="text-[7px] font-black text-purple-200 uppercase tracking-widest">LoRA_ADAPTER</span>
                                <div className="flex gap-0.5 mt-1">
                                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
                                    <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-75"></div>
                                </div>
                            </div>
                        </div>

                        {/* QLoRA Detail */}
                        <div className={`absolute -left-6 top-1/2 -translate-y-1/2 transition-all duration-700 delay-150 ${cycle >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                            <div className="px-2 py-1 bg-slate-950 border border-blue-500/30 rounded-lg text-[7px] font-black text-blue-400 uppercase tracking-tighter flex flex-col items-center">
                                <span>QLoRA</span>
                                <span className="text-[6px] text-slate-500">4-BIT_NF4</span>
                            </div>
                        </div>

                        {/* Unsloth Accelerator Engine */}
                        <div className={`absolute -bottom-4 transition-all duration-1000 ${cycle >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white rounded-full text-[8px] font-black shadow-lg shadow-blue-500/20 border border-blue-400/50">
                                <Zap size={10} className="fill-current" /> UNSLOTH_KERNEL
                                <div className="flex gap-1">
                                    <div className="w-1 h-1 bg-white rounded-full animate-ping"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. ALIGNMENT MONITOR (SFT / DPO) */}
                <div className={`w-full max-w-[200px] md:max-w-[300px] h-28 md:h-52 border-2 rounded-[1.5rem] bg-slate-950/95 p-4 flex flex-col justify-between transition-all duration-1000 overflow-hidden shrink-0 ${cycle === 4 ? 'border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.1)]' : 'border-slate-800'}`}>
                    <div className="flex justify-between items-start">
                        <div className="space-y-0.5">
                            <div className="text-[7px] font-mono text-slate-500 font-black uppercase tracking-widest">Training_Stage</div>
                            <div className="text-[9px] font-mono text-white tracking-tighter font-bold flex items-center gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${cycle > 0 ? 'bg-tva-orange animate-pulse' : 'bg-slate-800'}`}></div>
                                {cycle === 1 ? "SFT_INGEST" : cycle === 2 ? "ADAPTER_TUNE" : cycle === 3 ? "UNSLOTH_ACCEL" : cycle === 4 ? "DPO_ALIGNED" : "IDLE"}
                            </div>
                        </div>
                        <Terminal size={14} className={cycle >= 3 ? 'text-tva-orange animate-pulse' : 'text-slate-800'} />
                    </div>

                    {/* Accel Graph */}
                    <div className="flex-1 flex items-end gap-1 mt-2 border-b border-white/5 pb-1 h-12 md:h-20">
                        {Array.from({length: 16}).map((_, i) => (
                            <div 
                                key={i} 
                                className={`flex-1 rounded-t-sm transition-all duration-700 ${cycle === 1 ? 'bg-orange-500/30' : cycle === 2 ? 'bg-purple-500/40' : cycle >= 3 ? 'bg-blue-500/40' : 'bg-slate-900'}`} 
                                style={{ height: cycle === 0 ? '10%' : `${15 + Math.random() * (cycle * 20)}%` }}
                            ></div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="bg-slate-900 rounded-lg p-1.5 border border-white/5">
                            <div className="text-[6px] text-slate-500 uppercase font-black tracking-tighter">Loss_Rate</div>
                            <div className={`text-[9px] font-mono font-bold ${cycle >= 3 ? 'text-green-400' : 'text-slate-300'}`}>{cycle === 0 ? '0.00' : (0.5 / (cycle + 0.4)).toFixed(3)}</div>
                        </div>
                        <div className="bg-slate-900 rounded-lg p-1.5 border border-white/5">
                            <div className="text-[6px] text-slate-500 uppercase font-black tracking-tighter">Throughput</div>
                            <div className="text-[9px] font-mono font-bold text-blue-400">{cycle >= 3 ? '185 t/s' : '42 t/s'}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const WorkflowAgentSimulation: React.FC = () => {
    const [activeNode, setActiveNode] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNode((s) => (s + 1) % 5);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const nodes = [
        { label: "Trigger", icon: <MessageSquare size={14} /> },
        { label: "Logic", icon: <BrainCircuit size={14} /> },
        { label: "Bridge", icon: <GitBranch size={14} /> },
        { label: "Audit", icon: <ShieldCheck size={14} /> },
        { label: "Sync", icon: <CheckCircle2 size={14} /> },
    ];

    return (
        <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="relative w-full max-w-lg flex items-center justify-between gap-2">
                <div className="absolute inset-0 flex items-center px-4">
                    <div className="w-full h-px bg-slate-800 border-t border-dashed border-slate-700"></div>
                </div>

                {nodes.map((node, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center">
                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl border flex items-center justify-center transition-all duration-700 bg-slate-900 ${
                            activeNode === i ? 'border-blue-500 shadow-glow-blue scale-110' : 
                            activeNode > i ? 'border-green-500/40 opacity-50' : 'border-slate-800'
                        }`}>
                            {React.cloneElement(node.icon as any, { 
                                className: activeNode === i ? 'text-blue-400' : activeNode > i ? 'text-green-500' : 'text-slate-600' 
                            })}
                        </div>
                        <div className={`mt-1.5 text-[6px] md:text-[7px] font-black uppercase tracking-widest ${activeNode === i ? 'text-white' : 'text-slate-600'}`}>
                            {node.label}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 bg-slate-900/80 border border-white/5 p-3 rounded-lg w-full max-w-sm font-mono text-[7px] md:text-[8px] h-14 md:h-16 overflow-hidden relative">
                <div className="space-y-1 transition-all duration-500" style={{ transform: `translateY(-${activeNode * 12}px)` }}>
                    <div className="text-blue-400">LOG: Event ingress detected...</div>
                    <div className="text-purple-400">LOG: Mapping graph dependencies...</div>
                    <div className="text-amber-400">LOG: Executing secure API handshake...</div>
                    <div className="text-slate-400">LOG: Scanning output buffer... SOC2 compliant.</div>
                    <div className="text-green-400">LOG: System synchronized. ACK.</div>
                </div>
            </div>
        </div>
    );
};

const GraphSimulation: React.FC = () => {
    const [pathIndex, setPathIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setPathIndex((p) => (p + 1) % 6);
        }, 1500);
        return () => clearInterval(timer);
    }, []);

    const nodes = [
        { x: 20, y: 50 }, { x: 40, y: 30 }, { x: 40, y: 70 },
        { x: 60, y: 50 }, { x: 80, y: 30 }, { x: 80, y: 70 },
    ];
    const connections = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]];

    return (
        <div className="absolute inset-0 bg-slate-900 flex items-center justify-center p-4">
            <svg className="w-full h-full max-w-xs md:max-w-sm overflow-visible opacity-50">
                {connections.map(([a, b], i) => (
                    <path
                        key={i}
                        d={`M ${nodes[a].x}% ${nodes[a].y}% Q ${(nodes[a].x + nodes[b].x) / 2}% ${(nodes[a].y + nodes[b].y) / 2}% ${nodes[b].x}% ${nodes[b].y}%`}
                        stroke={pathIndex === i ? '#3b82f6' : '#1e293b'}
                        strokeWidth={pathIndex === i ? '2' : '1'}
                        fill="none"
                        className="transition-all duration-500"
                    />
                ))}
                {nodes.map((node, i) => (
                    <circle 
                        key={i} 
                        cx={`${node.x}%`} cy={`${node.y}%`} r="4" 
                        fill={connections[pathIndex]?.includes(i) ? '#3b82f6' : '#020617'} 
                        stroke={connections[pathIndex]?.includes(i) ? '#fff' : '#334155'} 
                        strokeWidth="1"
                        className="transition-all duration-500"
                    />
                ))}
            </svg>
        </div>
    );
};

/* --- MAIN SECTION COMPONENT --- */

export const TechArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rag' | 'graph' | 'ml' | 'workflow'>('rag');
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const methods = {
    rag: {
      title: "RAG Chatbots",
      desc: "Secure, local LLM-powered chat interfaces for your proprietary business data",
      icon: <Database className="w-5 h-5" />,
      details: "Deploy enterprise-grade Retrieval-Augmented Generation to connect your private knowledge bases (PDF, SQL, Docs) to secure LLMs. Our pipeline ensures every response is grounded in verified facts with precise source citations to eliminate hallucinations and search friction.",
      goal: "ACCURACY",
      component: <RagSimulation />
    },
    graph: {
      title: "Knowledge Graphs",
      desc: "Model deep data relationships and causal links for complex business discovery.",
      icon: <Network className="w-5 h-5" />,
      details: "Beyond simple similarity search, GraphRAG structures your enterprise data into a semantic web of entities. This allows the AI to perform multi-hop reasoning and identify causal relationships that standard vector databases overlook during deep exploration.",
      goal: "REASONING",
      component: <GraphSimulation />
    },
    ml: {
      title: "PEFT & ML Ops",
      desc: "Specialized model engineering via LoRA/QLoRA and alignment via DPO.",
      icon: <BrainCircuit className="w-5 h-5" />,
      details: "Master your specific domain with custom-tuned weights. We utilize Parameter-Efficient Fine-Tuning to bake enterprise knowledge into the model, followed by Direct Preference Optimization (DPO) using high-efficiency Unsloth kernels for domain-specific mastery.",
      goal: "ADAPTATION",
      component: <MLSimulation />
    },
    workflow: {
      title: "Agentic Flows",
      desc: "Autonomous reasoning agents capable of complex tool use and API orchestration.",
      icon: <Workflow className="w-5 h-5" />,
      details: "Move from chatbots to actionbots. Our agents leverage advanced reasoning loops (LangGraph) to evaluate tasks, select appropriate tools, and execute workflows across your entire stack—integrating with SAP, Salesforce, and internal APIs autonomously.",
      goal: "AUTOMATION",
      component: <WorkflowAgentSimulation />
    }
  };

  const tabs = Object.keys(methods) as (keyof typeof methods)[];

  useEffect(() => {
    if (isPaused) return;
    const duration = 7500; 
    const intervalTime = 20; 
    const step = 100 / (duration / intervalTime);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((current) => {
            const currentIndex = tabs.indexOf(current);
            const nextIndex = (currentIndex + 1) % tabs.length;
            return tabs[nextIndex];
          });
          return 0; 
        }
        return prev + step;
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPaused, tabs]);

  return (
    <section 
        className="py-12 md:py-24 bg-white border-y border-gray-100 relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-sans font-bold text-gray-900 mb-4 tracking-tight">
                AI <span className="text-tva-orange">Architectures</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                Mission-critical deployment patterns tailored for enterprise security and scale.
            </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-8">
                <div className="bg-slate-950 rounded-2xl shadow-xl overflow-hidden border border-slate-900 flex flex-col relative h-[400px] md:h-[500px]">
                    <div className="bg-slate-900/95 p-3 border-b border-white/5 flex justify-between items-center backdrop-blur-md z-20">
                         <div className="flex gap-1">
                             <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                             <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                             <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                         </div>
                         <div className="font-mono text-[8px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-2">
                            <Activity size={10} className="text-blue-500 animate-pulse" />
                            Simulation // {activeTab}
                         </div>
                    </div>

                    <div className="flex-1 relative overflow-hidden bg-black/20">
                        {methods[activeTab].component}
                        
                        <div className="absolute bottom-4 left-4 right-4 z-20">
                             <div className="bg-slate-900/90 backdrop-blur-lg border border-white/10 p-4 md:p-5 rounded-xl shadow-2xl">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-white font-bold text-sm flex items-center gap-2">
                                        <span className="p-1 bg-blue-500/10 rounded-md text-blue-400">{methods[activeTab].icon}</span>
                                        {methods[activeTab].title}
                                    </h4>
                                    <span className="px-1.5 py-0.5 bg-tva-orange/20 rounded text-[7px] font-black text-tva-orange uppercase tracking-widest shrink-0">
                                        {methods[activeTab].goal}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-[10px] md:text-xs leading-relaxed whitespace-normal">
                                    {methods[activeTab].details}
                                </p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="grid grid-cols-1 gap-3">
                    {tabs.map((key) => {
                        const data = methods[key];
                        const isActive = activeTab === key;
                        return (
                            <button
                                key={key}
                                onClick={() => { setActiveTab(key); setProgress(0); }}
                                className={`w-full text-left p-4 rounded-xl border transition-all duration-500 group relative active:scale-95 ${
                                    isActive 
                                    ? 'bg-white border-tva-orange shadow-md scale-[1.02]' 
                                    : 'bg-white border-gray-100 hover:border-gray-200'
                                }`}
                            >
                                {isActive && (
                                    <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gray-50 rounded-full overflow-hidden">
                                        <div className="h-full bg-tva-orange transition-all duration-75 ease-linear" style={{ width: `${progress}%` }}></div>
                                    </div>
                                )}
                                <div className="flex items-start gap-4">
                                    <span className={`p-2.5 rounded-lg transition-all duration-500 shrink-0 ${isActive ? 'bg-tva-orange text-white shadow-glow-amber' : 'bg-gray-50 text-gray-400'}`}>
                                        {data.icon}
                                    </span>
                                    <div className="flex-1">
                                        <h3 className={`font-bold text-sm transition-colors duration-500 mb-1.5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>{data.title}</h3>
                                        <p className="text-[11px] text-gray-400 font-medium leading-normal whitespace-normal">
                                            {data.desc}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                     <div className="flex items-center gap-2 mb-2">
                         <ShieldCheck className="text-tva-orange w-4 h-4" />
                         <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Enterprise_Standard</span>
                     </div>
                     <p className="text-[9px] text-gray-500 leading-relaxed font-medium">
                        Every architecture follows strict SOC2 patterns including PII masking middleware and sub-second private-cloud inference.
                     </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
