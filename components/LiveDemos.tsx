import React, { useState, useEffect } from 'react';
import { 
  FileText, CheckCircle2, AlertCircle, ArrowRight, 
  Database, Mail, Server, Play, RefreshCw, 
  CreditCard, Truck, Users, Pause
} from 'lucide-react';

// Workflow Types
type WorkflowId = 'invoice' | 'support' | 'logistics';

interface Step {
  id: string;
  label: string;
  duration: number; // ms
}

interface WorkflowData {
  id: WorkflowId;
  title: string;
  description: string;
  icon: React.ReactNode;
  input: {
    label: string;
    icon: React.ReactNode;
    preview: string;
  };
  steps: Step[];
  output: {
    label: string;
    icon: React.ReactNode;
    result: React.ReactNode;
  };
  humanTime: string;
  aiTime: string;
}

const WORKFLOWS: Record<WorkflowId, WorkflowData> = {
  invoice: {
    id: 'invoice',
    title: "Accounts Payable Automation",
    description: "Extract, validate, and schedule payments for unstructured PDF invoices.",
    icon: <CreditCard size={18} />,
    input: {
      label: "Vendor Invoice (PDF)",
      icon: <FileText size={32} className="text-gray-700" />,
      preview: "INV-2026-001.pdf"
    },
    steps: [
      { id: 'ocr', label: "Optical Character Recognition", duration: 800 },
      { id: 'extract', label: "Entity Extraction (Vendor, Amount)", duration: 600 },
      { id: 'validate', label: "3-Way PO Matching (SAP)", duration: 1000 },
      { id: 'fraud', label: "Fraud & Anomaly Check", duration: 500 },
    ],
    output: {
      label: "ERP Record Created",
      icon: <Database size={32} className="text-gray-700" />,
      result: (
        <div className="text-sm font-mono bg-gray-50 p-4 rounded-lg border-2 border-gray-300 text-gray-900 text-left font-black shadow-sm">
          <div className="font-black mb-1">STATUS: APPROVED</div>
          <div className="font-semibold">VENDOR: ACME CORP</div>
          <div className="font-semibold">AMT: $12,450.00</div>
          <div className="font-semibold">PO_MATCH: TRUE</div>
          <div className="font-semibold">PAYMENT: +30 DAYS</div>
        </div>
      )
    },
    humanTime: "15 mins",
    aiTime: "2.9 sec"
  },
  support: {
    id: 'support',
    title: "Support Ticket Triage",
    description: "Analyze intent, query backend status, and draft personalized responses.",
    icon: <Users size={18} />,
    input: {
      label: "Inbound Email",
      icon: <Mail size={32} className="text-gray-700" />,
      preview: "Subj: Where is my order?"
    },
    steps: [
      { id: 'intent', label: "Intent Classification", duration: 600 },
      { id: 'query', label: "Query Logistics DB (API)", duration: 900 },
      { id: 'sentiment', label: "Sentiment Analysis", duration: 400 },
      { id: 'draft', label: "Draft Empathetic Response", duration: 1200 },
    ],
    output: {
      label: "Draft Reply Ready",
      icon: <CheckCircle2 size={32} className="text-gray-700" />,
      result: (
        <div className="text-sm bg-gray-50 p-4 rounded-lg border-2 border-gray-300 text-gray-900 text-left font-black shadow-sm">
          "Hi Jane, I checked order #552. It was delayed by weather but is out for delivery today..."
        </div>
      )
    },
    humanTime: "8 mins",
    aiTime: "3.1 sec"
  },
  logistics: {
    id: 'logistics',
    title: "Supply Chain Risk",
    description: "Monitor external signals to predict delay risks and re-route shipments.",
    icon: <Truck size={18} />,
    input: {
      label: "Live Weather Feed",
      icon: <Server size={32} className="text-gray-700" />,
      preview: "Storm Alert: N. Atlantic"
    },
    steps: [
      { id: 'ingest', label: "Ingest Signal Stream", duration: 500 },
      { id: 'impact', label: "Calculate Route Impact", duration: 1000 },
      { id: 'stock', label: "Check Inventory Buffers", duration: 700 },
      { id: 'alert', label: "Trigger Procurement Alert", duration: 400 },
    ],
    output: {
      label: "Mitigation Plan",
      icon: <AlertCircle size={32} className="text-gray-700" />,
      result: (
        <div className="text-sm font-mono bg-gray-50 p-4 rounded-lg border-2 border-gray-300 text-gray-900 text-left font-black shadow-sm">
          <div className="font-black mb-1">RISK: HIGH</div>
          <div className="font-semibold">DELAY: +4 DAYS</div>
          <div className="font-semibold">ACTION: RE-ROUTE AIR</div>
          <div className="font-semibold">COST_DELTA: +$450</div>
        </div>
      )
    },
    humanTime: "4 hours",
    aiTime: "2.6 sec"
  }
};

