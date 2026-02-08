
// @google/genai Coding Guidelines followed: Using named exports and clean functional components.
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Database, BrainCircuit, Network, Zap, Search, Code2, Target, Play, Pause, 
  CheckCircle2, Workflow, FileText, Cpu, Server, GitBranch, Settings, 
  MessageSquare, Share2, Layers, Activity, ShieldCheck, FastForward, 
  Binary, UserCheck, HardDrive, Infinity, Repeat, Box, Scaling, 
  RefreshCcw, Gauge, Loader2, Sparkles, Filter, DatabaseZap, Terminal, ArrowRight,
  Clock, Hash, MapPin, Calendar, User, ShoppingCart, Link2, Monitor, Shield, Globe
} from 'lucide-react';

/* --- RESPONSIVE SIMULATION WRAPPER --- */
const SimulationStage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-slate-950">
            <div className="w-full h-full max-w-[640px] max-h-[600px] relative flex items-center justify-center">
                {children}
            </div>
        </div>
    );
};

/* --- RE-CALIBRATED SIMULATIONS --- */

const RagSimulation: React.FC = () => {
    const [step, setStep] = useState(0); 

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((s) => (s + 1) % 5);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <SimulationStage>
            <div className="w-full h-full flex items-center justify-around gap-2 sm:gap-4 px-4 sm:px-8">
                {/* Document Stage */}
                <div className={`flex flex-col items-center w-1/3 transition-all duration-700 ${step <= 1 ? 'scale-100 opacity-100' : 'scale-90 opacity-40'}`}>
                    <div className="w-16 h-20 sm:w-24 sm:h-32 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 rounded-lg shadow-2xl relative overflow-hidden flex flex-col p-2 sm:p-3 gap-1.5 border border-slate-200">
                        {step === 0 && (
                            <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex items-center justify-center z-30">
                                <Loader2 className="w-6 h-6 text-gray-700 animate-spin" />
                            </div>
                        )}
                        <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                        <div className="h-1.5 w-full bg-slate-100 rounded"></div>
                        <div className={`absolute inset-0 flex flex-col gap-1.5 p-2 transition-all duration-500 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 ${step === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            {Array.from({length: 3}).map((_, i) => (
                                <div key={i} className="h-4 bg-gray-200 border border-gray-300 rounded-md animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                    <span className="mt-2 text-[7px] sm:text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black text-center">INGEST</span>
                </div>

                {/* Vector Processing */}
                <div className="w-1/4 flex flex-col items-center justify-center">
                     <div className={`w-20 h-16 sm:w-28 sm:h-20 border-2 rounded-xl sm:rounded-2xl bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-2 transition-all duration-700 ${step === 2 ? 'border-gray-400 shadow-[0_0_20px_rgba(0,0,0,0.2)]' : 'border-slate-800 opacity-20'}`}>
                        {step === 2 ? (
                            <div className="flex gap-0.5 sm:gap-1 h-6 sm:h-8 items-end justify-center">
                                {[5, 9, 7, 10, 6].map((h, i) => (
                                    <div key={i} className="w-1 bg-gray-400 rounded-t-sm" style={{ height: `${h * 10}%`, animation: `bounce ${0.6 + i*0.1}s ease-in-out infinite` }}></div>
                                ))}
                            </div>
                        ) : <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-slate-700" />}
                     </div>
                     <span className="mt-2 text-[7px] sm:text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black text-center">EMBED</span>
                </div>

                {/* Store Stage */}
                <div className={`flex flex-col items-center w-1/3 transition-all duration-700 ${step >= 3 ? 'scale-100 opacity-100' : 'scale-90 opacity-20'}`}>
                    <div className={`w-24 h-24 sm:w-36 sm:h-36 border-2 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center bg-slate-900 transition-all duration-700 relative overflow-hidden ${step === 3 ? 'border-gray-400 shadow-[0_0_30px_rgba(0,0,0,0.3)]' : step === 4 ? 'border-gray-500' : 'border-slate-800'}`}>
                         <DatabaseZap className={`w-8 h-8 sm:w-12 sm:h-12 transition-colors duration-500 ${step >= 3 ? 'text-gray-400' : 'text-slate-700'}`} />
                         {step === 4 && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-500/10 backdrop-blur-[1px]">
                                <CheckCircle2 className="text-gray-500 w-6 h-6 sm:w-8 sm:h-8" />
                            </div>
                         )}
                    </div>
                    <span className="mt-2 text-[7px] sm:text-[9px] font-mono text-slate-500 uppercase tracking-widest font-black text-center">SYNC</span>
                </div>
            </div>
        </SimulationStage>
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
        <SimulationStage>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 w-full px-4 sm:px-8 py-4">
                {/* Model Hardware */}
                <div className={`w-36 h-48 sm:w-52 sm:h-64 border-2 rounded-[1.5rem] sm:rounded-[2rem] bg-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-1000 relative overflow-hidden ${cycle === 0 ? 'border-gray-400 shadow-[0_0_30px_rgba(0,0,0,0.15)]' : 'border-slate-800'}`}>
                    <div className="relative mb-3 sm:mb-6">
                        <Cpu className={`w-6 h-6 sm:w-10 sm:h-10 transition-colors duration-500 ${cycle >= 1 ? 'text-slate-700' : 'text-gray-400'}`} />
                        {cycle >= 3 && <Sparkles className="absolute -top-3 -right-3 w-4 h-4 text-gray-400 animate-pulse" />}
                    </div>
                    <div className="text-[7px] sm:text-[10px] font-mono text-slate-400 font-black text-center uppercase tracking-widest leading-tight mb-3 sm:mb-6">LLM_CORE<br/>H100_NODE</div>
                    <div className={`transition-all duration-700 ${cycle >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className={`px-2 py-1 border border-dashed rounded-lg bg-purple-950/30 flex items-center gap-1.5 ${cycle === 2 ? 'border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-slate-800'}`}>
                            <Layers size={10} className="text-purple-400" />
                            <span className="text-[7px] font-black text-purple-100 uppercase">LoRA_ADAPT</span>
                        </div>
                    </div>
                </div>

                {/* Telemetry Panel */}
                <div className={`w-full sm:w-72 h-44 sm:h-64 border-2 rounded-2xl sm:rounded-3xl bg-slate-950 p-4 sm:p-6 flex flex-col justify-between transition-all duration-1000 ${cycle === 4 ? 'border-gray-500 shadow-[0_0_40px_rgba(0,0,0,0.08)]' : 'border-slate-800'}`}>
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <div className="text-[6px] sm:text-[8px] font-mono text-slate-600 font-black uppercase tracking-widest">REALTIME_LOG</div>
                            <div className="text-[8px] sm:text-[11px] font-mono text-white font-bold truncate">
                                {cycle === 1 ? "CACHE_SYNC" : cycle === 2 ? "PARAM_LOCK" : cycle === 3 ? "INFER_HOT" : cycle === 4 ? "SYSTEM_READY" : "STANDBY"}
                            </div>
                        </div>
                        <Terminal className={`w-3 h-3 sm:w-5 sm:h-5 ${cycle >= 1 ? 'text-gray-400' : 'text-slate-800'}`} />
                    </div>
                    
                    <div className="flex-1 flex items-end gap-1 mt-2 sm:mt-6 border-b border-white/5 pb-1 h-12 sm:h-20 overflow-hidden">
                        {Array.from({length: 10}).map((_, i) => (
                            <div key={i} className={`flex-1 rounded-t-sm transition-all duration-1000 ${cycle >= 1 ? 'bg-gray-400/30' : 'bg-slate-900'}`} style={{ height: cycle === 0 ? '25%' : `${20 + Math.random() * (cycle * 20)}%` }}></div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-2 sm:mt-6">
                        <div className="bg-slate-900 rounded-lg p-1 sm:p-2 border border-white/5 text-center">
                            <div className="text-[5px] sm:text-[7px] text-slate-500 uppercase font-black">Loss</div>
                            <div className="text-[9px] sm:text-[11px] font-mono font-bold text-white">{(0.38 / (cycle + 0.5)).toFixed(3)}</div>
                        </div>
                        <div className="bg-slate-900 rounded-lg p-1 sm:p-2 border border-white/5 text-center">
                            <div className="text-[5px] sm:text-[7px] text-slate-500 uppercase font-black">P99</div>
                            <div className="text-[9px] sm:text-[11px] font-mono font-bold text-gray-400">{cycle >= 3 ? '14ms' : '---'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </SimulationStage>
    );
};

const WorkflowAgentSimulation: React.FC = () => {
    const [activeNode, setActiveNode] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNode((s) => (s + 1) % 5);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    const nodeItems = [
        { label: "Start", icon: <MessageSquare size={16} /> },
        { label: "Brain", icon: <BrainCircuit size={16} /> },
        { label: "Tool", icon: <GitBranch size={16} /> },
        { label: "Audit", icon: <ShieldCheck size={16} /> },
        { label: "Done", icon: <CheckCircle2 size={16} /> },
    ];

    return (
        <SimulationStage>
            <div className="w-full h-full flex flex-col items-center justify-center px-4 sm:px-12 py-4">
                <div className="relative w-full h-16 sm:h-24 flex items-center justify-between">
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <line x1="10" y1="50" x2="90" y2="50" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="2 4" />
                        <circle r="1" fill="#3b82f6" style={{ filter: 'drop-shadow(0 0 4px #3b82f6)' }}>
                            <animate 
                                attributeName="cx" 
                                values={`${15 + activeNode * 17.5}`} 
                                dur="0.8s" 
                                fill="freeze" 
                            />
                            <animate attributeName="cy" values="50" dur="0.8s" fill="freeze" />
                        </circle>
                    </svg>
                    
                    {nodeItems.map((item, i) => {
                        const isActive = activeNode === i;
                        return (
                            <div key={i} className="flex flex-col items-center gap-2 relative z-10 w-12 sm:w-16">
                                <div className={`w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all duration-700 bg-slate-950 ${isActive ? 'border-gray-400 shadow-[0_0_30px_rgba(0,0,0,0.2)] scale-110' : 'border-slate-800'}`}>
                                    {/* Fix: casting to React.ReactElement<any> to avoid className/size property error */}
                                    {React.cloneElement(item.icon as React.ReactElement<any>, { className: isActive ? 'text-gray-400' : 'text-slate-700', size: 18 })}
                                </div>
                                <span className={`text-[6px] sm:text-[8px] font-black uppercase tracking-widest transition-colors text-center ${isActive ? 'text-white' : 'text-slate-800'}`}>{item.label}</span>
                            </div>
                        );
                    })}
                </div>

                <div className="w-full max-w-sm mt-4 sm:mt-16 bg-slate-900/50 border border-white/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-40 sm:h-48 flex flex-col font-mono overflow-hidden">
                    <div className="flex items-center justify-between mb-2 sm:mb-4 border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                            <Terminal size={10} className="text-gray-400" />
                            <span className="text-[7px] sm:text-[10px] text-slate-500 font-black tracking-widest uppercase">STREAMING_LOGS</span>
                        </div>
                    </div>
                    <div className="flex-1 space-y-1 sm:space-y-2">
                        {[
                            "TASK_INGESTION_READY",
                            "AGENT_LOGIC_CALC",
                            "API_ORCHESTRATION",
                            "SECURITY_AUDIT_PASS",
                            "DEPLOYMENT_SUCCESS"
                        ].map((log, i) => (
                            <div key={i} className={`flex gap-2 items-center transition-opacity duration-500 ${activeNode === i ? 'opacity-100' : 'opacity-5'}`}>
                                <span className="text-slate-700 text-[7px]">[{new Date().toLocaleTimeString([], {hour12:false, minute:'2-digit', second:'2-digit'})}]</span>
                                <span className="text-gray-400 text-[7px] font-black">{log}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SimulationStage>
    );
};

const GraphSimulation: React.FC = () => {
  const [activePathIdx, setActivePathIdx] = useState(0);

  const nodes = useMemo(() => [
    { id: 'usr', x: 200, y: 150, label: "USER_892", icon: <User size={14} />, color: '#3b82f6' },
    { id: 'acc', x: 340, y: 100, label: "ACCOUNT", icon: <Shield size={14} />, color: '#10b981' },
    { id: 'dev', x: 480, y: 120, label: "DEVICE", icon: <Monitor size={14} />, color: '#8b5cf6' },
    { id: 'loc', x: 580, y: 220, label: "LOCATION", icon: <MapPin size={14} />, color: '#ef4444' },
    { id: 'txn', x: 380, y: 280, label: "TRANSACTION", icon: <ShoppingCart size={14} />, color: '#f59e0b' },
    { id: 'ip', x: 240, y: 320, label: "IP_ADDR", icon: <Globe size={14} />, color: '#06b6d4' },
    { id: 'ses', x: 140, y: 250, label: "SESSION", icon: <Activity size={14} />, color: '#ec4899' },
    { id: 'pro', x: 520, y: 350, label: "PRODUCT", icon: <Box size={14} />, color: '#f97316' },
  ], []);

  const discoveryPaths = useMemo(() => [
    { from: 'usr', to: 'acc', label: 'OWNER' },
    { from: 'acc', to: 'txn', label: 'AUTH' },
    { from: 'txn', to: 'pro', label: 'BUY' },
    { from: 'usr', to: 'dev', label: 'LOGIN' },
    { from: 'dev', to: 'ip', label: 'ROUTE' },
    { from: 'ip', to: 'loc', label: 'LOC' },
    { from: 'usr', to: 'ses', label: 'START' },
    { from: 'ses', to: 'ip', label: 'TRACE' }
  ], []);

  useEffect(() => {
    const interval = setInterval(() => setActivePathIdx((p) => (p + 1) % discoveryPaths.length), 3200);
    return () => clearInterval(interval);
  }, [discoveryPaths.length]);

  const activeLink = discoveryPaths[activePathIdx];

  return (
    <SimulationStage>
      <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
          <svg viewBox="0 0 800 500" className="w-full h-full overflow-visible max-w-full">
            <defs>
              <filter id="nodeGlow"><feGaussianBlur stdDeviation="6" /><feComposite operator="over" in2="SourceGraphic" /></filter>
              <filter id="activeLinkGlow"><feGaussianBlur stdDeviation="3" /><feComposite operator="over" in2="SourceGraphic" /></filter>
            </defs>
            
            {discoveryPaths.map((path, idx) => {
              const from = nodes.find(n => n.id === path.from)!;
              const to = nodes.find(n => n.id === path.to)!;
              const isActive = activePathIdx === idx;
              
              return (
                <path 
                  key={idx}
                  d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`} 
                  stroke={isActive ? "#3b82f6" : "#1e293b"} 
                  strokeWidth={isActive ? "3" : "1"} 
                  fill="none" 
                  className="transition-all duration-1000"
                  filter={isActive ? "url(#activeLinkGlow)" : "none"}
                  strokeDasharray={isActive ? "none" : "4 4"}
                />
              );
            })}

            {nodes.map((node) => {
              const isActiveNode = activeLink.from === node.id || activeLink.to === node.id;
              return (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="transition-transform duration-700">
                  <circle r={isActiveNode ? 30 : 22} fill={node.color} opacity={isActiveNode ? 0.2 : 0.05} className={isActiveNode ? "animate-pulse" : ""} />
                  <circle r="16" fill="#0f172a" stroke={isActiveNode ? node.color : "#334155"} strokeWidth={isActiveNode ? "2.5" : "1.5"} filter={isActiveNode ? "url(#nodeGlow)" : "none"} />
                  <g className={isActiveNode ? 'text-white' : 'text-slate-600'} transform="translate(-7, -7)">{node.icon}</g>
                  <text textAnchor="middle" y="38" className={`text-[8px] font-mono font-black tracking-widest transition-colors ${isActiveNode ? 'fill-white' : 'fill-slate-700'}`}>{node.label}</text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 w-48 sm:w-56 bg-slate-900/95 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                  <Network size={12} className="text-gray-400" />
                  <div className="text-[8px] sm:text-[9px] font-mono text-gray-400 font-bold uppercase tracking-widest">SUBGRAPH_SYNC</div>
              </div>
              <p className="text-[8px] sm:text-[9px] text-slate-400 font-medium leading-relaxed italic">
                Validated link: <strong className="text-white">{activeLink.label}</strong>
              </p>
          </div>
      </div>
    </SimulationStage>
  );
};

/* --- MAIN SECTION COMPONENT --- */

export const TechArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rag' | 'graph' | 'ml' | 'workflow'>('rag');
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const architectureMethods = {
    rag: { 
      title: "RAG Chatbots", 
      desc: "Secure, local LLM-powered chat interfaces for your proprietary business data", 
      icon: <Database className="w-5 h-5" />, 
      component: <RagSimulation /> 
    },
    graph: { 
      title: "Knowledge Graphs", 
      desc: "Relational Intelligence Engines: Map complex causal relationships and entity dependencies for deep institutional reasoning", 
      icon: <Network className="w-5 h-5" />, 
      component: <GraphSimulation /> 
    },
    ml: { 
      title: "ML Solutions", 
      desc: "Custom Model Alignment: Domain-specific fine-tuning (LoRA/DPO) to harden LLM performance for specialized technical sectors", 
      icon: <BrainCircuit className="w-5 h-5" />, 
      component: <MLSimulation /> 
    },
    workflow: { 
      title: "Agentic Flows", 
      desc: "Autonomous Orchestration: Multi-agent systems that reason through complex API logic to execute end-to-end business operations", 
      icon: <Workflow className="w-5 h-5" />, 
      component: <WorkflowAgentSimulation /> 
    }
  };

  const architectureTabs = Object.keys(architectureMethods) as (keyof typeof architectureMethods)[];

  useEffect(() => {
    if (isPaused) return;
    const duration = 7500; 
    const intervalTime = 20; 
    const stepValue = 100 / (duration / intervalTime);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((current) => architectureTabs[(architectureTabs.indexOf(current) + 1) % architectureTabs.length]);
          return 0; 
        }
        return prev + stepValue;
      });
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPaused, architectureTabs]);

  return (
    <section className="py-12 md:py-24 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 border-y border-gray-200 relative overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-3xl md:text-6xl font-sans font-black text-gray-900 mb-6 tracking-tight">AI <span className="text-gray-900">Architectures</span></h2>
            <p className="text-base sm:text-lg text-gray-900 font-black leading-relaxed">Hardened patterns tailored for enterprise security.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-stretch max-w-7xl mx-auto">
            <div className="lg:col-span-8 order-2 lg:order-1">
                <div className="bg-slate-950 rounded-2xl shadow-2xl overflow-hidden border border-slate-900 flex flex-col relative h-[500px] sm:h-[550px] lg:h-full lg:min-h-[600px]">
                    <div className="bg-slate-900/95 p-3 sm:p-4 border-b border-white/5 flex justify-between items-center z-20 shrink-0">
                         <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div><div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div></div>
                         <div className="font-mono text-[8px] sm:text-[9px] text-slate-500 uppercase font-black tracking-widest flex items-center gap-2"><Activity size={12} className="text-gray-400" /> SYSTEM_STREAM // {activeTab}</div>
                    </div>
                    <div className="flex-1 relative">{architectureMethods[activeTab].component}</div>
                </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 order-1 lg:order-2">
                {architectureTabs.map((key) => {
                    const data = architectureMethods[key];
                    const isActive = activeTab === key;
                    return (
                        <button key={key} onClick={() => { setActiveTab(key); setProgress(0); }} className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-500 relative ${isActive ? 'bg-white border-gray-500 shadow-xl lg:scale-[1.02]' : 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-md'}`}>
                            {isActive && <div className="absolute bottom-0 left-5 right-5 h-1 bg-gray-200 overflow-hidden rounded-full"><div className="h-full bg-gray-900 rounded-full" style={{ width: `${progress}%` }}></div></div>}
                            <div className="flex items-center sm:items-start gap-4">
                                <span className={`p-3 rounded-xl transition-all shrink-0 border-2 ${isActive ? 'bg-gray-900 text-white shadow-xl border-gray-900' : 'bg-gray-50 text-gray-700 border-gray-300'}`}>{data.icon}</span>
                                <div className="min-w-0">
                                    <h3 className={`font-black text-xs sm:text-sm mb-1 truncate ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>{data.title}</h3>
                                    <p className="text-[9px] sm:text-[10px] text-gray-800 font-semibold leading-tight line-clamp-2">{data.desc}</p>
                                </div>
                            </div>
                        </button>
                    );
                })}
                <div className="mt-auto p-5 bg-gray-100 rounded-xl border-2 border-gray-300 flex items-center gap-3 shadow-sm">
                    <ShieldCheck className="text-gray-900 w-6 h-6 shrink-0" />
                    <p className="text-[9px] text-gray-900 leading-tight font-black uppercase tracking-widest">SOC2 TYPE II INFRASTRUCTURE</p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
