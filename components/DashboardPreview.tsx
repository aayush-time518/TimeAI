import React from 'react';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: '00:00', load: 30, throughput: 20 },
  { name: '04:00', load: 45, throughput: 35 },
  { name: '08:00', load: 85, throughput: 60 },
  { name: '12:00', load: 60, throughput: 75 },
  { name: '16:00', load: 95, throughput: 90 },
  { name: '20:00', load: 50, throughput: 65 },
  { name: '23:59', load: 40, throughput: 40 },
];

const DashboardPreview: React.FC = () => {
  return (
    <div className="p-8 md:p-12 h-full flex flex-col bg-brand-surface/40 backdrop-blur-3xl relative overflow-hidden">
      {/* Decorative scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 relative z-20">
        {[
          { label: 'Neural Latency', value: '0.42 ms', trend: '↓ 5%', color: 'text-chrono' },
          { label: 'Data Throughput', value: '1.24 GB/s', trend: '↑ 12%', color: 'text-chrono' },
          { label: 'Uptime Protocol', value: '99.99%', trend: 'Operational', color: 'text-accent-emerald' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 sm:p-6 glass-card rounded-xl sm:rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all group"
          >
             <div className="flex items-center justify-between mb-3">
               <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">{stat.label}</span>
               <div className="w-1.5 h-1.5 rounded-full bg-chrono/20 group-hover:bg-chrono transition-colors" />
             </div>
             <div className="text-3xl font-display font-bold text-white tracking-tight">{stat.value}</div>
             <span className={`text-[10px] font-bold ${stat.color} mt-2 block opacity-60`}>{stat.trend}</span>
          </motion.div>
        ))}
      </div>

      <div className="flex-1 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] w-full relative z-20" style={{ position: 'relative', overflow: 'hidden', minWidth: 200 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={300}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5c7cfa" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#5c7cfa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(255,255,255,0.05)" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              fontFamily="Space Grotesk"
              dy={15}
            />
            <YAxis hide domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(10, 10, 10, 0.9)', 
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: '16px',
                fontSize: '11px',
                color: '#fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.8)'
              }}
              cursor={{ stroke: 'rgba(92, 124, 250, 0.2)', strokeWidth: 1 }}
            />
            <Area 
              type="monotone" 
              dataKey="load" 
              stroke="#5c7cfa" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorLoad)" 
              animationDuration={2500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-white/10 font-mono tracking-widest">
        <span>STATUS: SYSTEM_SYNC_NOMINAL</span>
        <span>VER: 0.9.44_BETA</span>
      </div>
    </div>
  );
};

export default DashboardPreview;