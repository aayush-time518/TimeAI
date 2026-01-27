import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sliders, AlertTriangle, CheckCircle, Activity, Radio } from 'lucide-react';
import { ForecastDataPoint, AnomalyAlert, AnomalySeverity } from '../types';

const generateForecastData = (volatility: number): ForecastDataPoint[] => {
  const base = 5000;
  const data: ForecastDataPoint[] = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  months.forEach((m, i) => {
    const trend = i * 200;
    const random = (Math.random() - 0.5) * volatility * 20;
    const actual = i < 4 ? base + trend + random : 0;
    const forecast = base + trend + random;
    
    data.push({
      month: m,
      actual: i < 4 ? Math.round(actual) : 0,
      forecast: Math.round(forecast)
    });
  });
  return data;
};

export const LiveDemos: React.FC = () => {
  const [volatility, setVolatility] = useState(50);
  const [data, setData] = useState<ForecastDataPoint[]>(generateForecastData(50));
  const [alerts, setAlerts] = useState<AnomalyAlert[]>([]);
  
  useEffect(() => {
    setData(generateForecastData(volatility));
  }, [volatility]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newAlert: AnomalyAlert = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toLocaleTimeString(),
          metric: ['CPU Variance', 'Order Flow', 'Latency', 'Inventory'][Math.floor(Math.random() * 4)],
          value: Math.floor(Math.random() * 100).toString(),
          severity: Math.random() > 0.7 ? AnomalySeverity.HIGH : AnomalySeverity.LOW
        };
        setAlerts(prev => [newAlert, ...prev].slice(0, 4));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-tva-panel border-y border-tva-orange/20 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(245,158,11,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.3)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-mono font-bold text-tva-cream mb-4">
            REAL-TIME <span className="text-tva-orange">TEMPORAL TELEMETRY</span>
          </h2>
          <p className="text-tva-cream/60 max-w-2xl mx-auto font-mono text-sm tracking-widest">
            // SECURE DATALINK ESTABLISHED - LEVEL 5 CLEARANCE
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Demo 1: Forecaster */}
          <div className="bg-tva-dark border-2 border-tva-panel rounded-lg p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 border-b border-tva-cream/10 pb-4">
              <h3 className="text-xl font-mono font-bold text-tva-cream flex items-center gap-2">
                <Activity className="text-tva-orange" /> TEMPORAL FORECAST
              </h3>
              <span className="text-xs bg-tva-orange/10 text-tva-orange border border-tva-orange/30 px-2 py-1 font-mono uppercase">Simulation Active</span>
            </div>

            <div className="h-64 w-full mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2c2520" />
                  <XAxis dataKey="month" stroke="#78716c" fontSize={12} fontFamily="Share Tech Mono" />
                  <YAxis stroke="#78716c" fontSize={12} fontFamily="Share Tech Mono" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1a1816', borderColor: '#f59e0b', color: '#fef3c7', fontFamily: 'Share Tech Mono' }}
                    itemStyle={{ color: '#fef3c7' }}
                  />
                  <Area type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorForecast)" name="Projected Timeline" />
                  <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" name="Actuals" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-tva-panel/50 p-4 rounded border border-tva-cream/5">
              <div className="flex items-center gap-4 mb-2">
                <Sliders size={18} className="text-tva-cream/50" />
                <span className="text-sm text-tva-cream/70 font-mono uppercase">Variance Volatility</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volatility} 
                onChange={(e) => setVolatility(parseInt(e.target.value))}
                className="w-full h-2 bg-tva-dark rounded-lg appearance-none cursor-pointer accent-tva-orange"
              />
              <div className="flex justify-between mt-2 text-xs text-tva-cream/40 font-mono">
                <span>STABLE</span>
                <span>CRITICAL</span>
              </div>
            </div>
          </div>

          {/* Demo 2: Ops Alert Hub */}
          <div className="bg-tva-dark border-2 border-tva-panel rounded-lg p-6 md:p-8 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-6 border-b border-tva-cream/10 pb-4">
              <h3 className="text-xl font-mono font-bold text-tva-cream flex items-center gap-2">
                <Radio className="text-tva-orange animate-pulse" /> NEXUS EVENTS
              </h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tva-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-tva-green"></span>
                </span>
                <span className="text-xs text-tva-green font-mono uppercase">Monitoring</span>
              </div>
            </div>

            <div className="flex-1 bg-black/40 rounded border border-tva-cream/10 overflow-hidden relative font-mono">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tva-orange to-transparent opacity-50 animate-scan"></div>
              
              <div className="p-4 space-y-3">
                {alerts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-tva-cream/30">
                    <CheckCircle className="mb-2 opacity-50" />
                    <p className="text-sm">TIMELINE STABLE...</p>
                  </div>
                ) : (
                  alerts.map((alert) => (
                    <div key={alert.id} className="bg-tva-panel/80 p-3 border-l-2 animate-in slide-in-from-right fade-in duration-300 flex items-center justify-between"
                      style={{ borderLeftColor: alert.severity === AnomalySeverity.HIGH ? '#ea580c' : '#10b981' }}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                           <span className="text-xs text-tva-cream/40">[{alert.timestamp}]</span>
                           <span className="text-sm font-bold text-tva-cream uppercase">{alert.metric}</span>
                        </div>
                        <p className="text-xs text-tva-cream/60 mt-0.5">Value: {alert.value} // Threshold Exceeded</p>
                      </div>
                      {alert.severity === AnomalySeverity.HIGH && (
                        <AlertTriangle size={16} className="text-tva-orange animate-pulse" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <p className="mt-6 text-xs text-tva-cream/40 text-center font-mono uppercase">
              // Automated Pruning Sequence Ready
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};