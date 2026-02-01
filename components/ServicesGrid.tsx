import React, { useState, useRef, MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bot, Zap, X, ArrowRight, Database, Server, LineChart, Activity, Power, Layers, GitBranch, Network, BarChart3, Share2, Code2, TrendingUp, Workflow, BrainCircuit, Radar, UserCog, MessageSquare, LayoutDashboard, HeartHandshake, Fingerprint, FileCode } from 'lucide-react';
import { ServiceCardProps, ViewState } from '../types';
import { playSound } from '../utils/sound';

/* --- CUSTOM VISUALS COMPONENT --- */
const ServiceVisual: React.FC<{ type: string; isHovered: boolean }> = ({ type, isHovered }) => {
  const primaryColor = "#2563eb"; // Blue 600
  const secondaryColor = "#94a3b8"; // Slate 400
  const alertColor = "#ef4444"; // Red 500
  const successColor = "#10b981"; // Emerald 500
  
  const strokeColor = isHovered ? primaryColor : secondaryColor;

  switch (type) {
    case 'analytics': // Growing Bar Chart with Trend Line
      return (
        <svg className="absolute right-0 bottom-0 w-32 h-32 md:w-40 md:h-40 pointer-events-none overflow-visible" viewBox="0 0 100 100">
           {/* Moving Grid lines */}
           <defs>
               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                   <path d="M 10 0 L 0 0 0 10" fill="none" stroke={secondaryColor} strokeWidth="0.5" opacity="0.1"/>
               </pattern>
           </defs>
           <rect width="100" height="100" fill="url(#grid)" className={`transition-opacity duration-700 ease-luxury ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

           {/* Axes */}
           <line x1="10" y1="90" x2="90" y2="90" stroke={secondaryColor} strokeWidth="1" strokeOpacity="0.3" />
           <line x1="10" y1="90" x2="10" y2="10" stroke={secondaryColor} strokeWidth="1" strokeOpacity="0.3" />
           
           {/* Animated Bars */}
           <g transform="scale(1, -1) translate(0, -90)">
               {/* Bar 1 */}
               <rect x="20" y="0" width="10" height={isHovered ? "40" : "20"} fill={isHovered ? "#60a5fa" : secondaryColor} fillOpacity={isHovered ? 0.8 : 0.2} rx="2" className="transition-all duration-700 ease-luxury" />
               {/* Bar 2 */}
               <rect x="40" y="0" width="10" height={isHovered ? "65" : "35"} fill={isHovered ? "#3b82f6" : secondaryColor} fillOpacity={isHovered ? 0.8 : 0.2} rx="2" className="transition-all duration-700 ease-luxury delay-75" />
               {/* Bar 3 */}
               <rect x="60" y="0" width="10" height={isHovered ? "50" : "25"} fill={isHovered ? "#2563eb" : secondaryColor} fillOpacity={isHovered ? 0.8 : 0.2} rx="2" className="transition-all duration-700 ease-luxury delay-150" />
               {/* Bar 4 */}
               <rect x="80" y="0" width="10" height={isHovered ? "85" : "45"} fill={isHovered ? "#1d4ed8" : secondaryColor} fillOpacity={isHovered ? 0.9 : 0.3} rx="2" className="transition-all duration-700 ease-luxury delay-200" />
           </g>

           {/* Trend Line */}
           <path 
             d="M 25 50 L 45 25 L 65 40 L 85 5" 
             fill="none" 
             stroke={isHovered ? successColor : "transparent"} 
             strokeWidth="2" 
             strokeLinecap="round"
             strokeDasharray="100"
             strokeDashoffset={isHovered ? "0" : "100"}
             className="transition-all duration-1000 ease-out delay-300"
           />
           {/* Data Points */}
            {isHovered && (
               <>
                <circle cx="25" cy="50" r="2" fill={successColor} className="animate-in fade-in zoom-in delay-300 duration-300" />
                <circle cx="45" cy="25" r="2" fill={successColor} className="animate-in fade-in zoom-in delay-500 duration-300" />
                <circle cx="65" cy="40" r="2" fill={successColor} className="animate-in fade-in zoom-in delay-700 duration-300" />
                <circle cx="85" cy="5" r="3" fill="#fff" stroke={successColor} strokeWidth="2" className="animate-pulse" />
               </>
           )}
        </svg>
      );

    case 'chat': // Message Bubbles
      return (
        <svg className="absolute right-0 bottom-0 w-32 h-32 md:w-40 md:h-40 pointer-events-none overflow-visible" viewBox="0 0 100 100">
           {/* User Bubble (Right) */}
           <g className={`transition-all duration-700 ease-luxury ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-40'}`}>
               <rect x="45" y="55" width="45" height="28" rx="8" fill={isHovered ? primaryColor : secondaryColor} fillOpacity="0.1" stroke={strokeColor} strokeWidth="1" />
               <line x1="53" y1="64" x2="82" y2="64" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
               <line x1="53" y1="74" x2="72" y2="74" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
           </g>

           {/* Bot Bubble (Left) */}
           <g className={`transition-all duration-700 ease-luxury delay-100 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
               <path d="M10 25 A 8 8 0 0 1 18 17 H 52 A 8 8 0 0 1 60 25 V 45 A 8 8 0 0 1 52 53 H 18 A 8 8 0 0 1 10 45 Z" fill={isHovered ? "#eff6ff" : "transparent"} stroke={strokeColor} strokeWidth="1.5" />
               {/* Typing dots */}
               <circle cx="26" cy="35" r="2.5" fill={primaryColor} className={isHovered ? "animate-bounce" : ""} style={{ animationDelay: '0ms' }} />
               <circle cx="36" cy="35" r="2.5" fill={primaryColor} className={isHovered ? "animate-bounce" : ""} style={{ animationDelay: '150ms' }} />
               <circle cx="46" cy="35" r="2.5" fill={primaryColor} className={isHovered ? "animate-bounce" : ""} style={{ animationDelay: '300ms' }} />
           </g>
           
           {/* Floating particles */}
           {isHovered && (
               <>
                <circle cx="70" cy="40" r="1" fill={primaryColor} className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="30" cy="70" r="1" fill={primaryColor} className="animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
               </>
           )}
        </svg>
      );

    case 'anomaly': // Glitching Sine Wave
       return (
        <svg className="absolute right-0 bottom-0 w-32 h-32 md:w-40 md:h-40 pointer-events-none overflow-visible" viewBox="0 0 100 100">
           {/* Background Grid */}
           <path d="M10 10 H90 V90 H10 Z" fill="none" stroke={secondaryColor} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
           
           {/* Stable Wave (Background) */}
           <path d="M10 50 Q 30 30 50 50 T 90 50" fill="none" stroke={secondaryColor} strokeWidth="1" opacity={0.3} />

           {/* Red Glitch Channel */}
           <path 
             d="M10 50 Q 30 70 50 50 T 90 50" 
             fill="none" 
             stroke={alertColor}
             strokeWidth="1.5"
             className={`transition-opacity duration-100 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
             style={{ transform: 'translateX(-2px)' }}
           >
               <animateTransform attributeName="transform" type="translate" values="-2,0; 2,0; -1,0; 0,0" dur="0.2s" repeatCount="indefinite" begin={isHovered ? "0s" : "indefinite"} />
           </path>

           {/* Cyan Glitch Channel */}
           <path 
             d="M10 50 Q 30 70 50 50 T 90 50" 
             fill="none" 
             stroke="#06b6d4"
             strokeWidth="1.5"
             className={`transition-opacity duration-100 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
             style={{ transform: 'translateX(2px)' }}
           >
               <animateTransform attributeName="transform" type="translate" values="2,0; -2,0; 1,0; 0,0" dur="0.3s" repeatCount="indefinite" begin={isHovered ? "0s" : "indefinite"} />
           </path>
           
           {/* Main White/Blue Wave */}
           <path 
             d="M10 50 Q 30 70 50 50 T 90 50" 
             fill="none" 
             stroke={isHovered ? "#fff" : "transparent"} 
             strokeWidth="1" 
             className={isHovered ? "opacity-100" : "opacity-0"}
           />

           {/* Detection Box */}
           <rect x="35" y="25" width="30" height="50" fill="none" stroke={alertColor} strokeDasharray="2 2" className={`transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} />
           
           {/* Warning Icon */}
           <text x="75" y="20" fontSize="10" fill={alertColor} className={`transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>!</text>
        </svg>
      );

    case 'pipeline': // Real-time Data Pipeline / Neural Hub
       return (
        <svg className="absolute right-0 bottom-0 w-32 h-32 md:w-40 md:h-40 pointer-events-none overflow-visible" viewBox="0 0 100 100">
           {/* Defs for Glow */}
           <defs>
             <filter id="glow-pipe" x="-20%" y="-20%" width="140%" height="140%">
               <feGaussianBlur stdDeviation="2" result="blur" />
               <feComposite in="SourceGraphic" in2="blur" operator="over" />
             </filter>
           </defs>

           {/* Input Nodes (Left) */}
           <g className={`transition-all duration-700 ease-luxury ${isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-60'}`}>
              <circle cx="10" cy="25" r="3" fill={secondaryColor} />
              <circle cx="10" cy="50" r="3" fill={secondaryColor} />
              <circle cx="10" cy="75" r="3" fill={secondaryColor} />
           </g>

           {/* Output Nodes (Right) */}
           <g className={`transition-all duration-700 ease-luxury ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-60'}`}>
              <circle cx="90" cy="25" r="3" fill={isHovered ? successColor : secondaryColor} />
              <circle cx="90" cy="50" r="3" fill={isHovered ? successColor : secondaryColor} />
              <circle cx="90" cy="75" r="3" fill={isHovered ? successColor : secondaryColor} />
           </g>

           {/* Central Processing Hub (Hexagon-ish) */}
           <g className="transition-all duration-1000 ease-luxury" style={{ transformOrigin: '50px 50px', transform: isHovered ? 'scale(1.1)' : 'scale(1)' }}>
              {/* Spinning Ring */}
              <circle cx="50" cy="50" r="15" fill="none" stroke={isHovered ? primaryColor : secondaryColor} strokeWidth="1" strokeDasharray="3 3" 
                 className={isHovered ? "animate-[spin_4s_linear_infinite]" : ""} style={{ transformOrigin: '50px 50px' }} />
              
              {/* Inner Core */}
              <circle cx="50" cy="50" r="6" fill={isHovered ? primaryColor : secondaryColor} className="transition-colors duration-500" />
           </g>

           {/* Connecting Lines (Bezier Paths) */}
           <g fill="none" stroke={isHovered ? primaryColor : secondaryColor} strokeWidth="1" opacity={isHovered ? 0.4 : 0.1} className="transition-colors duration-500">
              {/* Inputs to Center */}
              <path id="path-in-1" d="M10 25 C 30 25, 30 50, 44 50" />
              <path id="path-in-2" d="M10 50 L 44 50" />
              <path id="path-in-3" d="M10 75 C 30 75, 30 50, 44 50" />
              
              {/* Center to Outputs */}
              <path id="path-out-1" d="M56 50 C 70 50, 70 25, 90 25" />
              <path id="path-out-2" d="M56 50 L 90 50" />
              <path id="path-out-3" d="M56 50 C 70 50, 70 75, 90 75" />
           </g>

           {/* Data Particles (Only active on hover) */}
           {isHovered && (
             <g filter="url(#glow-pipe)">
                {/* Incoming Particles */}
                <circle r="2" fill="white">
                   <animateMotion dur="1s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#path-in-1" />
                   </animateMotion>
                </circle>
                <circle r="2" fill="white">
                   <animateMotion dur="1s" begin="0.3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#path-in-2" />
                   </animateMotion>
                </circle>
                <circle r="2" fill="white">
                   <animateMotion dur="1s" begin="0.6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#path-in-3" />
                   </animateMotion>
                </circle>

                {/* Processing Pulse */}
                <circle cx="50" cy="50" r="6" fill="none" stroke="white" strokeWidth="1" opacity="0">
                    <animate attributeName="r" values="6;20" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0" dur="1s" repeatCount="indefinite" />
                </circle>

                {/* Outgoing Particles */}
                <circle r="1.5" fill={successColor}>
                   <animateMotion dur="0.8s" begin="0.5s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#path-out-1" />
                   </animateMotion>
                </circle>
                <circle r="1.5" fill={successColor}>
                   <animateMotion dur="0.8s" begin="0.7s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#path-out-2" />
                   </animateMotion>
                </circle>
                <circle r="1.5" fill={successColor}>
                   <animateMotion dur="0.8s" begin="0.9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                      <mpath href="#path-out-3" />
                   </animateMotion>
                </circle>
             </g>
           )}
        </svg>
      );

    case 'knowledge': // Neural Network / Graph
      return (
        <svg className="absolute right-0 bottom-0 w-32 h-32 md:w-40 md:h-40 pointer-events-none overflow-visible" viewBox="0 0 100 100">
           <g className="transition-all duration-700 ease-luxury">
             {/* Connections */}
             <line x1="50" y1="50" x2="20" y2="30" stroke={strokeColor} strokeWidth={isHovered ? "1.5" : "0.5"} className="transition-all duration-500" />
             <line x1="50" y1="50" x2="80" y2="30" stroke={strokeColor} strokeWidth={isHovered ? "1.5" : "0.5"} className="transition-all duration-500" />
             <line x1="50" y1="50" x2="20" y2="70" stroke={strokeColor} strokeWidth={isHovered ? "1.5" : "0.5"} className="transition-all duration-500" />
             <line x1="50" y1="50" x2="80" y2="70" stroke={strokeColor} strokeWidth={isHovered ? "1.5" : "0.5"} className="transition-all duration-500" />
             <line x1="50" y1="50" x2="50" y2="10" stroke={strokeColor} strokeWidth={isHovered ? "1.5" : "0.5"} strokeDasharray="2 2" />

             {/* Central Node */}
             <circle cx="50" cy="50" r={isHovered ? "10" : "5"} fill={isHovered ? primaryColor : secondaryColor} className="transition-all duration-500 ease-luxury" />
             {isHovered && <circle cx="50" cy="50" r="14" fill="none" stroke={primaryColor} strokeWidth="1" className="animate-ping" />}
             
             {/* Peripheral Nodes */}
             <circle cx="20" cy="30" r="4" fill={isHovered ? "#3b82f6" : secondaryColor} className={`transition-all duration-500 ${isHovered ? 'animate-pulse' : ''}`} />
             <circle cx="80" cy="30" r="4" fill={isHovered ? "#3b82f6" : secondaryColor} className={`transition-all duration-500 delay-75 ${isHovered ? 'animate-pulse' : ''}`} />
             <circle cx="20" cy="70" r="4" fill={isHovered ? "#3b82f6" : secondaryColor} className={`transition-all duration-500 delay-150 ${isHovered ? 'animate-pulse' : ''}`} />
             <circle cx="80" cy="70" r="4" fill={isHovered ? "#3b82f6" : secondaryColor} className={`transition-all duration-500 delay-200 ${isHovered ? 'animate-pulse' : ''}`} />
             
             {/* Signal propagation */}
             {isHovered && (
                 <>
                    <circle r="2" fill="#fff">
                        <animateMotion path="M50 50 L20 30" dur="0.8s" repeatCount="indefinite" />
                    </circle>
                    <circle r="2" fill="#fff">
                        <animateMotion path="M50 50 L80 30" dur="0.9s" repeatCount="indefinite" begin="0.1s" />
                    </circle>
                    <circle r="2" fill="#fff">
                        <animateMotion path="M50 50 L20 70" dur="1s" repeatCount="indefinite" begin="0.2s" />
                    </circle>
                    <circle r="2" fill="#fff">
                        <animateMotion path="M50 50 L80 70" dur="1.1s" repeatCount="indefinite" begin="0.3s" />
                    </circle>
                 </>
             )}
           </g>
        </svg>
      );

    default:
      return null;
  }
};

/* --- SPOTLIGHT CARD COMPONENT --- */
const SpotlightCard: React.FC<ServiceCardProps & { visualType: string }> = ({ title, description, icon, details, visualType, onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Direct CSS Variable Update (Zero React Rerenders)
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleFocus = () => {
    setIsHovered(true);
    playSound('hover');
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        playSound('chime');
        if (onClick) onClick();
      }}
      className="relative group h-full cursor-pointer"
    >
      {/* Card Chassis - White/Clean with Luxury Ease */}
      <div className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-700 ease-luxury group-hover:border-tva-orange/50 group-hover:shadow-2xl group-hover:-translate-y-2 flex flex-col relative">
        
        {/* Module Header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between z-20">
           <div className="flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest font-mono">
              <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${isHovered ? 'bg-tva-orange' : 'bg-gray-300'}`}></span>
              MOD-{title.split(' ')[0].substring(0,3).toUpperCase()}
           </div>
           <Activity size={12} className={`text-gray-300 transition-colors duration-500 ${isHovered ? 'text-tva-orange' : ''}`} />
        </div>

        {/* Visual Background */}
        <ServiceVisual type={visualType} isHovered={isHovered} />

        {/* Spotlight Effect Layer */}
        <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-700 ease-luxury group-hover:opacity-100 z-0"
            style={{
                background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(37, 99, 235, 0.05), transparent 40%)`,
            }}
        />

        {/* Content */}
        <div className="p-6 flex-grow relative z-10 flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg border transition-colors duration-500 ${isHovered ? 'bg-tva-orange text-white border-tva-orange' : 'bg-gray-50 text-tva-orange border-gray-100'}`}>
                    {icon}
                </div>
            </div>

            <h3 className="text-xl font-bold text-tva-cream mb-3 group-hover:text-tva-orange transition-colors duration-300 tracking-tight">
            {title}
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-6 font-sans flex-grow">
            {description}
            </p>

            <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                    {details.techStack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[10px] font-bold px-2 py-1 bg-gray-50 text-gray-500 rounded border border-gray-200 group-hover:border-tva-orange/20 transition-colors duration-500 font-mono">
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="text-tva-orange opacity-0 group-hover:opacity-100 transition-all duration-500 ease-luxury -translate-x-2 group-hover:translate-x-0">
                    <ArrowRight size={16} />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

/* --- SERVICE MODAL COMPONENT --- */
const ServiceModal: React.FC<{ service: ServiceCardProps; onClose: () => void }> = ({ service, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; }
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm animate-in fade-in duration-500"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-t-xl sm:rounded-xl overflow-hidden animate-in slide-in-from-bottom-24 sm:zoom-in-95 duration-500 ease-luxury max-h-[90vh] flex flex-col border border-gray-100">
        
        {/* Technical Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center justify-between shrink-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center gap-4">
                <div className="p-2 bg-white border border-gray-200 rounded text-tva-orange shadow-sm">
                   {service.icon}
                </div>
                <div>
                   <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest font-mono">
                      <span>SECURE FILE</span>
                      <span className="text-gray-300">/</span>
                      <span className="text-tva-orange">CONFIDENTIAL</span>
                   </div>
                   <h2 className="text-xl font-bold text-tva-cream leading-none mt-1">{service.title}</h2>
                </div>
            </div>
            
            <button 
                onClick={onClose} 
                className="relative z-10 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        <div className="p-6 sm:p-10 space-y-8 bg-white overflow-y-auto relative">
           {/* Background Watermark */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
               <Fingerprint size={300} />
           </div>

          <div className="relative z-10">
            <h3 className="text-xs font-bold text-tva-orange mb-3 uppercase tracking-widest flex items-center gap-2 font-mono">
                <FileCode size={14} /> Mission Objective
            </h3>
            <div className="text-gray-700 leading-relaxed font-sans text-base sm:text-lg border-l-4 border-tva-orange pl-6 py-2 bg-blue-50/50 rounded-r-lg">
               {service.description} 
               <br/><br/>
               <span className="font-semibold text-tva-cream">Impact:</span> {service.details.outcome}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div className="bg-gray-50/50 p-5 rounded-lg border border-gray-100">
              <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest font-mono">Capabilities</h3>
              <ul className="space-y-3">
                {service.details.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-medium">
                    <span className="text-tva-orange mt-0.5">▹</span>{feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50/50 p-5 rounded-lg border border-gray-100">
              <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-widest font-mono">Architecture</h3>
              <div className="flex flex-wrap gap-2">
                {service.details.techStack.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-white border border-gray-200 rounded text-xs text-gray-500 font-bold font-mono hover:border-tva-orange/50 transition-colors cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400 font-mono tracking-widest">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Systems Online
          </div>
          <button 
            onClick={() => {
                onClose();
                const contactSection = document.getElementById('contact');
                if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-3 bg-tva-orange text-white font-bold uppercase hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2 rounded-lg text-sm tracking-wide"
          >
            <Power size={16} /> Initialize Project
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const ServicesGrid: React.FC<{ setView: (view: ViewState) => void }> = ({ setView }) => {
  const [selectedService, setSelectedService] = useState<ServiceCardProps | null>(null);

  const services: (ServiceCardProps & { visualType: string })[] = [
    {
      title: "AI Chatbots & Knowledge Assistants",
      description: "Deploy autonomous agents that ingest your entire corporate knowledge base—PDFs, SharePoint, and emails—to provide instant, cited answers. Unlike rigid decision trees, our neural architectures understand intent, context, and nuance, enabling complex problem-solving without human intervention.",
      icon: <Bot size={24} />,
      visualType: 'chat',
      details: {
        features: ["Semantic Search via Vector Embeddings", "Multi-Turn Context Retention", "Citation-Backed Responses (RAG)", "Role-Based Data Governance"],
        techStack: ["LangChain", "OpenAI", "Pinecone", "React", "Azure"],
        outcome: "Deflect 70% of Tier-1 support tickets and slash employee onboarding time by providing instant access to institutional memory."
      }
    },
    {
      title: "Predictive Forecasting",
      description: "Move beyond simple linear regression. We utilize advanced time-series forecasting models (Prophet, ARIMA, LSTM) to analyze seasonality, market trends, and external variables. Our systems predict inventory shortages, revenue dips, and resource bottlenecks weeks before they impact your P&L.",
      icon: <TrendingUp size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Multi-Variable Time-Series Modeling", "Seasonality & Trend Decomposition", "Confidence Interval Estimation", "Scenario Planning (Best/Worst Case)"],
        techStack: ["Prophet", "XGBoost", "Snowflake", "Python", "Tableau"],
        outcome: "Reduce inventory holding costs by 25% and optimize cash flow with 94%+ forecast accuracy."
      }
    },
    {
      title: "Sentiment Analysis & Intelligence",
      description: "Turn qualitative noise into quantitative signal. Our NLP pipelines process thousands of support tickets, social mentions, and customer reviews in real-time. We don't just tag 'positive' or 'negative'—we extract specific friction points, feature requests, and emerging PR risks.",
      icon: <Radar size={24} />,
      visualType: 'knowledge',
      details: {
        features: ["Aspect-Based Sentiment Extraction", "Real-Time Crisis Detection", "Competitor Perception Analysis", "Automated Ticket Triage"],
        techStack: ["NLP", "HuggingFace", "Python", "PowerBI", "Twitter API"],
        outcome: "Preemptively identify churn risks and prioritize product roadmap features based on aggregated user voice."
      }
    },
    {
      title: "AI Data Dashboards",
      description: "Static PDFs are obsolete. We engineer dynamic, self-service command centers where executives can query data using natural language (e.g., 'Show me revenue by region vs last Q'). Our dashboards unify disparate data sources into a single source of truth with real-time refresh rates.",
      icon: <LayoutDashboard size={24} />,
      visualType: 'analytics',
      details: {
        features: ["Text-to-SQL Query Generation", "Drill-Down Interactive Visuals", "Cross-Platform Data Unification", "Automated Anomaly Alerts"],
        techStack: ["Streamlit", "Looker", "BigQuery", "React", "dbt"],
        outcome: "Eliminate the 'data request queue' and empower leadership to answer their own strategic questions in seconds."
      }
    },
    {
      title: "Custom AI & ML Solutions",
      description: "Off-the-shelf APIs often fail on niche edge cases. We train bespoke machine learning models on your proprietary datasets. Whether it's computer vision for quality control, fraud detection algorithms for fintech, or route optimization for logistics, we build the exact tool your problem requires.",
      icon: <BrainCircuit size={24} />,
      visualType: 'anomaly',
      details: {
        features: ["Proprietary Model Training & Fine-Tuning", "Edge Deployment for Low Latency", "Continuous Learning Pipelines", "Explainable AI (XAI) Architecture"],
        techStack: ["TensorFlow", "PyTorch", "AWS SageMaker", "OpenCV", "Docker"],
        outcome: "Own your intellectual property and solve high-value problems that generic AI tools simply cannot address."
      }
    },
    {
      title: "Data Engineering & MLOps",
      description: "A model in a notebook delivers no value. We engineer the robust 'plumbing' required for enterprise AI: automated ETL pipelines, feature stores, and model monitoring registries. We ensure your data is clean, accessible, and your models remain accurate over time without drift.",
      icon: <Workflow size={24} />,
      visualType: 'pipeline',
      details: {
        features: ["Automated ETL/ELT Pipelines", "Model Drift Detection & Retraining", "Feature Stores & Versioning", "Scalable Serverless Inference"],
        techStack: ["Apache Airflow", "Kafka", "Kubernetes", "Terraform", "AWS/GCP"],
        outcome: "Transition from 'POC' to 'Production' with 99.9% uptime and infrastructure that scales automatically with demand."
      }
    }
  ];

  return (
    <>
      <section className="py-20 bg-tva-dark border-t border-gray-100 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-40"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-tva-orange rounded-full"></span>
                    <span className="text-tva-orange font-bold text-xs uppercase tracking-widest">Our Solutions</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-tva-cream tracking-tight">Enterprise Services</h2>
                <p className="text-gray-600 font-sans text-lg mt-4 max-w-xl">
                Deploying advanced data architectures: Knowledge Assistants, Predictive Models, and Intelligent Infrastructure.
                </p>
            </div>
            
            <div className="hidden md:block text-right font-mono text-xs text-gray-400">
                <div>SYS.VER.2.4.9</div>
                <div>ALL SYSTEMS NORMAL</div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <SpotlightCard 
                key={i} 
                {...s} 
                onClick={() => setSelectedService(s)} 
              />
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </>
  );
};
