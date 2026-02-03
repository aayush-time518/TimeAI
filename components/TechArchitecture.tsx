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
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-900/50 p-4">
            {/* Ambient Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="relative w-full max-w-md h-64 flex items-center justify-between px-2 md:px-8">
                
                {/* 1. DOCUMENT SOURCE */}
                <div className={`relative transition-all duration-700 ${phase >= 2 ? 'opacity-20 scale-75 blur-sm' : 'opacity-100 scale-100'}`}>
                    <div className="w-12 h-16 md:w-16 md:h-20 bg-slate-800 border border-slate-600 rounded-lg flex items-center justify-center relative overflow-hidden shadow-2xl">
                        <FileText className="text-slate-400 w-6 h-6 md:w-8 md:h-8" />
                        {phase === 1 && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-[scanVertical_1.2s_linear_forwards]"></div>
                        )}
                        {/* Particles emitting when scanned */}
                        {phase === 1 && (
                            <div className="absolute inset-0 flex flex-col justify-center items-center">
                                {Array.from({length: 5}).map((_,i) => (
                                    <div key={i} className="w-full h-px bg-cyan-500/50 animate-[ping_0.5s_ease-out_infinite]" style={{ animationDelay: `${i*0.1}s` }}></div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="text-[8px] md:text-[10px] font-mono text-slate-400 text-center mt-2 font-bold tracking-widest">RAW_DATA</div>
                </div>

                {/* CONNECTION LINE 1 */}
                <div className="flex-1 h-px bg-slate-700 relative mx-1 md:mx-4">
                     <div className={`absolute inset-0 bg-cyan-500 h-full transition-all duration-1000 ${phase >= 1 ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                </div>

                {/* 2. VECTOR STORE (Central Hub) */}
                <div className="relative z-10 group">
                    <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full border-2 flex items-center justify-center bg-slate-900 transition-colors duration-500 ${phase >= 2 ? 'border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'border-slate-700'}`}>
                        <Database className={`w-8 h-8 md:w-10 md:h-10 transition-colors duration-300 ${phase >= 2 ? 'text-cyan-400' : 'text-slate-600'}`} />
                        
                        {/* Orbiting Particles */}
                        {phase >= 2 && (
                            <>
                                <div className="absolute inset-[-10px] border border-cyan-500/30 rounded-full animate-[spin_4s_linear_infinite]"></div>
                                <div className="absolute inset-[-18px] border border-cyan-500/10 rounded-full animate-[spin_8s_linear_infinite_reverse] border-dashed"></div>
                            </>
                        )}
                    </div>
                    
                    {/* Query Input Visualization */}
                    <div className={`absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 bg-slate-800 text-cyan-400 text-[8px] md:text-[10px] px-2 py-1 md:px-3 rounded border border-cyan-900 whitespace-nowrap transition-all duration-500 ${phase === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <Search size={10} className="inline mr-1" />
                        "Revenue Policy?"
                    </div>
                </div>

                {/* CONNECTION LINE 2 */}
                <div className="flex-1 h-px bg-slate-700 relative mx-1 md:mx-4">
                     <div className={`absolute inset-0 bg-green-500 h-full transition-all duration-1000 ${phase >= 4 ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                </div>

                {/* 3. VERIFIED ANSWER */}
                <div className={`relative transition-all duration-500 ${phase === 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                    <div className="w-16 h-20 md:w-20 md:h-24 bg-slate-900 border border-green-500/50 rounded-lg p-2 shadow-[0_0_20px_rgba(34,197,94,0.2)] flex flex-col gap-2">
                        <div className="h-1.5 w-1/3 bg-green-500 rounded-full"></div>
                        <div className="h-1 w-full bg-slate-700 rounded-full"></div>
                        <div className="h-1 w-full bg-slate-700 rounded-full"></div>
                        <div className="h-1 w-2/3 bg-slate-700 rounded-full"></div>
                        
                        <div className="mt-auto flex items-center gap-1 text-[8px] text-green-400 font-bold uppercase">
                            <CheckCircle2 size={8} /> Verified
                        </div>
                    </div>
                    <div className="text-[8px] md:text-[10px] font-mono text-green-400 text-center mt-2 font-bold tracking-widest">INSIGHT</div>
                </div>

            </div>
            
            {/* Status Bar */}
            <div className="absolute bottom-4 md:bottom-6 flex gap-2 md:gap-8 overflow-x-auto max-w-full px-4">
                {['INGEST', 'VECTORIZE', 'RETRIEVE', 'GENERATE'].map((label, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                        <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-300 ${
                            (i === 0 && phase >= 0) || (i === 1 && phase >= 1) || (i === 2 && phase >= 3) || (i === 3 && phase >= 4)
                            ? 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]' 
                            : 'bg-slate-800'
                        }`}></div>
                        <span className={`text-[8px] font-bold tracking-widest ${
                             (i === 0 && phase >= 0) || (i === 1 && phase >= 1) || (i === 2 && phase >= 3) || (i === 3 && phase >= 4)
                             ? 'text-cyan-400' 
                             : 'text-slate-700'
                        }`}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const GraphSimulation: React.FC = () => {
    // 5 Node Supply Chain
    const [alertStage, setAlertStage] = useState(0); // 0: Normal, 1: Trigger, 2: Propagate, 3: Impact

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

    // Helper for SVG Lines
    const Line = ({ start, end, active, color }: any) => (
        <line 
            x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} 
            stroke={color} 
            strokeWidth="2" 
            strokeDasharray="4 4"
            className={active ? "animate-[dash_1s_linear_infinite]" : "opacity-20"}
        />
    );

    // Node Positions (Scaled for viewBox 0 0 400 250)
    const nodes = {
        supplier: [50, 50],
        factory: [150, 100],
        logistics: [150, 200], // Alternate source
        dc: [250, 100],
        store: [350, 100]
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-900/50 p-4">
             {/* Map Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

             <div className="relative w-full aspect-[16/9] max-w-lg mt-8">
                 <svg className="w-full h-full overflow-visible" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid meet">
                     <defs>
                         <marker id="arrow" markerWidth="10" markerHeight="10" refX="20" refY="3" orient="auto" markerUnits="strokeWidth">
                             <path d="M0,0 L0,6 L9,3 z" fill="#475569" />
                         </marker>
                     </defs>

                     {/* LINES */}
                     <Line start={nodes.supplier} end={nodes.factory} active={true} color={alertStage >= 1 ? '#ef4444' : '#3b82f6'} />
                     <Line start={nodes.logistics} end={nodes.factory} active={true} color="#3b82f6" />
                     <Line start={nodes.factory} end={nodes.dc} active={true} color={alertStage >= 2 ? '#f59e0b' : '#3b82f6'} />
                     <Line start={nodes.dc} end={nodes.store} active={true} color={alertStage >= 3 ? '#f59e0b' : '#3b82f6'} />
                 </svg>

                 {/* NODES - Using absolute positioning based on percentages relative to container for HTML elements */}
                 {/* Conversion logic: x/400 * 100%, y/250 * 100% */}
                 
                 {/* Supplier (Trigger) */}
                 <div className="absolute" style={{ left: '12.5%', top: '20%', transform: 'translate(-50%, -50%)' }}>
                     <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center bg-slate-900 z-10 relative transition-all duration-300 ${alertStage >= 1 ? 'border-red-500 bg-red-500/10' : 'border-slate-600'}`}>
                         <Zap className={`w-4 h-4 md:w-5 md:h-5 ${alertStage >= 1 ? 'text-red-500 animate-pulse' : 'text-slate-500'}`} />
                         {alertStage >= 1 && <div className="absolute inset-[-10px] bg-red-500/20 rounded-full animate-ping"></div>}
                     </div>
                     <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] font-bold text-slate-400 uppercase whitespace-nowrap">Tier 2 Supp</span>
                 </div>

                 {/* Logistics */}
                 <div className="absolute" style={{ left: '37.5%', top: '80%', transform: 'translate(-50%, -50%)' }}>
                     <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-slate-600 flex items-center justify-center bg-slate-900 z-10 relative">
                         <Workflow className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                     </div>
                 </div>

                 {/* Factory */}
                 <div className="absolute" style={{ left: '37.5%', top: '40%', transform: 'translate(-50%, -50%)' }}>
                     <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-2 flex items-center justify-center bg-slate-900 z-10 relative transition-all duration-300 ${alertStage >= 2 ? 'border-amber-500' : 'border-slate-500'}`}>
                         <Cpu className={`w-4 h-4 md:w-6 md:h-6 ${alertStage >= 2 ? 'text-amber-500' : 'text-slate-400'}`} />
                     </div>
                     {alertStage === 2 && (
                         <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-amber-900/80 border border-amber-500/50 px-2 py-1 rounded text-[8px] text-amber-500 font-mono whitespace-nowrap animate-in slide-in-from-top-2">
                             ⚠ DELAY: +48h
                         </div>
                     )}
                 </div>

                 {/* DC */}
                 <div className="absolute" style={{ left: '62.5%', top: '40%', transform: 'translate(-50%, -50%)' }}>
                     <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center bg-slate-900 z-10 relative transition-all duration-300 ${alertStage >= 3 ? 'border-amber-500' : 'border-slate-600'}`}>
                         <Server className={`w-3 h-3 md:w-4 md:h-4 ${alertStage >= 3 ? 'text-amber-500' : 'text-slate-500'}`} />
                     </div>
                 </div>

                 {/* Store */}
                 <div className="absolute" style={{ left: '87.5%', top: '40%', transform: 'translate(-50%, -50%)' }}>
                     <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full border-2 flex items-center justify-center bg-slate-900 z-10 relative transition-all duration-300 ${alertStage >= 3 ? 'border-red-500' : 'border-slate-600'}`}>
                         <Target className={`w-3 h-3 md:w-4 md:h-4 ${alertStage >= 3 ? 'text-red-500' : 'text-slate-500'}`} />
                     </div>
                      {alertStage === 3 && (
                         <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-900/80 border border-red-500/50 px-2 py-1 rounded text-[8px] text-red-500 font-mono whitespace-nowrap animate-pulse">
                             STOCK CRITICAL
                         </div>
                     )}
                 </div>

             </div>

             {/* HUD Overlay */}
             <div className="absolute top-4 left-4 flex flex-col gap-1">
                 <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${alertStage > 0 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                     <span className="text-[8px] md:text-[10px] font-mono text-slate-400 uppercase">
                         NETWORK_STATUS: {alertStage === 0 ? 'OPTIMAL' : 'CASCADING_FAILURE'}
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

    // Generate random nodes
    const nodes = Array.from({length: 12}).map((_, i) => ({
        x: 20 + Math.random() * 60,
        y: 10 + Math.random() * 80,
        id: i
    }));

    return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-slate-950 p-4">
            {/* Split Background */}
            <div className="absolute inset-0 flex">
                <div className="w-full h-full bg-slate-900/50 border-r border-slate-800"></div>
                <div className="w-full h-full bg-slate-900/50"></div>
            </div>

            {/* Neural Net Layer */}
            <div className="absolute inset-0 p-8 md:p-12">
                <svg className="w-full h-full">
                    {/* Connections */}
                    {nodes.map((node, i) => (
                         nodes.slice(i+1, i+4).map((target, j) => {
                             const isFineTuned = (scanPos > (node.x)); // Simple toggle logic based on scan
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
                    
                    {/* Nodes */}
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

            {/* Scanning Bar */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-tva-orange to-transparent shadow-[0_0_20px_#f97316] z-20"
                style={{ left: `${scanPos}%` }}
            >
                <div className="absolute top-1/2 -left-3 bg-tva-orange text-black text-[8px] font-bold px-1 rounded rotate-90">
                    CALIBRATING
                </div>
            </div>

            {/* Overlay Text Labels */}
            <div className="absolute top-4 left-4">
                <div className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Base Model (Generic)</div>
                <div className="text-[10px] md:text-xs font-mono text-slate-600">"I cannot provide specific..."</div>
            </div>
            
            <div className="absolute bottom-4 right-4 text-right">
                <div className="text-[8px] md:text-[10px] font-bold text-tva-orange uppercase tracking-widest mb-1">Fine-Tuned (Expert)</div>
                <div className="text-[10px] md:text-xs font-mono text-orange-200">"The Q3 variance is -4.2%..."</div>
            </div>
        </div>
    );
};

const WorkflowSimulation: React.FC = () => {
    // Logic Gate Visualization
    const [step, setStep] = useState(0); // 0: Start, 1: Router, 2: Action, 3: Success

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
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-900/50 p-4">
            {/* Grid */}
            <div className="absolute inset-0 bg-[size:20px_20px] bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"></div>

            <div className="relative w-full max-w-lg h-64 flex items-center justify-center">
                {/* SVG Paths */}
                <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                     {/* Path 1: Start -> Router */}
                     <line x1="15%" y1="50%" x2="40%" y2="50%" stroke={step >= 1 ? "#ec4899" : "#334155"} strokeWidth="3" className="transition-colors duration-500" />
                     {/* Path 2: Router -> Top (API) */}
                     <path d="M 40% 50% C 50% 50%, 50% 30%, 60% 30% H 75%" fill="none" stroke={step >= 2 ? "#ec4899" : "#334155"} strokeWidth="3" className="transition-colors duration-500" />
                     {/* Path 3: Router -> Bottom (Email) */}
                     <path d="M 40% 50% C 50% 50%, 50% 70%, 60% 70% H 75%" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                </svg>

                {/* Node 1: Webhook Trigger */}
                <div className="absolute left-[15%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-lg border-2 flex items-center justify-center transition-all ${step >= 0 ? 'border-pink-500 shadow-[0_0_15px_#ec4899]' : 'border-slate-600'}`}>
                        <Zap size={20} className={step >= 0 ? "text-pink-500" : "text-slate-500"} />
                    </div>
                    <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900 px-1">Webhook</span>
                </div>

                {/* Node 2: Router (LangGraph) */}
                <div className="absolute left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 md:w-14 md:h-14 bg-slate-800 rounded-full border-2 flex items-center justify-center transition-all ${step >= 1 ? 'border-pink-500 bg-pink-500/10' : 'border-slate-600'}`}>
                        <GitBranch size={24} className={step >= 1 ? "text-pink-500" : "text-slate-500"} />
                        {step === 1 && <div className="absolute inset-[-6px] border border-pink-500 rounded-full animate-ping opacity-50"></div>}
                    </div>
                    <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900 px-1">Router Logic</span>
                </div>

                {/* Node 3: Action (n8n API) */}
                <div className="absolute left-[75%] top-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-lg border-2 flex items-center justify-center transition-all ${step >= 2 ? 'border-pink-500 bg-pink-500/10' : 'border-slate-600'}`}>
                        <Settings size={20} className={step >= 2 ? "text-pink-500 animate-spin-slow" : "text-slate-500"} />
                    </div>
                    {step === 2 && (
                        <div className="absolute -right-16 top-0 bg-slate-800 border border-pink-500/50 text-[8px] text-pink-400 p-2 rounded font-mono">
                            POST /api/v1/update<br/>Status: 200 OK
                        </div>
                    )}
                    <span className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900 px-1">Update CRM</span>
                </div>

                 {/* Node 4: Alternate (Dimmed) */}
                 <div className="absolute left-[75%] top-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 opacity-50">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-800 rounded-lg border border-slate-600 flex items-center justify-center">
                        <MessageSquare size={14} className="text-slate-500" />
                    </div>
                    <span className="text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-1">Slack Alert</span>
                </div>
            </div>

            {/* Floating Label */}
            <div className="absolute bottom-4 left-4">
                <div className="text-[8px] md:text-[10px] font-mono text-pink-500 flex items-center gap-2">
                    <Share2 size={12} />
                    <span>ORCHESTRATION: {step >= 2 ? 'EXECUTING' : 'PENDING'}</span>
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

  return (
    <section 
        className="py-12 md:py-24 bg-gray-50 border-y border-gray-200 relative overflow-hidden"
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
            <p className="text-base md:text-lg text-gray-500 font-light leading-relaxed">
                Off-the-shelf AI isn't enough for enterprise. We architect bespoke cognitive engines designed to solve specific business problems—not just chat.
            </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch h-full">
            
            {/* Interactive Selector */}
            <div className="lg:col-span-4 flex flex-col gap-3 h-full justify-center order-2 lg:order-1">
                <div className="flex items-center justify-between px-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Architecture Modules</span>
                    <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${isPaused ? 'text-gray-400' : 'text-tva-orange'}`}>
                        {isPaused ? <Pause size={10} /> : <Play size={10} />}
                        {isPaused ? "Paused" : "Auto-Cycling"}
                    </div>
                </div>

                {tabs.map((key) => {
                    const data = methods[key];
                    const isActive = activeTab === key;
                    
                    return (
                        <button
                            key={key}
                            onClick={() => handleManualSwitch(key)}
                            className={`w-full text-left p-4 md:p-6 rounded-xl border transition-all duration-300 group relative overflow-hidden ${
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
                            <h3 className={`font-bold text-base md:text-lg mb-1 relative z-10 ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{data.title}</h3>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed relative z-10 hidden md:block">{data.desc}</p>
                        </button>
                    );
                })}
            </div>

            {/* Visualization Stage (Dark 'Monitor' Look) */}
            <div className="lg:col-span-8 flex flex-col h-full min-h-[400px] lg:min-h-[500px] order-1 lg:order-2">
                <div className="flex-1 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 flex flex-col transform transition-transform duration-500 relative">
                    
                    {/* HUD Header */}
                    <div className="bg-slate-950/50 p-4 border-b border-white/5 flex justify-between items-center backdrop-blur-sm shrink-0 z-20 relative">
                         <div className="flex gap-2">
                             <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                             <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                         </div>
                         <div className="font-mono text-[10px] md:text-xs text-slate-500 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            SIM_VIEW // {activeTab.toUpperCase()}
                         </div>
                    </div>

                    {/* Simulation Area */}
                    <div className="flex-1 relative flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-90 overflow-hidden">
                        
                         {/* Active Simulation */}
                         <div className="relative z-10 w-full h-full flex items-center justify-center">
                             {methods[activeTab].component}
                         </div>

                         {/* Info Overlay (Bottom) */}
                         <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-20">
                             <div className="bg-slate-800/80 backdrop-blur-md border border-tva-orange/40 p-4 md:p-6 rounded-xl shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
                                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                                     <h4 className="text-white font-bold text-base md:text-lg flex items-center gap-2">
                                        {methods[activeTab].icon}
                                        {methods[activeTab].title}
                                     </h4>
                                     <div className="self-start md:self-auto flex items-center gap-1.5 px-2 py-1 bg-tva-orange/10 border border-tva-orange/30 rounded text-[8px] md:text-[10px] font-bold text-tva-orange uppercase tracking-widest">
                                        <Target size={10} /> Goal: {methods[activeTab].goal}
                                     </div>
                                 </div>
                                 <p className="text-slate-400 text-xs md:text-sm leading-relaxed border-l-2 border-slate-600 pl-3">
                                     {methods[activeTab].details}
                                 </p>
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
