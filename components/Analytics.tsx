import React, { useEffect, useState, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { Icons } from '../constants';

const analyticsData = [
  { category: 'AI Processing', value: 45, color: '#5c7cfa' },
  { category: 'Data Sync', value: 28, color: '#10b981' },
  { category: 'Neural Networks', value: 18, color: '#f59e0b' },
  { category: 'API Calls', value: 9, color: '#ec4899' },
];

// Map for shortening legend labels
const labelMap: Record<string, string> = {
  'AI Processing': 'AI Processing',
  'Data Sync': 'Data Sync',
  'Neural Networks': 'Neural Net',
  'API Calls': 'API Calls',
};

const performanceData = [
  { metric: 'Q1', performance: 78, efficiency: 82 },
  { metric: 'Q2', performance: 85, efficiency: 88 },
  { metric: 'Q3', performance: 92, efficiency: 90 },
  { metric: 'Q4', performance: 95, efficiency: 94 },
];

const Analytics: React.FC = () => {
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
    <div className="p-6 sm:p-8 md:p-12 h-full flex flex-col bg-brand-surface/40 backdrop-blur-3xl relative overflow-y-auto" style={{ width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Decorative scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]" />
      
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 relative z-20">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-black uppercase tracking-tight mb-2">Performance Analytics</h3>
          <p className="text-xs sm:text-sm text-white/30 font-light">Deep insights and trend analysis</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-3">
          <select className="px-3 py-1.5 bg-brand-surface/50 border border-white/5 rounded-lg text-[10px] text-white/60 focus:outline-none focus:border-chrono">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last Quarter</option>
          </select>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-20">
        {[
          { label: 'Total Operations', value: '2.4M', change: '+18.2%', color: 'text-chrono' },
          { label: 'Avg Response Time', value: '142ms', change: '-12%', color: 'text-accent-emerald' },
          { label: 'Success Rate', value: '99.7%', change: '+0.3%', color: 'text-chrono' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 sm:p-6 glass-card rounded-xl sm:rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all"
          >
             <div className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em] mb-2">{stat.label}</div>
             <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight mb-1">{stat.value}</div>
             <span className={`text-[10px] font-bold ${stat.color} block opacity-60`}>{stat.change}</span>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-20" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
        {/* Performance Trend */}
        <div className="glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 min-h-[280px]" style={{ position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '100%' }}>
          <div className="mb-3">
            <h4 className="text-xs sm:text-sm font-bold text-white/80 mb-1">Quarterly Performance</h4>
            <p className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-wider">Trend Analysis</p>
          </div>
          <div 
            ref={chart1Ref}
            style={{ width: '100%', maxWidth: '100%', height: '240px', minWidth: 200, minHeight: '240px', position: 'relative', display: 'block' }}
          >
            {chart1Size.width > 0 && (
              <BarChart 
                width={chart1Size.width} 
                height={chart1Size.height} 
                data={performanceData} 
                margin={{ top: 5, right: 5, left: 5, bottom: 15 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="metric" 
                  stroke="rgba(255,255,255,0.05)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: 'rgba(92, 124, 250, 0.08)', stroke: '#5c7cfa', strokeWidth: 1 }}
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
                  labelStyle={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px', fontSize: '10px' }}
                  itemStyle={{ color: '#fff', fontSize: '10px' }}
                  formatter={(value: number, name: string) => {
                    const label = name === 'performance' ? 'Performance' : name === 'efficiency' ? 'Efficiency' : name;
                    return [`${value}%`, label];
                  }}
                  labelFormatter={(label: string) => `Quarter: ${label}`}
                />
                <Bar dataKey="performance" fill="#5c7cfa" radius={[4, 4, 0, 0]} />
                <Bar dataKey="efficiency" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </div>
        </div>

        {/* Resource Distribution */}
        <div className="glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/5 min-h-[300px]" style={{ position: 'relative', overflow: 'hidden', width: '100%', maxWidth: '100%' }}>
          <div className="mb-3">
            <h4 className="text-xs sm:text-sm font-bold text-white/80 mb-1">Resource Distribution</h4>
            <p className="text-[9px] sm:text-[10px] text-white/30 uppercase tracking-wider">By Category</p>
          </div>
          <div 
            ref={chart2Ref}
            style={{ width: '100%', maxWidth: '100%', height: '240px', minWidth: 200, minHeight: '240px', position: 'relative', display: 'block' }}
          >
            {chart2Size.width > 0 && (
              <PieChart width={chart2Size.width} height={chart2Size.height}>
                <Pie
                  data={analyticsData}
                  cx={chart2Size.width / 2}
                  cy={chart2Size.height / 2 - 15}
                  labelLine={false}
                  label={false}
                  outerRadius={Math.min(chart2Size.width / 5.5, chart2Size.height / 5.5, 55)}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
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
                  formatter={(value: number, name: string, props: any) => {
                    const category = props.payload.category || name;
                    return [`${value}%`, category];
                  }}
                  labelFormatter={(label: string) => label || 'Category'}
                />
              </PieChart>
            )}
          </div>
          {/* Custom Legend */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2 pt-2 border-t border-white/5">
            {analyticsData.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-[9px] text-white/60 font-medium">
                  {labelMap[entry.category] || entry.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 relative z-20">
        {[
          { label: 'Peak Load', value: '98%', time: '16:00' },
          { label: 'Min Latency', value: '0.28ms', time: '23:59' },
          { label: 'Avg Throughput', value: '1.1 GB/s', time: '24h' },
          { label: 'Error Rate', value: '0.03%', time: '24h' },
        ].map((metric, i) => (
          <div key={i} className="p-4 glass-card rounded-xl border border-white/5">
            <div className="text-[8px] font-bold text-white/20 uppercase tracking-wider mb-1">{metric.label}</div>
            <div className="text-lg font-display font-bold text-white mb-1">{metric.value}</div>
            <div className="text-[8px] text-white/10">{metric.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;

