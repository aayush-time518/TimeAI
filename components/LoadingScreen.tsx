import React, { useEffect, useState } from 'react';
import { Clock, Terminal, Activity, ShieldCheck } from 'lucide-react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING");
  
  const steps = [
    { pct: 10, text: "ESTABLISHING SECURE UPLINK..." },
    { pct: 30, text: "CALIBRATING TEMPORAL SENSORS..." },
    { pct: 50, text: "PRUNING VARIANCE BRANCHES..." },
    { pct: 75, text: "SYNCING WITH SACRED TIMELINE..." },
    { pct: 90, text: "AUTHORIZING USER AGENT..." },
    { pct: 100, text: "SYSTEM READY." }
  ];

  useEffect(() => {
    let currentStep = 0;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Wait a bit after 100%
          return 100;
        }
        
        // Determine text based on progress
        const nextProgress = prev + 1;
        const step = steps.find(s => s.pct === nextProgress);
        if (step) setStatus(step.text);
        
        return nextProgress;
      });
    }, 25); // Speed of loading

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-tva-dark flex flex-col items-center justify-center cursor-wait">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(234,88,12,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(234,88,12,0.2)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      <div className="relative w-full max-w-md p-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-tva-panel rounded-full"></div>
                <div className="absolute inset-0 border-t-4 border-tva-orange rounded-full animate-spin"></div>
                <Clock className="w-10 h-10 text-tva-cream animate-pulse" />
            </div>
        </div>

        {/* Text Status */}
        <div className="font-mono text-tva-orange text-sm mb-2 flex justify-between uppercase tracking-widest">
            <span>SYS.BOOT_SEQ</span>
            <span>{progress}%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-2 bg-tva-panel border border-tva-orange/30 rounded-sm overflow-hidden mb-4 relative">
            <div 
                className="h-full bg-tva-orange shadow-[0_0_15px_#ea580c] transition-all duration-75 ease-out relative"
                style={{ width: `${progress}%` }}
            >
                <div className="absolute inset-0 bg-white/20 animate-[scan_2s_linear_infinite]"></div>
            </div>
        </div>

        {/* Terminal Log */}
        <div className="h-8 flex items-center gap-2 font-mono text-xs text-tva-cream/50">
            <Terminal size={12} className="text-tva-green" />
            <span className="animate-pulse">{status}</span>
        </div>
      </div>
      
      {/* Footer code */}
      <div className="absolute bottom-8 text-[10px] font-mono text-tva-panel uppercase tracking-[0.5em]">
        Time AI Solutions // v2.4.9
      </div>
    </div>
  );
};