export const LiveDemos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorkflowId>('invoice');
  const [status, setStatus] = useState<'idle' | 'running' | 'complete'>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const activeWorkflow = WORKFLOWS[activeTab];
  const AUTO_SWITCH_DELAY = 4000;

  const handleRun = () => {
    if (status === 'running') return;
    setStatus('running');
    setCurrentStepIndex(0);
    setProgress(0);
  };

  // --- AUTO-PILOT CONTROLLER ---
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPaused) return;

    if (status === 'idle') {
        // Auto-start the simulation shortly after switching tabs
        timer = setTimeout(() => {
            handleRun();
        }, 800);
    } else if (status === 'complete') {
        // Wait for user to read output, then switch tab
        timer = setTimeout(() => {
            const tabs: WorkflowId[] = ['invoice', 'support', 'logistics'];
            const nextIndex = (tabs.indexOf(activeTab) + 1) % tabs.length;
            setActiveTab(tabs[nextIndex]);
        }, AUTO_SWITCH_DELAY);
    }

    return () => clearTimeout(timer);
  }, [status, isPaused, activeTab]);


  // --- SIMULATION ENGINE ---
  useEffect(() => {
    if (status !== 'running') return;

    let totalDuration = activeWorkflow.steps.reduce((acc, s) => acc + s.duration, 0);
    let elapsed = 0;

    // Progress Bar Animation
    const progressInterval = setInterval(() => {
      elapsed += 50;
      setProgress(Math.min((elapsed / totalDuration) * 100, 100));
    }, 50);

    // Step Sequencer
    let stepTimeouts: ReturnType<typeof setTimeout>[] = [];
    let accumulatedTime = 0;

    activeWorkflow.steps.forEach((step, index) => {
      const t = setTimeout(() => {
        setCurrentStepIndex(index);
      }, accumulatedTime);
      stepTimeouts.push(t);
      accumulatedTime += step.duration;
    });

    const completionTimeout = setTimeout(() => {
      setStatus('complete');
      setCurrentStepIndex(activeWorkflow.steps.length); // All done
    }, totalDuration);

    return () => {
      clearInterval(progressInterval);
      stepTimeouts.forEach(clearTimeout);
      clearTimeout(completionTimeout);
    };
  }, [status, activeTab]); // Depend on status/tab, NOT isPaused (don't interrupt mid-run logic visually)

  // Reset simulation state when tab changes
  useEffect(() => {
    setStatus('idle');
    setCurrentStepIndex(-1);
    setProgress(0);
  }, [activeTab]);

  return (
    <section 
        id="live-demos" 
        className="py-12 md:py-24 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 border-b border-gray-200"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-full mb-8 shadow-md transition-all duration-300 ${isPaused ? 'text-gray-700' : 'text-gray-900'}`}>
            {isPaused ? <Pause size={14} /> : <RefreshCw size={14} className="animate-spin-slow" />}
            <span className="text-xs font-black uppercase tracking-wide">
                {isPaused ? "Demo Paused" : "Live Simulation Active"}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-sans font-black text-gray-900 mb-8 tracking-tight">
             See the <span className="text-gray-900">Work</span> happen.
          </h2>
          <p className="text-lg md:text-xl text-gray-900 font-black leading-relaxed">
             Watch Time AI execute complex enterprise workflows in real-time.
          </p>
        </div>

        {/* Workflow Tabs */}
        <div className="flex justify-center mb-8 md:mb-12">
            <div className="inline-flex bg-white p-1.5 rounded-xl border border-gray-300 overflow-x-auto max-w-full">
                {(Object.values(WORKFLOWS) as WorkflowData[]).map((wf) => (
                    <button
                        key={wf.id}
                        onClick={() => setActiveTab(wf.id)}
                        className={`
                            px-4 py-2 md:px-6 md:py-3 rounded-lg text-xs md:text-sm font-black flex items-center gap-2 transition-all whitespace-nowrap relative
                            ${activeTab === wf.id 
                                ? 'bg-white text-gray-900 shadow-sm ring-1 ring-gray-300 font-black' 
                                : 'text-gray-700 hover:text-gray-900 font-semibold'}
                        `}
                    >
                        {wf.icon} {wf.title}
                        {/* Tab Progress Indicator (only if active) */}
                        {activeTab === wf.id && !isPaused && status === 'running' && (
                            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                                <span className="absolute top-0 left-0 h-full bg-gray-700 transition-all duration-300" style={{ width: `${progress}%` }}></span>
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>

        {/* Simulation Stage */}
        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-300 shadow-xl overflow-hidden flex flex-col md:flex-row min-h-0 md:min-h-[500px]">
            
            {/* LEFT: Input State */}
            <div className="w-full md:w-1/4 bg-white p-6 md:p-8 border-r border-gray-300 flex flex-col items-center justify-center text-center relative z-10">
                 <div className="mb-6 relative">
                     <div className="w-16 h-20 md:w-20 md:h-24 bg-gray-50 border-2 border-gray-300 shadow-md rounded-lg flex items-center justify-center mb-4 mx-auto transition-transform duration-500 hover:scale-105 hover:shadow-lg">
                        {activeWorkflow.input.icon}
                     </div>
                     {status === 'running' && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gray-700 shadow-[0_0_10px_rgba(0,0,0,0.3)] animate-[scanVertical_1.5s_linear_infinite]"></div>
                        </div>
                     )}
                 </div>
                 <h4 className="font-black text-gray-900 text-sm uppercase tracking-wide mb-2">Input</h4>
                 <div className="text-xs text-gray-900 font-mono font-black bg-white px-4 py-2 rounded-lg border-2 border-gray-300 w-full truncate shadow-sm">
                    {activeWorkflow.input.preview}
                 </div>

                 {/* Connector Line */}
                 <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 bg-white border-2 border-gray-400 p-1.5 rounded-full text-gray-900 shadow-md">
                     <ArrowRight size={16} />
                 </div>
            </div>

            {/* MIDDLE: Processing Engine */}
            <div className="flex-1 p-6 md:p-12 flex flex-col relative">
                 <div className="flex justify-between items-center mb-6 md:mb-8">
                     <h3 className="font-black text-lg md:text-xl text-gray-900 flex items-center gap-2">
                        <Server size={22} className="text-gray-900" /> Processing Core
                     </h3>
                     <div className={`flex items-center gap-2 text-[10px] md:text-xs font-black uppercase transition-all duration-300 ${status === 'running' ? 'text-gray-900 opacity-100' : 'text-gray-500 opacity-0'}`}>
                         <span className="w-2.5 h-2.5 rounded-full bg-gray-900 animate-pulse shadow-sm"></span> Processing
                     </div>
                 </div>

                 {/* Steps List */}
                 <div className="space-y-3 md:space-y-4 flex-1">
                     {activeWorkflow.steps.map((step, idx) => {
                         const isCompleted = status === 'complete' || currentStepIndex > idx;
                         const isActive = status === 'running' && currentStepIndex === idx;
                         
                         return (
                             <div 
                                key={step.id}
                                className={`
                                    flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 transition-all duration-300
                                    ${isActive 
                                        ? 'border-gray-500 bg-gray-100 scale-[1.02] shadow-lg' 
                                        : isCompleted 
                                            ? 'border-gray-400 bg-gray-50 opacity-100 shadow-sm' 
                                            : 'border-gray-300 bg-white opacity-70'}
                                `}
                             >
                                 <div className={`
                                     w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shrink-0 border-2
                                     ${isCompleted 
                                         ? 'bg-gray-900 border-gray-900 text-white shadow-md' 
                                         : isActive 
                                             ? 'border-gray-500 border-t-transparent animate-spin bg-gray-100' 
                                             : 'border-gray-300 bg-white'}
                                 `}>
                                     {isCompleted && <CheckCircle2 size={14} strokeWidth={2.5} />}
                                 </div>
                                 <div className="flex-1 font-mono text-xs md:text-sm font-black text-gray-900">
                                     {step.label}
                                 </div>
                                 <div className="text-[10px] md:text-xs text-gray-800 font-mono font-black w-14 md:w-16 text-right">
                                     {step.duration}ms
                                 </div>
                             </div>
                         );
                     })}
                 </div>
                 
                 {/* Processing Progress Bar */}
                 {status === 'running' && (
                     <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
                         <div 
                            className="h-full bg-gray-700 transition-all duration-75 ease-linear"
                            style={{ width: `${progress}%` }}
                         ></div>
                     </div>
                 )}
            </div>

            {/* RIGHT: Output */}
            <div className={`
                w-full md:w-1/4 p-6 md:p-8 border-l border-gray-300 flex flex-col items-center justify-center text-center relative bg-white transition-colors duration-500
                ${status === 'complete' ? 'bg-gray-50' : ''}
            `}>
                 {/* Connector Line */}
                 <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bg-white border-2 border-gray-400 p-1.5 rounded-full text-gray-900 shadow-md">
                     <ArrowRight size={16} />
                 </div>

                 <div className={`transition-all duration-500 transform ${status === 'complete' ? 'scale-100 opacity-100' : 'scale-90 opacity-30 blur-sm'}`}>
                     <div className="mb-6 flex justify-center">
                         {activeWorkflow.output.icon}
                     </div>
                     <h4 className="font-black text-gray-900 text-sm uppercase tracking-wide mb-4">Outcome</h4>
                     {activeWorkflow.output.result}
                     
                     {status === 'complete' && (
                         <div className="mt-8 pt-6 border-t border-gray-300 w-full animate-in fade-in slide-in-from-bottom-2 duration-500">
                             <div className="grid grid-cols-2 gap-4 text-center">
                                 <div>
                                     <div className="text-[10px] uppercase text-gray-600 font-black">Human Time</div>
                                     <div className="text-sm font-mono text-gray-600 line-through decoration-gray-400 font-black">{activeWorkflow.humanTime}</div>
                                 </div>
                                 <div>
                                     <div className="text-[10px] uppercase text-gray-900 font-black">AI Time</div>
                                     <div className="text-xl font-black font-mono text-gray-900">{activeWorkflow.aiTime}</div>
                                 </div>
                             </div>
                         </div>
                     )}
                 </div>

                 {/* Countdown Bar for Auto-Switch */}
                 {status === 'complete' && !isPaused && (
                     <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-200/50">
                         <div 
                            className="h-full bg-gray-400/50 origin-left"
                            style={{ 
                                animation: `progress ${AUTO_SWITCH_DELAY}ms linear forwards`
                            }}
                         ></div>
                         <style>{`
                            @keyframes progress {
                                from { width: 0%; }
                                to { width: 100%; }
                            }
                         `}</style>
                     </div>
                 )}
            </div>

        </div>
      </div>
    </section>
  );
};
