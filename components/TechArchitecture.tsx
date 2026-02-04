import React, { useState, useEffect } from 'react';
import { Database, BrainCircuit, Network, Zap, Search, Code2, Target, Play, Pause, CheckCircle2, Workflow, FileText, Cpu, Server, GitBranch, Settings, MessageSquare, Share2 } from 'lucide-react';

/* --- LIVE SIMULATIONS --- */

const RagSimulation: React.FC = () => {
    const [phase, setPhase] = useState(0); // 0: Ingest, 1: Scan, 2: Store, 3: Query, 4: Answer
    
    useEffect(() => {
        const sequence = async () => {
            while(true) {
                setPhase(0); // Show Doc
                await new Promise(r => setTimeout(r, 1000));
                setPhase(1); // Scan/Vectorize
                await new Promise(r => setTimeout(r, 1500));
                setPhase(2); // Store in DB
                await new Promise(r => setTimeout(r, 1000));
                setPhase(3); // Query enters
                await new Promise(r => setTimeout(r, 1000));
                setPhase(4); // Answer generated
                await new Promise(r => setTimeout(r, 3000));
            }
        };
        sequence();
    }, []);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 p-2 md:p-6">
            {/* Ambient Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px] md:bg-[size:40px_40px]"></div>

            {/* Status Bar - Moved to Top to avoid collision with bottom overlay */}
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-3 md:gap-8 overflow-x-auto px-4 no-scrollbar z-10 pointer-events-none">
                {['INGEST', 'VECTOR', 'QUERY', 'ANSWER'].map((label, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 shrink-0 opacity-80">
                        <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-colors duration-300 ${
                            (i === 0 && phase >= 0) || (i === 1 && phase >= 1) || (i === 2 && phase >= 3) || (i === 3 && phase >= 4)
                            ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' 
                            : 'bg-slate-700'
                        }`}></div>
                        <span className={`text-[8px] md:text-[10px] font-bold tracking-widest ${
                             (i === 0 && phase >= 0) || (i === 1 && phase >= 1) || (i === 2 && phase >= 3) || (i === 3 && phase >= 4)
                             ? 'text-cyan-400' 
                             : 'text-slate-700'
                        }`}>{label}</span>
                    </div>
                ))}
            </div>

            <div className="relative w-full h-full flex flex-col items-center justify-center pb-4 md:pb-12 pt-8">
                {/* Main Visual Flow */}
                <div className="flex items-center justify-between w-full max-w-[320px] md:max-w-2xl px-1 md:px-4 relative z-10 gap-1 md:gap-4 mt-4 scale-90 md:scale-100 origin-center">
                    
                    {/* 1. DOCUMENT SOURCE */}
                    <div className={`flex flex-col items-center gap-2 transition-all duration-700 shrink-0 ${phase >= 2 ? 'opacity-30 blur-[1px]' : 'opacity-100 scale-100'}`}>
                        <div className="w-12 h-14 md:w-20 md:h-24 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center relative overflow-hidden shadow-2xl transition-all">
                            <FileText className="text-slate-400 w-6 h-6 md:w-10 md:h-10" />
                            {phase === 1 && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-[scanVertical_1.2s_linear_forwards]"></div>
                            )}
                        </div>
                        <div className="text-[9px] md:text-xs font-mono text-slate-400 font-bold tracking-widest">DATA</div>
                    </div>

                    {/* CONNECTION LINE 1 */}
                    <div className="flex-1 h-0.5 md:h-1 bg-slate-700/50 relative rounded-full overflow-hidden min-w-[10px]">
                        <div className={`absolute inset-0 bg-cyan-500 h-full transition-all duration-1000 ease-out ${phase >= 1 ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                    </div>

                    {/* 2. VECTOR STORE (Central Hub) */}
                    <div className="relative group flex flex-col items-center gap-2 shrink-0">
                        <div className={`w-16 h-16 md:w-28 md:h-28 rounded-full border-2 flex items-center justify-center bg-slate-900 transition-colors duration-500 ${phase >= 2 ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'border-slate-700'}`}>
                            <Database className={`w-7 h-7 md:w-12 md:h-12 transition-colors duration-300 ${phase >= 2 ? 'text-cyan-400' : 'text-slate-600'}`} />
                            {phase >= 2 && (
                                <div className="absolute inset-[-4px] md:inset-[-12px] border border-cyan-500/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
                            )}
                        </div>
                        <div className="text-[9px] md:text-xs font-mono text-cyan-500 font-bold tracking-widest">VECTORS</div>
                        
                        {/* Query Input Visualization */}
                        <div className={`absolute -top-10 md:-top-16 left-1/2 -translate-x-1/2 bg-slate-800 text-cyan-400 text-[9px] md:text-xs px-2 py-1 md:px-3 md:py-1 rounded border border-cyan-900 whitespace-nowrap transition-all duration-500 ${phase === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <Search size={10} className="inline mr-1" />
                            "Revenue?"
                        </div>
                    </div>

                    {/* CONNECTION LINE 2 */}
                    <div className="flex-1 h-0.5 md:h-1 bg-slate-700/50 relative rounded-full overflow-hidden min-w-[10px]">
                        <div className={`absolute inset-0 bg-green-500 h-full transition-all duration-1000 ease-out ${phase >= 4 ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                    </div>

                    {/* 3. VERIFIED ANSWER */}
                    <div className={`flex flex-col items-center gap-2 transition-all duration-500 shrink-0 ${phase === 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                        <div className="w-12 h-14 md:w-20 md:h-24 bg-slate-900 border border-green-500/50 rounded-lg p-2 md:p-2 shadow-[0_0_20px_rgba(34,197,94,0.2)] flex flex-col gap-1.5 md:gap-2">
                            <div className="h-1 md:h-1.5 w-1/3 bg-green-500 rounded-full"></div>
                            <div className="h-0.5 md:h-1 w-full bg-slate-700 rounded-full"></div>
                            <div className="h-0.5 md:h-1 w-full bg-slate-700 rounded-full"></div>
                            <div className="mt-auto flex items-center gap-1 text-[7px] md:text-[9px] text-green-400 font-bold uppercase">
                                <CheckCircle2 size={8} /> Verified
                            </div>
                        </div>
                        <div className="text-[9px] md:text-xs font-mono text-green-400 font-bold tracking-widest">INSIGHT</div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

const GraphSimulation: React.FC = () => {
    // 5 Node Supply Chain
    const [alertStage, setAlertStage] = useState(0); 

    useEffect(() => {
        const loop = async () => {
            while(true) {
                setAlertStage(0);
                await new Promise(r => setTimeout(r, 2000));
                setAlertStage(1); // Supplier Fail
                await new Promise(r => setTimeout(r, 1000));
                setAlertStage(2); // Transit Delay
                await new Promise(r => setTimeout(r, 1000));
                setAlertStage(3); // Inventory Critical
                await new Promise(r => setTimeout(r, 3000));
            }
        };
        loop();
    }, []);

    const Line = ({ start, end, active, color }: any) => (
        <line 
            x1={`${start[0]}%`} y1={`${start[1]}%`} 
            x2={`${end[0]}%`} y2={`${end[1]}%`} 
            stroke={color} 
            strokeWidth="2" 
            strokeDasharray="4 4"
            className={active ? "animate-[dash_1s_linear_infinite]" : "opacity-20"}
        />
    );

    // COMPACTED COORDINATES to fit above overlay
    const nodes = {
        supplier: [15, 20],
        factory: [40, 40],
        logistics: [40, 65],
        dc: [65, 40],
        store: [85, 40]
    };

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50">
             {/* Map Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30"></div>

             {/* Container specifically sized to maintain structure on mobile */}
             <div className="relative w-full h-full max-w-3xl mx-auto md:scale-100 origin-center p-4">
                 <svg className="w-full h-full overflow-visible pointer-events-none">
                     <Line start={nodes.supplier} end={nodes.factory} active={true} color={alertStage >= 1 ? '#ef4444' : '#3b82f6'} />
                     <Line start={nodes.logistics} end={nodes.factory} active={true} color="#3b82f6" />
                     <Line start={nodes.factory} end={nodes.dc} active={true} color={alertStage >= 2 ? '#f59e0b' : '#3b82f6'} />
                     <Line start={nodes.dc} end={nodes.store} active={true} color={alertStage >= 3 ? '#f59e0b' : '#3b82f6'} />
                 </svg>

                 {/* NODES - Text scaled up for readability on mobile */}
                 
                 {/* Supplier */}
                 <div className="absolute" style={{ left: '15%', top: '20%', transform: 'translate(-50%, -50%)' }}>
                     <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center bg-slate-900 z-10 relative transition-all duration-300 ${alertStage >= 1 ? 'border-red-500 bg-red-500/10' : 'border-slate-600'}`}>
                         <Zap className={`w-4 h-4 md:w-6 md:h-6 ${alertStage >= 1 ? 'text-red-500 animate-pulse' : 'text-slate-500'}`} />
                         {alertStage >= 1 && <div className="absolute inset-[-8px] bg-red-500/20 rounded-full animate-ping"></div>}
                     </div>
                     <span className="absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap bg-slate-950/80 rounded px-1.5 py-0.5 border border-slate-800">Supplier</span>
                 </div>

                 {/* Logistics */}
                 <div className="absolute" style={{ left: '40%', top: '65%', transform: 'translate(-50%, -50%)' }}>
                     <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-slate-600 flex items-center justify-center bg-slate-900 z-10 relative">
                         <Workflow className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
                     </div>
                     <span className="absolute -bottom-6 md:-bottom-8 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap bg-slate-950/80 px-1 rounded">Transit</span>
                 </div>

                 {/* Factory */}
                 <div className="absolute" style={{ left: '40%', top: '40%', transform: 'translate(-50%, -50%)' }}>
                     <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center bg-slate-900 z-10 relative transition-all duration-300 ${alertStage >= 2 ? 'border-amber-500' : 'border-slate-500'}`}>
                         <Cpu className={`w-5 h-5 md:w-8 md:h-8 ${alertStage >= 2 ? 'text-amber-500' : 'text-slate-400'}`} />
                     </div>
                     {alertStage === 2 && (
                         <div className="absolute -bottom-8 md:-bottom-10 left-1/2 -translate-x-1/2 bg-amber-900/80 border border-amber-500/50 px-2 py-1 rounded text-[9px] md:text-[10px] text-amber-500 font-mono whitespace-nowrap animate-in slide-in-from-top-2 z-20 shadow-lg">
                             ⚠ DELAY
                         </div>
                     )}
                 </div>

                 {/* DC */}
                 <div className="absolute" style={{ left: '65%', top: '40%', transform: 'translate(-50%, -50%)' }}>
                     <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center bg-slate-900 z-10 relative transition-all duration-300 ${alertStage >= 3 ? 'border-amber-500' : 'border-slate-600'}`}>
                         <Server className={`w-4 h-4 md:w-5 md:h-5 ${alertStage >= 3 ? 'text-amber-500' : 'text-slate-500'}`} />
                     </div>
                 </div>

                 {/* Store */}
                 <div className="absolute" style={{ left: '85%', top: '40%', transform: 'translate(-50%, -50%)' }}>
                     <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center bg-slate-900 z-10 relative transition-all duration-300 ${alertStage >= 3 ? 'border-red-500' : 'border-slate-600'}`}>
                         <Target className={`w-4 h-4 md:w-5 md:h-5 ${alertStage >= 3 ? 'text-red-500' : 'text-slate-500'}`} />
                     </div>
                      {alertStage === 3 && (
                         <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 bg-red-900/80 border border-red-500/50 px-2 py-1 rounded text-[9px] md:text-[10px] text-red-500 font-mono whitespace-nowrap animate-pulse z-20 shadow-lg">
                             CRITICAL
                         </div>
                     )}
                 </div>

             </div>

             {/* HUD Overlay */}
             <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
                 <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${alertStage > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                     <span className="text-[9px] md:text-[10px] font-mono text-slate-400 uppercase">
                         STATUS: {alertStage === 0 ? 'OK' : 'FAIL'}
                     </span>
                 </div>
             </div>
        </div>
    );
};

const FineTuneSimulation: React.FC = () => {
    // Neural Network Calibration Visual
    const [scanPos, setScanPos] = useState(0);

    useEffect(() => {
        // Ping pong scan
        const interval = setInterval(() => {
            setScanPos(prev => (prev + 1) % 100);
        }, 30);
        return () => clearInterval(interval);
    }, []);

    const nodes = Array.from({length: 12}).map((_, i) => ({
        x: 20 + Math.random() * 60,
        y: 10 + Math.random() * 80,
        id: i
    }));

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 p-4">
            <div className="absolute inset-0 flex">
                <div className="w-full h-full bg-slate-900/50 border-r border-slate-800"></div>
                <div className="w-full h-full bg-slate-900/50"></div>
            </div>

            <div className="absolute inset-0 p-4 md:p-12">
                <svg className="w-full h-full">
                    {nodes.map((node, i) => (
                         nodes.slice(i+1, i+4).map((target, j) => {
                             const isFineTuned = (scanPos > (node.x));
                             return (
                                <line 
                                    key={`${i}-${j}`}
                                    x1={`${node.x}%`} y1={`${node.y}%`} 
                                    x2={`${target.x}%`} y2={`${target.y}%`} 
                                    stroke={isFineTuned ? '#f97316' : '#334155'} 
                                    strokeWidth={isFineTuned ? "2" : "1"}
                                    strokeOpacity={isFineTuned ? "0.8" : "0.3"}
                                    className="transition-colors duration-300"
                                />
                             );
                         })
                    ))}
                    {nodes.map((node, i) => {
                         const isFineTuned = (scanPos > node.x);
                         return (
                            <circle 
                                key={i} 
                                cx={`${node.x}%`} cy={`${node.y}%`} 
                                r={isFineTuned ? "4" : "3"} 
                                fill={isFineTuned ? '#f97316' : '#1e293b'}
                                stroke={isFineTuned ? '#fff' : '#475569'}
                                strokeWidth="1"
                                className="transition-all duration-300"
                            />
                         );
                    })}
                </svg>
            </div>

            <div 
                className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-tva-orange to-transparent shadow-[0_0_20px_#f97316] z-20"
                style={{ left: `${scanPos}%` }}
            >
                <div className="absolute top-1/2 -left-3 bg-tva-orange text-black text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded rotate-90 whitespace-nowrap">
                    CALIBRATING
                </div>
            </div>

            <div className="absolute top-3 left-3 md:top-4 md:left-4">
                <div className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Base Model</div>
                <div className="text-[9px] md:text-xs font-mono text-slate-600">"I cannot..."</div>
            </div>
            
            {/* Moved label to Top-Right to allow bottom space for overlay */}
            <div className="absolute top-3 right-3 md:top-4 md:right-4 text-right">
                <div className="text-[9px] md:text-[10px] font-bold text-tva-orange uppercase tracking-widest mb-1">Fine-Tuned</div>
                <div className="text-[9px] md:text-xs font-mono text-orange-200">"Variance is -4.2%"</div>
            </div>
        </div>
    );
};

const WorkflowSimulation: React.FC = () => {
    // Logic Gate Visualization
    const [step, setStep] = useState(0); 

    useEffect(() => {
        const loop = async () => {
            while(true) {
                setStep(0); // Trigger
                await new Promise(r => setTimeout(r, 1000));
                setStep(1); // Router Logic
                await new Promise(r => setTimeout(r, 1200));
                setStep(2); // Branch Action
                await new Promise(r => setTimeout(r, 1000));
                setStep(3); // Complete
                await new Promise(r => setTimeout(r, 2000));
            }
        };
        loop();
    }, []);

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 p-4">
            <div className="absolute inset-0 bg-[size:20px_20px] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"></div>

            <div className="relative w-full h-full max-w-lg flex items-center justify-center scale-90 md:scale-100">
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                     <line x1="15%" y1="50%" x2="40%" y2="50%" stroke={step >= 1 ? "#ec4899" : "#334155"} strokeWidth="2" className="transition-colors duration-500" />
                     <path d="M 40% 50% C 50% 50%, 50% 35%, 60% 35% H 75%" fill="none" stroke={step >= 2 ? "#ec4899" : "#334155"} strokeWidth="2" className="transition-colors duration-500" />
                     <path d="M 40% 50% C 50% 50%, 50% 65%, 60% 65% H 75%" fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.5" />
                </svg>

                {/* Node 1: Webhook Trigger */}
                <div className="absolute left-[15%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 md:w-14 md:h-14 bg-slate-800 rounded-lg border-2 flex items-center justify-center transition-all ${step >= 0 ? 'border-pink-500 shadow-[0_0_15px_#ec4899]' : 'border-slate-600'}`}>
                        <Zap size={16} className={step >= 0 ? "text-pink-500" : "text-slate-500"} />
                    </div>
                    <span className="text-[9px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900 px-1">Trigger</span>
                </div>

                {/* Node 2: Router (LangGraph) */}
                <div className="absolute left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 md:w-16 md:h-16 bg-slate-800 rounded-full border-2 flex items-center justify-center transition-all ${step >= 1 ? 'border-pink-500 bg-pink-500/10' : 'border-slate-600'}`}>
                        <GitBranch size={20} className={step >= 1 ? "text-pink-500" : "text-slate-500"} />
                        {step === 1 && <div className="absolute inset-[-8px] border border-pink-500 rounded-full animate-ping opacity-50"></div>}
                    </div>
                    <span className="text-[9px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900 px-1">Router</span>
                </div>

                {/* Node 3: Action (n8n API) */}
                <div className="absolute left-[75%] top-[35%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 md:w-14 md:h-14 bg-slate-800 rounded-lg border-2 flex items-center justify-center transition-all ${step >= 2 ? 'border-pink-500 bg-pink-500/10' : 'border-slate-600'}`}>
                        <Settings size={16} className={step >= 2 ? "text-pink-500 animate-spin-slow" : "text-slate-500"} />
                    </div>
                    {step === 2 && (
                        <div className="absolute -right-2 md:-right-16 top-0 bg-slate-800 border border-pink-500/50 text-[9px] md:text-[8px] text-pink-400 p-1.5 md:p-2 rounded font-mono z-20">
                            200 OK
                        </div>
                    )}
                    <span className="text-[9px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900 px-1">API</span>
                </div>

                 {/* Node 4: Alternate */}
                 <div className="absolute left-[75%] top-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-50">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-lg border border-slate-600 flex items-center justify-center">
                        <MessageSquare size={14} className="text-slate-500" />
                    </div>
                    <span className="text-[9px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-1">Slack</span>
                </div>
            </div>

            <div className="absolute bottom-3 left-3 flex items-center gap-2 pointer-events-none">
                <div className="text-[9px] md:text-[10px] font-mono text-pink-500 flex items-center gap-2">
                    <Share2 size={10} />
                    <span>WORKFLOW: {step >= 2 ? 'ACTIVE' : 'IDLE'}</span>
                </div>
            </div>
        </div>
    );
};


export const TechArchitecture: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rag' | 'graph' | 'fine-tune' | 'workflow'>('rag');
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  const methods = {
    rag: {
      title: "Contextual Memory (RAG)",
      desc: "The engine 'reads' your archives before answering to ensure total accuracy.",
      icon: <Database className="w-5 h-5 md:w-6 md:h-6" />,
      details: "Why we use it: Generic AI guesses. Our RAG engine acts like a librarian with photographic memory, citing your specific policy documents, PDFs, and emails for every claim.",
      stats: ["Zero Hallucinations", "100% Verifiable"],
      goal: "UNCOMPROMISING TRUST",
      component: <RagSimulation />
    },
    graph: {
      title: "Causal Reasoning (Graph)",
      desc: "Maps the hidden 'butterfly effects' in your supply chain or data.",
      icon: <Network className="w-5 h-5 md:w-6 md:h-6" />,
      details: "Why we use it: Standard keyword search misses the big picture. Knowledge Graphs understand logic—seeing how a delay in 'Supplier A' mathematically guarantees a risk for 'Project B'.",
      stats: ["Multi-hop Logic", "Risk Forecasting"],
      goal: "DEEP STRATEGIC INSIGHT",
      component: <GraphSimulation />
    },
    'fine-tune': {
      title: "Domain Expertise",
      desc: "We teach the model to speak your specific industry dialect perfectly.",
      icon: <BrainCircuit className="w-5 h-5 md:w-6 md:h-6" />,
      details: "Why we use it: Out-of-the-box models sound generic. We fine-tune the model's actual neural weights on your historical data so it writes code, contracts, or reports exactly like your best senior staff.",
      stats: ["Brand Voice Match", "Technical Fluency"],
      goal: "HUMAN-LEVEL NUANCE",
      component: <FineTuneSimulation />
    },
    workflow: {
      title: "Autonomous Workflows",
      desc: "Orchestrate complex tasks with n8n, LangGraph, and self-healing agents.",
      icon: <Workflow className="w-5 h-5 md:w-6 md:h-6" />,
      details: "Why we use it: Chatbots talk; Agents do. We build resilient, loop-based architectures. If a step fails, the agent self-corrects, retries, or routes to a human—ensuring 99.9% process completion.",
      stats: ["Self-Healing", "API Integrations"],
      goal: "HANDS-OFF EXECUTION",
      component: <WorkflowSimulation />
    }
  };

  const tabs = Object.keys(methods) as (keyof typeof methods)[];

  useEffect(() => {
    if (isPaused) return;

    const duration = 6000; // 6 seconds per slide
    const intervalTime = 20; 
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Switch to next tab
          setActiveTab((current) => {
            const currentIndex = tabs.indexOf(current);
            const nextIndex = (currentIndex + 1) % tabs.length;
            return tabs[nextIndex];
          });
          return 0; // Reset progress
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, tabs]);

  const handleManualSwitch = (key: typeof activeTab) => {
    setActiveTab(key);
    setProgress(0);
  };

  // Reusable Info Content Component
  const InfoCardContent = ({ data }: { data: any }) => (
      <>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
             <h4 className="text-white font-bold text-lg flex items-center gap-2">
                {data.icon}
                {data.title}
             </h4>
             <div className="self-start md:self-auto flex items-center gap-1.5 px-2 py-1 bg-tva-orange/10 border border-tva-orange/30 rounded text-[10px] font-bold text-tva-orange uppercase tracking-widest">
                <Target size={10} /> Goal: {data.goal}
             </div>
         </div>
         <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-slate-600 pl-3">
             {data.details}
         </p>
      </>
  );

  return (
    <section 
        className="py-12 md:py-24 bg-gray-50 border-y border-gray-200 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Background Pattern (Light) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full mb-6 shadow-sm">
                <Code2 size={12} className="text-tva-orange" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">The Engine Room</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
                Why build a <span className="text-tva-orange">Custom Brain?</span>
            </h2>
            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed px-4">
                Off-the-shelf AI isn't enough for enterprise. We architect bespoke cognitive engines designed to solve specific business problems—not just chat.
            </p>
        </div>

        {/* Improved Mobile Layout: Ensure height isn't collapsed */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 lg:items-stretch h-auto">
            
            {/* Visualization Stage (Dark 'Monitor' Look) */}
            {/* ON MOBILE: Order 1 (Top). ON DESKTOP: Order 2 (Right) */}
            <div className="lg:col-span-8 flex flex-col order-1 lg:order-2">
                <div className="bg-slate-900 rounded-t-2xl lg:rounded-2xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col transform transition-transform duration-500 relative min-h-[300px] md:min-h-[500px]">
                    
                    {/* HUD Header */}
                    <div className="bg-slate-950/50 p-3 md:p-4 border-b border-white/5 flex justify-between items-center backdrop-blur-sm shrink-0 z-20 relative">
                         <div className="flex gap-1.5 md:gap-2">
                             <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
                             <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80"></div>
                             <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
                         </div>
                         <div className="font-mono text-[9px] md:text-xs text-slate-500 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
                            SIM_VIEW // {activeTab.toUpperCase()}
                         </div>
                    </div>

                    {/* Simulation Area */}
                    <div className="flex-1 relative flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-90 overflow-hidden">
                        
                         {/* Active Simulation - Z-Index 10 */}
                         <div className="absolute inset-0 z-10">
                            {methods[activeTab].component}
                         </div>

                         {/* DESKTOP OVERLAY (Hidden on Mobile) */}
                         <div className="hidden lg:block absolute bottom-6 left-6 right-6 z-20">
                             <div className="bg-slate-800/90 backdrop-blur-md border border-tva-orange/40 p-6 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
                                 <InfoCardContent data={methods[activeTab]} />
                             </div>
                         </div>
                    </div>
                </div>

                {/* MOBILE INFO CARD (Visible only on Mobile/Tablet, outside the visual box) */}
                <div className="lg:hidden bg-slate-900 border-x border-b border-slate-800 p-5 rounded-b-2xl shadow-xl mb-6 relative z-10">
                     <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                         <InfoCardContent data={methods[activeTab]} />
                     </div>
                </div>
            </div>

            {/* Interactive Selector */}
            {/* ON MOBILE: Order 2 (Bottom). ON DESKTOP: Order 1 (Left) */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center order-2 lg:order-1 h-auto pb-6">
                <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Architecture Modules</span>
                    <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${isPaused ? 'text-gray-400' : 'text-tva-orange'}`}>
                        {isPaused ? <Pause size={10} /> : <Play size={10} />}
                        {isPaused ? "Paused" : "Auto-Cycling"}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {tabs.map((key) => {
                        const data = methods[key];
                        const isActive = activeTab === key;
                        
                        return (
                            <button
                                key={key}
                                onClick={() => handleManualSwitch(key)}
                                className={`w-full text-left p-4 md:p-6 rounded-xl border transition-all duration-300 group relative overflow-hidden active:scale-95 ${
                                    isActive 
                                    ? 'bg-white border-tva-orange shadow-lg ring-1 ring-tva-orange/10 scale-[1.02] z-10' 
                                    : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {isActive && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tva-orange z-10"></div>}
                                
                                {/* Progress Bar for Active Tab */}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 z-10">
                                        <div 
                                            className="h-full bg-tva-orange transition-all duration-75 ease-linear"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between mb-2 md:mb-3 relative z-10">
                                    <span className={`p-1.5 md:p-2 rounded-lg transition-colors ${isActive ? 'bg-tva-orange text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-tva-orange'}`}>
                                        {data.icon}
                                    </span>
                                    {isActive && <Zap size={16} className="text-tva-orange animate-pulse" />}
                                </div>
                                <h3 className={`font-bold text-sm md:text-lg mb-1 relative z-10 ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{data.title}</h3>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed relative z-10 hidden md:block">{data.desc}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};
