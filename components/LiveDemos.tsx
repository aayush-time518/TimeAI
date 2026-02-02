import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Zap, ArrowRight, ShieldCheck, AlertOctagon } from 'lucide-react';

const generateScenarioData = (mode: 'reactive' | 'predictive', frame: number) => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    // Base sine wave
    const base = Math.sin(i * 0.5 + frame * 0.05) * 20 + 50;
    
    // Add "Chaos" for Reactive mode
    let val = base;
    if (mode === 'reactive') {
        if (i > 15) val += (Math.random() - 0.5) * 40; // High volatility in future
    } else {
        // Smooth correction for Predictive mode
        if (i > 15) val = base; // Stable
    }
    
    data.push({
      time: i,
      value: Math.max(0, val),
      threshold: 80
    });
  }
  return data;
};

export const LiveDemos: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const [activeMode, setActiveMode] = useState<'reactive' | 'predictive'>('predictive');

  useEffect(() => {
    const interval = setInterval(() => {
        setFrame(f => f + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const data = generateScenarioData(activeMode, frame);
  const isVolatile = activeMode === 'reactive';

  return (
    <section className="py-32 bg-tva-dark relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
                <h2 className="text-4xl font-sans font-bold text-gray-900 mb-6">
                    See the <span className="text-tva-orange">Difference</span>
                </h2>
                <p className="text-xl text-gray-500 font-light">
                    Traditional systems react to problems after they happen. Time AI predicts and neutralizes them before they impact your bottom line.
                </p>
            </div>
            
            {/* Mode Switcher */}
            <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                <button 
                    onClick={() => setActiveMode('reactive')}
                    className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeMode === 'reactive' ? 'bg-red-50 text-red-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <AlertOctagon size={16} /> Legacy (Reactive)
                </button>
                <button 
                    onClick={() => setActiveMode('predictive')}
                    className={`px-6 py-3 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeMode === 'predictive' ? 'bg-blue-50 text-tva-orange shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                    <ShieldCheck size={16} /> Time AI (Predictive)
                </button>
            </div>
        </div>

        {/* Dashboard Visualization */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${isVolatile ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {isVolatile ? 'Unstable System Detected' : 'Optimization Active'}
                    </span>
                </div>
                <div className="font-mono text-xs text-gray-400">LIVE FEED // {new Date().toLocaleTimeString()}</div>
            </div>

            <div className="p-8 h-96 relative">
                 {/* Overlay Message for Predictive Mode */}
                 {!isVolatile && (
                     <div className="absolute top-1/4 right-1/4 bg-white/90 backdrop-blur border border-blue-100 p-4 rounded-xl shadow-lg z-20 animate-in fade-in slide-in-from-bottom-4">
                         <div className="flex items-center gap-2 text-tva-orange font-bold text-xs mb-1">
                             <Zap size={14} fill="currentColor" /> AUTOMATION
                         </div>
                         <div className="text-sm font-bold text-gray-800">Variance Neutralized</div>
                         <div className="text-xs text-gray-500">Inventory rebalanced automatically.</div>
                     </div>
                 )}

                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={isVolatile ? "#ef4444" : "#2563eb"} stopOpacity={0.2}/>
                                <stop offset="95%" stopColor={isVolatile ? "#ef4444" : "#2563eb"} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis hide />
                        <YAxis hide domain={[0, 100]} />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={isVolatile ? "#ef4444" : "#2563eb"} 
                            strokeWidth={3}
                            fill="url(#colorVal)" 
                            isAnimationActive={false}
                        />
                        {/* Threshold Line */}
                        <Area 
                            type="monotone" 
                            dataKey="threshold" 
                            stroke="transparent" 
                            fill="none" 
                        />
                    </AreaChart>
                 </ResponsiveContainer>
            </div>
            
            {/* Footer Stats */}
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-t border-gray-100 bg-white">
                <div className="p-6 text-center">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">Forecast Accuracy</div>
                    <div className={`text-2xl font-bold ${isVolatile ? 'text-gray-400' : 'text-tva-orange'}`}>
                        {isVolatile ? '62%' : '98.4%'}
                    </div>
                </div>
                <div className="p-6 text-center">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">Risk Level</div>
                    <div className={`text-2xl font-bold ${isVolatile ? 'text-red-500' : 'text-green-500'}`}>
                        {isVolatile ? 'CRITICAL' : 'LOW'}
                    </div>
                </div>
                <div className="p-6 text-center">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">Cost Savings</div>
                    <div className="text-2xl font-bold text-gray-800">
                        {isVolatile ? '$0.00' : '$142k'}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};