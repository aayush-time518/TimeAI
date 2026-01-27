import React, { useState, useEffect, useRef } from 'react';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';
import { Icons } from '../constants';

const dashboardData = [
  { time: '00:00', load: 30, throughput: 20, latency: 0.3 },
  { time: '04:00', load: 45, throughput: 35, latency: 0.35 },
  { time: '08:00', load: 85, throughput: 60, latency: 0.42 },
  { time: '12:00', load: 60, throughput: 75, latency: 0.38 },
  { time: '16:00', load: 95, throughput: 90, latency: 0.45 },
  { time: '20:00', load: 50, throughput: 65, latency: 0.32 },
  { time: '23:59', load: 40, throughput: 40, latency: 0.28 },
];

const Dashboard: React.FC = () => {
  const [chart1Size, setChart1Size] = useState({ width: 0, height: 240 });
  const [chart2Size, setChart2Size] = useState({ width: 0, height: 240 });
  const chart1Ref = useRef<HTMLDivElement>(null);
  const chart2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSizes = () => {
      if (chart1Ref.current) {
        const rect = chart1Ref.current.getBoundingClientRect();
        // Account for padding and ensure we don't overflow
        const availableWidth = Math.max(200, rect.width - 20); // Subtract 20px for safety
        if (availableWidth > 0 && availableWidth !== chart1Size.width) {
          setChart1Size({ width: availableWidth, height: 240 });
        }
      }
      if (chart2Ref.current) {
        const rect = chart2Ref.current.getBoundingClientRect();
        // Account for padding and ensure we don't overflow
        const availableWidth = Math.max(200, rect.width - 20); // Subtract 20px for safety
        if (availableWidth > 0 && availableWidth !== chart2Size.width) {
          setChart2Size({ width: availableWidth, height: 240 });
        }
      }
    };
    
    // Multiple attempts to ensure dimensions are measured
    const timeout1 = setTimeout(updateSizes, 50);
    const timeout2 = setTimeout(updateSizes, 200);
    const timeout3 = setTimeout(updateSizes, 500);
    
    window.addEventListener('resize', updateSizes);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      window.removeEventListener('resize', updateSizes);
    };
  }, [chart1Size.width, chart2Size.width]);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 bg-brand-surface/40 backdrop-blur-3xl relative" style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Decorative scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
      
      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 relative z-20">
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-display font-black uppercase tracking-tight mb-1">System Dashboard</h3>
          <p className="text-xs text-white/30 font-light">Real-time system metrics and performance monitoring</p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-2 px-3 py-1.5 bg-chrono/10 rounded-full border border-chrono/20">
          <div className="w-1.5 h-1.5 rounded-full bg-chrono animate-pulse" />
          <span className="text-[9px] font-bold text-chrono uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-20">
        {[
          { label: 'Neural Latency', value: '0.42 ms', trend: '↓ 5%', color: 'text-chrono', icon: <Icons.Activity /> },
          { label: 'Data Throughput', value: '1.24 GB/s', trend: '↑ 12%', color: 'text-chrono', icon: <Icons.TrendingUp /> },
          { label: 'Uptime Protocol', value: '99.99%', trend: 'Operational', color: 'text-accent-emerald', icon: <Icons.Database /> },
          { label: 'Active Nodes', value: '1,247', trend: '↑ 3', color: 'text-chrono', icon: <Icons.Zap /> },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 sm:p-5 glass-card rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all group"
          >
             <div className="flex items-center justify-between mb-3">
               <div className="w-8 h-8 rounded-lg bg-chrono/10 flex items-center justify-center text-chrono group-hover:bg-chrono group-hover:text-white transition-all">
                 {stat.icon}
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-chrono/20 group-hover:bg-chrono transition-colors" />
             </div>
             <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mb-1">{stat.value}</div>
             <div className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">{stat.label}</div>
             <span className={`text-[10px] font-bold ${stat.color} block opacity-60`}>{stat.trend}</span>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-20" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
        {/* System Load Chart */}
        <div className="glass-card p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.01]" style={{ minHeight: '300px', position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '100%' }}>
          <div className="mb-3">
            <h4 className="text-xs sm:text-sm font-bold text-white mb-1">System Load</h4>
            <p className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-wider">24h Performance</p>
          </div>
          <div 
            ref={chart1Ref}
            style={{ width: '100%', maxWidth: '100%', height: '240px', minWidth: 200, minHeight: '240px', position: 'relative', display: 'block' }}
          >
            {chart1Size.width > 0 && (
              <AreaChart 
                width={chart1Size.width} 
                height={chart1Size.height} 
                data={dashboardData} 
                margin={{ top: 5, right: 5, left: 5, bottom: 15 }}
              >
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5c7cfa" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#5c7cfa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.4)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  tick={{ fill: 'rgba(255,255,255,0.4)' }}
                />
                <Tooltip 
                  cursor={{ stroke: '#5c7cfa', strokeWidth: 2, strokeDasharray: '5 5' }}
                  contentStyle={{ 
                    background: 'rgba(20, 20, 20, 0.98)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)', 
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#fff',
                    padding: '8px 12px',
                    zIndex: 1000,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`${value}%`, 'System Load']}
                  labelFormatter={(label: string) => `Time: ${label}`}
                />
                <Area 
                  type="monotone" 
                  dataKey="load" 
                  stroke="#5c7cfa" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorLoad)"
                  animationDuration={1000}
                />
              </AreaChart>
            )}
          </div>
        </div>

        {/* Latency Chart */}
        <div className="glass-card p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.01]" style={{ minHeight: '300px', position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '100%' }}>
          <div className="mb-3">
            <h4 className="text-xs sm:text-sm font-bold text-white mb-1">Response Latency</h4>
            <p className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-wider">Milliseconds</p>
          </div>
          <div 
            ref={chart2Ref}
            style={{ width: '100%', maxWidth: '100%', height: '240px', minWidth: 200, minHeight: '240px', position: 'relative', display: 'block' }}
          >
            {chart2Size.width > 0 && (
              <LineChart 
                width={chart2Size.width} 
                height={chart2Size.height} 
                data={dashboardData} 
                margin={{ top: 5, right: 5, left: 5, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="time" 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.4)' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.2)" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 0.5]}
                  tick={{ fill: 'rgba(255,255,255,0.4)' }}
                />
                <Tooltip 
                  cursor={{ stroke: '#5c7cfa', strokeWidth: 2, strokeDasharray: '5 5' }}
                  contentStyle={{ 
                    background: 'rgba(20, 20, 20, 0.98)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)', 
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#fff',
                    padding: '8px 12px',
                    zIndex: 1000,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }}
                  labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => [`${value}ms`, 'Latency']}
                  labelFormatter={(label: string) => `Time: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="latency" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1000}
                />
              </LineChart>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer Status */}
      <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[9px] sm:text-[10px] text-white/10 font-mono tracking-widest relative z-20">
        <span>STATUS: SYSTEM_SYNC_NOMINAL</span>
        <span>VER: 0.9.44_BETA</span>
        <span>LAST_UPDATE: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default Dashboard;

