import React, { useEffect, useState, useRef } from 'react';

interface MinaCharacterProps {
  className?: string;
  variant?: 'idle' | 'walking' | 'thinking' | 'alert' | 'success' | 'talking' | 'aiming' | 'firing';
  eyeTarget?: { x: number; y: number } | null;
  showScanner?: boolean;
}

// --- MATH HELPERS ---

const solveIK = (shoulder: {x: number, y: number}, target: {x: number, y: number}, lengths: {L1: number, L2: number}, flip: boolean = false) => {
    const dx = target.x - shoulder.x;
    const dy = target.y - shoulder.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Clamp reach to prevent snapping
    const reach = Math.min(dist, lengths.L1 + lengths.L2 - 0.1); 
    const a = (lengths.L1 * lengths.L1 - lengths.L2 * lengths.L2 + reach * reach) / (2 * reach);
    const h = Math.sqrt(Math.max(0, lengths.L1 * lengths.L1 - a * a));
    const x2 = shoulder.x + a * (dx / reach);
    const y2 = shoulder.y + a * (dy / reach);
    return {
        x: flip ? x2 + h * (dy / reach) : x2 - h * (dy / reach),
        y: flip ? y2 - h * (dx / reach) : y2 + h * (dx / reach)
    };
};

const getAngle = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
};

const rotatePoint = (point: {x: number, y: number}, angleDeg: number) => {
    const rad = angleDeg * Math.PI / 180;
    return {
        x: point.x * Math.cos(rad) - point.y * Math.sin(rad),
        y: point.x * Math.sin(rad) + point.y * Math.cos(rad)
    };
};

// --- SUB-COMPONENTS ---

const PowerCable = ({ start, end, slack = 25, active = false }: { start: {x:number, y:number}, end: {x:number, y:number}, slack?: number, active?: boolean }) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.max(start.y, end.y) + slack;
    
    return (
        <g filter="url(#depth)">
            {/* Outer Insulation - Heavy Gauge */}
            <path 
                d={`M${start.x} ${start.y} Q${midX} ${midY} ${end.x} ${end.y}`} 
                fill="none" 
                stroke="#1e293b" 
                strokeWidth="8" 
                strokeLinecap="round"
            />
            {/* Inner Core Texture */}
            <path 
                d={`M${start.x} ${start.y} Q${midX} ${midY} ${end.x} ${end.y}`} 
                fill="none" 
                stroke="#334155" 
                strokeWidth="6" 
                strokeDasharray="3 3"
                strokeLinecap="round"
            />
            {/* Active Plasma Flow */}
            {active && (
                <path 
                    d={`M${start.x} ${start.y} Q${midX} ${midY} ${end.x} ${end.y}`} 
                    fill="none" 
                    stroke="#60a5fa" 
                    strokeWidth="2" 
                    strokeDasharray="10 20"
                    className="animate-[dash_0.4s_linear_infinite]"
                    filter="url(#glow)"
                />
            )}
            {/* Connector Fitting */}
            <circle cx={start.x} cy={start.y} r="5" fill="#475569" stroke="#0f172a" />
            <circle cx={end.x} cy={end.y} r="5" fill="#475569" stroke="#0f172a" />
        </g>
    );
};

const SensorDrone = ({ active }: { active: boolean }) => {
    return (
        <g className={`transition-all duration-1000 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <g className="animate-[float_4s_ease-in-out_infinite_reverse]">
                {/* Engine Thruster Effect */}
                <path d="M-6 10 L6 10 L0 24 Z" fill="#3b82f6" opacity="0.8" filter="url(#blur)" className="animate-pulse" />
                
                {/* Main Chassis */}
                <circle r="14" fill="url(#metalGradient)" stroke="#94a3b8" strokeWidth="0.5" filter="url(#depth)" />
                <path d="M-14 0 A 14 14 0 0 1 14 0" fill="#1e293b" opacity="0.5" />
                
                {/* Center Eye */}
                <circle r="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <circle r="5" fill="url(#scanGradient)" className="animate-pulse" />
                <circle r="2" fill="white" opacity="0.95" />

                {/* Orbiting Gyro */}
                <g className="animate-[spin_3s_linear_infinite]">
                    <ellipse cx="0" cy="0" rx="18" ry="6" fill="none" stroke="#60a5fa" strokeWidth="1" opacity="0.6" />
                </g>
                <g className="animate-[spin_5s_linear_infinite_reverse]">
                    <ellipse cx="0" cy="0" rx="6" ry="18" fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.3" />
                </g>
                
                {/* Antenna Array */}
                <line x1="8" y1="-8" x2="16" y2="-16" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="16" cy="-16" r="2" fill="#ef4444" className="animate-pulse" filter="url(#glow)" />
            </g>
        </g>
    );
};

const PlasmaRifle = ({ isAiming, isFiring, colors }: any) => {
    return (
        <g transform="translate(-15, -5)" filter="url(#depth)"> 
            {/* 1. STOCK & GRIP - Ergonomic Polymer */}
            <path 
                d="M-50 8 Q-45 8 -35 4 L-20 4 L-15 15 L-25 30 Q-45 28 -52 18 Q-55 12 -50 8 Z" 
                fill="#0f172a" 
                stroke={colors.limbs} 
                strokeWidth="1" 
            />
            {/* Grip Texture */}
            <path d="M-22 18 L-20 25" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <path d="M-26 17 L-24 24" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

            {/* 2. MAIN RECEIVER - Refined Machined Metal */}
            <path 
                d="M-30 -22 L70 -22 L80 0 L70 22 L-30 22 Q-38 22 -38 0 Q-38 -22 -30 -22 Z" 
                fill={colors.gunBody} 
                stroke={colors.limbs} 
                strokeWidth="1.5" 
            />
            
            {/* 3. PLASMA CHAMBER - Volumetric Effect */}
            <g>
                {/* Chamber Housing */}
                <rect x="-15" y="-14" width="70" height="14" rx="4" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />
                
                {/* Active Plasma Fluid */}
                <g clipPath="url(#coreClip)">
                     <rect x="-15" y="-14" width="70" height="14" fill="url(#plasmaGradient)" opacity="0.95" filter="url(#glow)" className="animate-pulse" />
                     {/* Dynamic Bubbles */}
                     <circle cx="0" cy="-7" r="3" fill="white" opacity="0.4" className="animate-[shimmer_2s_linear_infinite]" />
                     <circle cx="20" cy="-7" r="2" fill="white" opacity="0.6" className="animate-[shimmer_1s_linear_infinite]" />
                     <circle cx="40" cy="-7" r="4" fill="white" opacity="0.3" className="animate-[shimmer_3s_linear_infinite]" />
                     
                     {/* Flow Lines */}
                     <path d="M-15 -7 H55" stroke="white" strokeWidth="1" strokeDasharray="50 50" opacity="0.3" className="animate-[dash_1s_linear_infinite]" />
                </g>
                
                {/* Glass Specular Highlight */}
                <path d="M-15 -14 H55 L50 -8 H-10 Z" fill="white" opacity="0.1" />
            </g>
            <defs>
                <clipPath id="coreClip">
                     <rect x="-15" y="-14" width="70" height="14" rx="4" />
                </clipPath>
            </defs>

            {/* 4. COOLING VENTS - Integrated */}
            <g transform="translate(-5, 15)">
                <path d="M0 0 H50 Q52 0 52 3 V6 Q52 9 50 9 H0 Q-2 9 -2 6 V3 Q-2 0 0 0 Z" fill="#1e293b" />
                {/* Vent Grills */}
                {[10, 20, 30, 40].map(x => (
                    <rect key={x} x={x} y={3} width={4} height={3} fill={isFiring ? "#ef4444" : "#475569"} className={isFiring ? "animate-pulse" : ""} />
                ))}
            </g>

            {/* 5. BARREL ASSEMBLY - Recoil Mechanism */}
            <g className={`transition-transform duration-75 ${isFiring ? "translate-x-[-8px]" : "translate-x-0"}`}>
                <path d="M80 -18 L110 -18 L110 4 L80 4 Z" fill="#334155" stroke="#0f172a" strokeWidth="1" />
                <path d="M110 -15 L116 -15 L116 1 L110 1 Z" fill="#1e293b" /> {/* Muzzle Brake */}
                
                {/* Heat Bloom Overlay */}
                <rect x="80" y="-18" width="30" height="22" fill="url(#heatGradient)" opacity="0.5" style={{ mixBlendMode: 'overlay' }} />
            </g>

            {/* 6. ADVANCED SCOPE - Holographic */}
            <g transform="translate(10, -32)">
                {/* Rail Mount */}
                <path d="M-5 10 L0 0 L50 0 L55 10" fill="none" stroke={colors.gunAccent} strokeWidth="3" strokeLinecap="round" />
                
                {/* Holo Projector Front */}
                <path d="M50 0 L50 -5" stroke={colors.gunAccent} strokeWidth="2" />
                
                {/* Projection */}
                {isAiming && (
                     <g transform="translate(25, -15)">
                        {/* Outer Ring */}
                        <circle r="18" stroke={colors.gunGlow} strokeWidth="1.5" fill="none" strokeDasharray="30 10" className="animate-[spin_4s_linear_infinite]" opacity="0.7" />
                        
                        {/* Inner Reticle */}
                        <path d="M-10 0 L-2 0 M2 0 L10 0 M0 -10 L0 -2 M0 2 L0 10" stroke={colors.gunGlow} strokeWidth="1.5" />
                        <circle r="2" fill={colors.gunGlow} className="animate-pulse" />
                        
                        {/* Data Text */}
                        <text x="20" y="-15" fontSize="6" fill={colors.gunGlow} opacity="0.8" fontFamily="monospace" fontWeight="bold">RNG: 150m</text>
                     </g>
                )}
            </g>

            {/* 7. MUZZLE FLASH - Cinematic */}
            {isFiring && (
                <g transform="translate(120, -7)">
                    <filter id="flashBlur">
                        <feGaussianBlur stdDeviation="2" />
                    </filter>
                    {/* Core Beam */}
                    <path d="M0 0 L80 -20 L80 20 Z" fill="#fef08a" className="animate-[beamPulse_0.05s_infinite]" />
                    {/* Shockwave Sphere */}
                    <circle r="18" fill="white" filter="url(#flashBlur)" opacity="0.8" className="animate-ping" />
                    {/* Energy Spikes */}
                    <path d="M0 0 L40 -40 L30 -10 Z" fill="#60a5fa" opacity="0.6" className="animate-[pulse_0.1s_infinite]" />
                    <path d="M0 0 L40 40 L30 10 Z" fill="#60a5fa" opacity="0.6" className="animate-[pulse_0.1s_infinite]" />
                </g>
            )}
            
            {/* Cable Port */}
            <circle cx="-35" cy="10" r="5" fill="#1e293b" stroke="#334155" />
        </g>
    );
};

const MechanicalLeg = ({ hip, ankle, isLeft, isCombat, colors }: any) => {
    // Advanced IK Visualization with Piston
    const kneeX = isLeft ? hip.x - 22 : hip.x + 22;
    const kneeY = (hip.y + ankle.y) / 2;
    
    // Calculate Piston Extension
    const dy = ankle.y - kneeY;
    const dx = ankle.x - kneeX;
    const len = Math.sqrt(dx*dx + dy*dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    return (
        <g filter="url(#depth)">
            {/* 1. HIP JOINT - Ball & Socket */}
            <circle cx={hip.x} cy={hip.y} r="14" fill="url(#metalGradient)" stroke={colors.limbs} strokeWidth="1" />
            <circle cx={hip.x} cy={hip.y} r="6" fill="#1e293b" opacity="0.5" />
            
            {/* 2. THIGH - Armored plating */}
            <path 
                d={`M${hip.x} ${hip.y} Q${kneeX} ${kneeY} ${kneeX} ${kneeY}`} 
                stroke={colors.limbs} strokeWidth="20" strokeLinecap="round" 
            />
            {/* Overlay Armor Plate */}
            <path 
                d={`M${hip.x - 8} ${hip.y + 12} L${kneeX - 8} ${kneeY - 12} L${kneeX + 8} ${kneeY - 12} L${hip.x + 8} ${hip.y + 12} Z`} 
                fill="#334155" stroke="#1e293b" strokeWidth="1"
            />

            {/* 3. KNEE COMPLEX - Mechanical Hinge */}
            <circle cx={kneeX} cy={kneeY} r="10" fill="#0f172a" stroke={colors.limbs} strokeWidth="2" />
            <circle cx={kneeX} cy={kneeY} r="5" fill="#94a3b8" />
            <rect x={kneeX - 12} y={kneeY - 2} width={24} height={4} fill="#1e293b" rx="2" />

            {/* 4. SHIN - Hydraulic Piston System */}
            <g transform={`translate(${kneeX}, ${kneeY}) rotate(${angle})`}>
                {/* Upper Cylinder */}
                <rect x="0" y="-8" width={len * 0.6} height="16" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="1" />
                {/* Sliding Piston Rod */}
                <rect x={len * 0.5} y="-4" width={len * 0.5} height="8" fill="#e2e8f0" rx="1" />
            </g>

            {/* 5. BOOT - Heavy Industrial */}
            <g transform={`translate(${ankle.x}, ${ankle.y})`}>
                 <path 
                    d={isLeft ? "M-18 -5 L12 -5 L15 12 L-22 12 Z" : "M-12 -5 L18 -5 L22 12 L-15 12 Z"} 
                    fill={colors.boots} stroke="#1e293b" strokeWidth="1.5"
                />
                {/* Sole Tread */}
                <path 
                    d={isLeft ? "M-22 12 L15 12 L15 16 L-22 16 Z" : "M-15 12 L22 12 L22 16 L-15 16 Z"} 
                    fill="#020617"
                />
                {/* Thruster Port */}
                <path 
                    d={isLeft ? "M-12 5 L-4 5 L-6 10 L-14 10 Z" : "M4 5 L12 5 L14 10 L6 10 Z"} 
                    fill="#3b82f6" opacity="0.8" className="animate-pulse" 
                />
            </g>
        </g>
    );
};

const HoloRing = ({ active }: { active: boolean }) => {
    return (
        <g className={`transition-opacity duration-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
            <g className="animate-[spin_20s_linear_infinite]">
                {/* Main Ring */}
                <circle cx="0" cy="0" r="110" fill="none" stroke="url(#scanGradient)" strokeWidth="1" strokeDasharray="2 10" />
                {/* Inner Data Track */}
                <circle cx="0" cy="0" r="100" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />
            </g>
            
            {/* Counter-Rotating Segments */}
            <g className="animate-[spin_15s_linear_infinite_reverse]">
                 <path d="M-115 0 A 115 115 0 0 1 115 0" fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="20 80" opacity="0.2" />
            </g>
            
            {/* Floating Data Nodes */}
            {Array.from({length: 4}).map((_, i) => (
                <g key={i} className="animate-[spin_12s_linear_infinite]" style={{ animationDelay: `${i * 3}s` }}>
                     <circle cx="110" cy="0" r="2" fill="#93c5fd" />
                     <line x1="100" y1="0" x2="110" y2="0" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5" />
                </g>
            ))}
        </g>
    );
};

const MechanicalArm = ({ 
    shoulder, target, lengths, flip, colors, isLeft = false, hasHolo = false 
}: { 
    shoulder: {x: number, y: number}, target: {x: number, y: number}, lengths: {L1: number, L2: number}, flip: boolean, colors: any, isLeft?: boolean, hasHolo?: boolean
}) => {
    const elbow = solveIK(shoulder, target, lengths, flip);
    const angleUpper = getAngle(shoulder, elbow);
    const angleLower = getAngle(elbow, target);
    const handRotation = angleLower; 

    return (
        <g filter="url(#depth)">
            {/* SHOULDER - Heavy Armor */}
            <g transform={`translate(${shoulder.x}, ${shoulder.y})`}>
                <circle r="18" fill="url(#metalGradient)" stroke={colors.limbs} strokeWidth="1" />
                <path d="M-18 -8 Q0 -24 18 -8 L16 14 Q0 8 -16 14 Z" fill="#1e293b" stroke={colors.limbs} strokeWidth="0.5" />
                <rect x="-6" y="-12" width="12" height="6" fill="#94a3b8" rx="2" />
                {/* Status Indicator */}
                <rect x="-4" y="-10" width="8" height="2" fill="#22c55e" className="animate-pulse" />
            </g>

            {/* UPPER ARM - Structural */}
            <g transform={`translate(${shoulder.x}, ${shoulder.y}) rotate(${angleUpper})`}>
                <rect x="0" y="-10" width={lengths.L1} height="20" rx="6" fill="url(#limbGradient)" stroke={colors.limbs} strokeWidth="0.5" />
                
                {/* Internal Mechanism Detail */}
                <rect x="8" y="-6" width={lengths.L1 - 16} height="12" fill="#0f172a" rx="3" />
                <line x1="12" y1="0" x2={lengths.L1 - 12} y2="0" stroke="#334155" strokeWidth="2" />
                
                {/* External Piping */}
                <path d={`M6 10 Q${lengths.L1/2} 18 ${lengths.L1-6} 10`} fill="none" stroke="#0f172a" strokeWidth="3" />
                <path d={`M6 10 Q${lengths.L1/2} 18 ${lengths.L1-6} 10`} fill="none" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
            </g>

            {/* ELBOW - Articulated Joint */}
            <g transform={`translate(${elbow.x}, ${elbow.y})`}>
                <circle r="12" fill="url(#metalGradient)" stroke={colors.boots} strokeWidth="1" />
                <circle r="7" fill="#0f172a" />
                <circle r="3" fill="#ef4444" className="animate-pulse" filter="url(#glow)" /> 
            </g>

            {/* LOWER ARM - Tech Integrated */}
            <g transform={`translate(${elbow.x}, ${elbow.y}) rotate(${angleLower})`}>
                {isLeft ? (
                    // GAUNTLET (Left Arm)
                    <g>
                        <path 
                            d={`M0 -10 L${lengths.L2 - 8} -11 L${lengths.L2 - 8} 11 L0 10 Z`} 
                            fill="url(#limbGradient)" stroke={colors.limbs} strokeWidth="0.5"
                        />
                        {/* Wrist Computer */}
                        <rect x="14" y="-7" width={lengths.L2 - 28} height="14" fill="#020617" rx="2" stroke="#1e293b" strokeWidth="1" />
                        <line x1="18" y1="-3" x2="36" y2="-3" stroke={colors.gunGlow} strokeWidth="1.5" className="animate-[shimmer_1.5s_linear_infinite]" />
                        <line x1="18" y1="3" x2="30" y2="3" stroke={colors.gunGlow} strokeWidth="1.5" className="animate-[shimmer_1.5s_linear_infinite]" opacity="0.6" />
                        
                        {/* Emitter Nodes */}
                        <circle cx={lengths.L2 - 12} cy="-11" r="2" fill="#3b82f6" />
                        <circle cx={lengths.L2 - 12} cy="11" r="2" fill="#3b82f6" />
                    </g>
                ) : (
                    // STANDARD ARM (Right Arm)
                    <g>
                        <path 
                            d={`M0 -9 L${lengths.L2 - 8} -8 L${lengths.L2 - 8} 8 L0 9 Z`} 
                            fill="url(#limbGradient)" stroke={colors.limbs} strokeWidth="0.5"
                        />
                        {/* Reinforced Plating */}
                        <rect x="10" y="-6" width="16" height="12" fill="rgba(255,255,255,0.05)" rx="2" />
                        <line x1="12" y1="0" x2="24" y2="0" stroke="#0f172a" strokeWidth="1" />
                    </g>
                )}
                
                {/* Wrist Pivot */}
                <path d={`M${lengths.L2 - 14} -8 L${lengths.L2} -6 L${lengths.L2} 6 L${lengths.L2 - 14} 8 Z`} fill="#1e293b" />
            </g>

            {/* HAND - Articulated Fingers */}
            <g transform={`translate(${target.x}, ${target.y}) rotate(${handRotation})`}>
                <g transform="rotate(-90)"> 
                     {/* Palm */}
                     <path d="M-12 0 C-12 -14 12 -14 12 0 L 10 20 C 10 24 -10 24 -10 20 Z" fill={colors.gloves} stroke={colors.limbs} strokeWidth="1.5" />
                     {/* Knuckle Protection */}
                     <rect x="-10" y="2" width="20" height="6" fill="#cbd5e1" rx="2" opacity="0.6" />
                     
                     {/* Thumb */}
                     <g transform="translate(12, 8) rotate(40)">
                        <rect x="0" y="-3" width="8" height="6" rx="2" fill={colors.gloves} stroke={colors.limbs} />
                     </g>
                </g>

                {/* PROJECTOR EFFECT (Left Hand Idle) */}
                {isLeft && hasHolo && (
                    <g transform="rotate(-90) translate(0, -36)">
                        <path d="M0 24 L0 0" stroke="url(#scanGradient)" strokeWidth="8" filter="url(#blur)" />
                        <path d="M-6 24 L0 0 L6 24" fill="url(#scanGradient)" opacity="0.2" />
                        
                        {/* Floating Hologram */}
                        <g className="animate-[spin_6s_linear_infinite]">
                            <rect x="-18" y="-18" width="36" height="36" fill="none" stroke={colors.gunGlow} strokeWidth="0.5" opacity="0.5" transform="rotate(45)" />
                            <circle r="22" stroke={colors.gunGlow} strokeWidth="0.5" fill="none" strokeDasharray="2 4" opacity="0.7" />
                            <rect x="-10" y="-10" width="20" height="20" fill={colors.gunGlow} opacity="0.2" />
                        </g>
                    </g>
                )}
            </g>
        </g>
    );
};


export const MinaCharacter: React.FC<MinaCharacterProps> = ({ className, variant = 'idle', eyeTarget, showScanner = false }) => {
  
  const colors = {
    body: '#dc2626',      
    face: '#ffffff',      
    limbs: '#475569',    
    gloves: '#f8fafc',   
    boots: '#0f172a',
    eyes: '#0f172a',
    gunBody: '#334155',     
    gunAccent: '#e2e8f0',   
    gunGlow: '#3b82f6',     
    gunHeat: '#ef4444',     
    gunDark: '#020617',
    wrist: '#1e293b',    
    joint: '#94a3b8'
  };

  const isAiming = variant === 'aiming'; 
  const isFiring = variant === 'firing'; 
  const isSuccess = variant === 'success';
  const isAlert = variant === 'alert';
  const isTalking = variant === 'talking';
  const isThinking = variant === 'thinking';
  const isCombat = isAiming || isFiring;
  const isIdle = variant === 'idle' || variant === 'talking' || variant === 'thinking';
  const isWalking = variant === 'walking';

  const centerlineOffset = isCombat ? 12 : 0; 

  // --- SMOOTH ANIMATION STATE ---
  const [smoothPupil, setSmoothPupil] = useState({ x: 0, y: 0 });
  const [smoothTilt, setSmoothTilt] = useState(0);

  // Targets for animation loop
  const targetRef = useRef({ x: 0, y: 0, tilt: 0 });

  useEffect(() => {
    let tX = 0, tY = 0, tTilt = 0;
    
    if (eyeTarget) {
        // Damped range to keep eyes looking organic
        const normX = (eyeTarget.x - 50) / 50; 
        const normY = (eyeTarget.y - 50) / 50; 
        
        tX = normX * 14 + (isCombat ? 8 : 0);
        tY = normY * 8;
        tTilt = normX * 5; 
    } else {
        tX = isCombat ? 8 : 0;
    }
    
    targetRef.current = { x: tX, y: tY, tilt: tTilt };
  }, [eyeTarget, isCombat]);

  // Animation Loop (Lerp)
  useEffect(() => {
    let rafId: number;
    const loop = () => {
        setSmoothPupil(prev => ({
            x: prev.x + (targetRef.current.x - prev.x) * 0.15,
            y: prev.y + (targetRef.current.y - prev.y) * 0.15
        }));
        
        setSmoothTilt(prev => prev + (targetRef.current.tilt - prev) * 0.08);
        rafId = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(rafId);
  }, []);

  // --- RIGGING ---
  let shoulderFront = { x: -74, y: 20 }; 
  let shoulderBack = { x: 74, y: 20 };
  const armLengths = { L1: 48, L2: 48 };

  // Targets
  let targetFront = { x: -95, y: 95 }; 
  let targetBack = { x: 95, y: 95 };   
  let gunRotation = 0;
  let flipFront = false; 
  let flipBack = true; 

  // Gun Cable Anchor Points
  let backpackAnchor = { x: 20, y: -20 };
  let gunAnchor = { x: 0, y: 0 }; 

  if (isThinking) {
      targetFront = { x: -45, y: 60 }; 
      flipFront = true;
  } else if (isSuccess) {
      targetFront = { x: -85, y: -50 };
      targetBack = { x: 85, y: -50 };
      flipFront = true; 
      flipBack = false; 
  } else if (isCombat) {
      shoulderFront = { x: -55, y: 25 }; 
      const baseGripX = 65;
      const baseGripY = 40; 
      const recoilX = isFiring ? -15 : 0;
      const recoilY = isFiring ? -2 : 0;
      gunRotation = isFiring ? -8 : 0;
      const gripPos = { x: baseGripX + recoilX, y: baseGripY + recoilY };
      
      const foregripOffset = { x: 50, y: 0 }; 
      const rotatedOffset = rotatePoint(foregripOffset, gunRotation);
      const foregripPos = { x: gripPos.x + rotatedOffset.x, y: gripPos.y + rotatedOffset.y };
      
      targetFront = foregripPos; 
      targetBack = gripPos;      
      flipFront = false; 
      flipBack = false; 

      gunAnchor = { x: targetBack.x - 40, y: targetBack.y + 10 };
  } else {
      gunAnchor = { x: targetBack.x - 10, y: targetBack.y - 10 };
  }

  const bodyAnimClass = isFiring ? "transition-transform duration-75 ease-out" : "transition-transform duration-500 ease-out-expo";

  const hipL = { x: -35, y: 60 };
  const footL = { x: -45, y: 130 };
  const hipR = { x: 35, y: 60 };
  const footR = { x: 45, y: 130 };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
        
        {/* --- EMOTIONS --- */}
        {isAlert && (
             <div className="absolute top-[-20%] right-[-15%] animate-float-bubble z-50">
                 <div className="bg-white border-4 border-gray-700 text-gray-900 font-black rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-xl pb-1">!</div>
             </div>
        )}
        {isSuccess && (
             <div className="absolute top-[-20%] right-[-15%] animate-float-bubble z-50">
                 <div className="bg-white border-4 border-gray-700 text-gray-900 font-black rounded-full w-16 h-16 flex items-center justify-center text-4xl shadow-xl">✓</div>
             </div>
        )}

        <svg viewBox="0 0 240 280" className="w-full h-full relative z-10 overflow-visible">
            <defs>
                <filter id="depth" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.4" />
                </filter>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" />
                </filter>
                <filter id="innerGlow">
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"/>
                    <feFlood floodColor="black" floodOpacity="0.3"/>
                    <feComposite in2="shadowDiff" operator="in"/>
                    <feComposite in2="SourceGraphic" operator="over"/>
                </filter>
                
                {/* Texture Noise */}
                <filter id="metalNoise">
                    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.1" />
                    </feComponentTransfer>
                    <feComposite operator="in" in2="SourceGraphic" />
                </filter>

                <linearGradient id="scanGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="40%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#991b1b" />
                </linearGradient>
                <linearGradient id="limbGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#64748b" />
                    <stop offset="50%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <radialGradient id="glassGradient" cx="0.5" cy="0.4" r="0.8">
                     <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                     <stop offset="80%" stopColor="#f8fafc" stopOpacity="1" />
                     <stop offset="100%" stopColor="#e2e8f0" stopOpacity="1" />
                </radialGradient>
                <linearGradient id="glareGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity="0.5"/>
                    <stop offset="100%" stopColor="white" stopOpacity="0"/>
                </linearGradient>
                <linearGradient id="plasmaGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id="heatGradient" x1="0" y1="0" x2="1" y2="0">
                     <stop offset="0%" stopColor="#ef4444" opacity="0.8" />
                     <stop offset="100%" stopColor="#7f1d1d" opacity="0" />
                </linearGradient>
            </defs>

            {/* --- SHADOW POOL (Dynamic) --- */}
            {isIdle && (
                 <ellipse 
                    cx="120" cy="250" rx="55" ry="14" 
                    fill="#0f172a" opacity="0.3"
                    className="animate-[breathe_6s_ease-in-out_infinite]"
                    filter="url(#blur)"
                 />
            )}

            {/* --- MAIN CHARACTER GROUP --- */}
            <g className={isIdle ? "animate-float" : ""} transform="translate(120, 110)">
                
                {/* --- REACTOR BACKPACK (Behind Body) --- */}
                <g transform="translate(0, -10)">
                    {/* Main Unit */}
                    <rect x="-45" y="-50" width="90" height="90" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="2" filter="url(#depth)" />
                    {/* Turbine Vents */}
                    <circle cx="0" cy="-15" r="28" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                    {/* Spinning Turbine Blades */}
                    <g className="animate-[spin_2s_linear_infinite]" opacity="0.5">
                        <path d="M0 -28 L5 0 L0 28 L-5 0 Z" fill="#64748b" />
                        <path d="M-28 0 L0 5 L28 0 L0 -5 Z" fill="#64748b" />
                        <circle r="8" fill="#1e293b" />
                    </g>
                    {/* Pulsing Core Center */}
                    <circle cx="0" cy="-15" r="10" fill="#3b82f6" opacity="0.8" className="animate-pulse" filter="url(#glow)" />
                    
                    {/* Lower Vents */}
                    <rect x="-30" y="20" width="60" height="10" rx="2" fill="#0f172a" />
                    <rect x="-25" y="23" width="50" height="4" fill="#ef4444" opacity="0.6" className="animate-pulse" />
                </g>

                {/* --- POWER CABLE (Dynamic Connection) --- */}
                {isCombat && (
                    <PowerCable start={backpackAnchor} end={gunAnchor} active={isFiring} />
                )}

                {/* --- HOLOGRAPHIC DATA RING (Background) --- */}
                <HoloRing active={isThinking || isTalking || showScanner} />

                {/* --- SCANNER BEAM --- */}
                <g className={`transition-opacity duration-300 ${showScanner ? 'opacity-100' : 'opacity-0'}`} style={{ pointerEvents: 'none' }}>
                    <path 
                        d="M0 0 L -180 280 L 180 280 Z" 
                        fill="url(#scanGradient)" 
                        transform={`rotate(${smoothPupil.y * 3})`}
                        className="animate-pulse"
                    />
                    <g className="animate-[scanVertical_1s_linear_infinite]" opacity="0.5">
                        <line x1="-120" y1="120" x2="120" y2="120" stroke="#3b82f6" strokeWidth="2" />
                    </g>
                </g>

                {/* --- LEGS (Articulated with Pistons) --- */}
                <g className={isWalking ? "animate-[walkBounce_0.6s_infinite]" : "transition-all duration-500"}>
                    {/* Left Leg */}
                    <MechanicalLeg 
                        hip={hipL} 
                        ankle={{ x: footL.x + (isCombat ? -10 : 0), y: footL.y + (isCombat ? -10 : 0) }} 
                        isLeft={true} 
                        isCombat={isCombat} 
                        colors={colors} 
                    />
                    {/* Right Leg */}
                    <MechanicalLeg 
                        hip={hipR} 
                        ankle={{ x: footR.x + (isCombat ? 10 : 0), y: footR.y + (isCombat ? 10 : 0) }} 
                        isLeft={false} 
                        isCombat={isCombat} 
                        colors={colors} 
                    />
                </g>

                {/* --- BODY GROUP (With Tilt) --- */}
                <g 
                    className={bodyAnimClass}
                    style={{ 
                        transform: `rotate(${smoothTilt}deg) translate(${isFiring ? -4 : 0}px, ${isFiring ? 2 : 0}px)`,
                        transformOrigin: '0px 0px'
                    }}
                >
                    {/* 1. BACKGROUND ARM */}
                    <MechanicalArm 
                        shoulder={shoulderBack}
                        target={targetBack}
                        lengths={armLengths}
                        flip={flipBack}
                        colors={colors}
                        isLeft={false} 
                    />

                    {/* 2. CHASSIS */}
                    {/* Main Body Housing */}
                    <circle cx="0" cy="0" r="80" fill="url(#metalGradient)" stroke={colors.boots} strokeWidth="1" filter="url(#depth)" />
                    {/* Texture Overlay */}
                    <circle cx="0" cy="0" r="80" fill="transparent" filter="url(#metalNoise)" opacity="0.3" />
                    
                    {/* Animated Side Vents (Breathing) */}
                    <g className="animate-[breathe_4s_ease-in-out_infinite]">
                         <path d="M-82 -20 L-86 -30 L-86 30 L-82 20 Z" fill="#7f1d1d" opacity="0.8" />
                         <path d="M82 -20 L86 -30 L86 30 L82 20 Z" fill="#7f1d1d" opacity="0.8" />
                         
                         {/* Vent Grills */}
                         <line x1="-84" y1="-10" x2="-84" y2="10" stroke="#991b1b" strokeWidth="1" />
                         <line x1="84" y1="-10" x2="84" y2="10" stroke="#991b1b" strokeWidth="1" />
                    </g>

                    {/* Outer Bezel (Gear Teeth) */}
                    <g className="animate-[spin_60s_linear_infinite]">
                        <circle cx="0" cy="0" r="76" fill="none" stroke="#7f1d1d" strokeWidth="2" strokeDasharray="6 6" />
                        {Array.from({ length: 16 }).map((_, i) => (
                            <rect key={i} x="-4" y="-79" width="8" height="6" fill="#991b1b" transform={`rotate(${i * 22.5})`} />
                        ))}
                    </g>
                    
                    {/* Inner Housing Rim */}
                    <circle cx="0" cy="0" r="68" fill="#e2e8f0" filter="url(#innerGlow)" />

                    {/* --- CLOCK FACE --- */}
                    <g className={bodyAnimClass} style={{ transform: `translate(${centerlineOffset}px, 0) scale(${isCombat ? 0.95 : 1}, 1)` }}> 
                        
                        {/* Glass Background - Made cleaner and more opaque */}
                        <circle cx="0" cy="0" r="64" fill="url(#glassGradient)" stroke="#cbd5e1" strokeWidth="0.5" />

                        {/* INTERNAL MECHANICS (Parallax Layer 1) - Faded significantly */}
                        <g style={{ transform: `translate(${-smoothPupil.x * 0.1}px, ${-smoothPupil.y * 0.1}px)` }} className="animate-[spin_60s_linear_infinite_reverse]">
                            <circle r="55" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 12" opacity="0.2" />
                        </g>

                        {/* CLOCK HANDS (Functional Aesthetic) - Faded to not compete with face */}
                        <g style={{ transform: `translate(${-smoothPupil.x * 0.05}px, ${-smoothPupil.y * 0.05}px)` }} opacity="0.3">
                            <g className="animate-[spin_120s_linear_infinite]">
                                <rect x="-1" y="-35" width="2" height="40" rx="1" fill="#64748b" />
                                <circle cy="0" r="2" fill="#64748b" />
                            </g>
                            <g className="animate-[spin_20s_linear_infinite]">
                                <rect x="-1" y="-50" width="2" height="55" rx="1" fill="#94a3b8" />
                            </g>
                        </g>

                        {/* INTERNAL MECHANICS (Parallax Layer 2 - Ticks) */}
                        <g style={{ transform: `translate(${-smoothPupil.x * 0.1}px, ${-smoothPupil.y * 0.1}px)` }}>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <line key={i} x1="0" y1="-58" x2="0" y2="-54" transform={`rotate(${i * 30})`} stroke="#cbd5e1" strokeWidth="1.5" opacity="0.5" />
                            ))}
                        </g>

                        {/* EYES / FACE UI - High Contrast Layer */}
                        <g>
                            <g transform={`translate(${smoothPupil.x}, ${smoothPupil.y - 5})`}>
                                {isCombat ? (
                                    <>
                                        {/* Combat Eyes */}
                                        <path d="M-22 -4 L-8 4" stroke={colors.eyes} strokeWidth="4" strokeLinecap="round" />
                                        <path d="M22 -4 L8 4" stroke={colors.eyes} strokeWidth="4" strokeLinecap="round" />
                                        
                                        <circle cx="-15" cy="6" r="5" fill={colors.eyes} />
                                        <circle cx="15" cy="6" r="9" fill={colors.eyes} />
                                        
                                        {/* Targeting Reticle Overlay */}
                                        <g className="animate-spin-slow">
                                            <circle cx="15" cy="6" r="14" stroke="#ef4444" strokeWidth="1.5" fill="none" opacity="0.6" strokeDasharray="4 2" />
                                            <line x1="15" y1="-8" x2="15" y2="-4" stroke="#ef4444" strokeWidth="1.5" />
                                            <line x1="15" y1="20" x2="15" y2="16" stroke="#ef4444" strokeWidth="1.5" />
                                        </g>
                                        <circle cx="15" cy="6" r="2" fill="red" className="animate-pulse" />
                                    </>
                                ) : (
                                    <g className={isWalking ? "animate-eye-scan" : isTalking ? "" : "animate-blink"}>
                                        {/* Left Eye */}
                                        <g>
                                            <ellipse cx="-18" cy="0" rx="7" ry="11" fill={colors.eyes} />
                                            {/* Subtler highlight */}
                                            <circle cx="-16" cy="-4" r="3" fill="white" opacity="0.8" />
                                        </g>
                                        
                                        {/* Right Eye */}
                                        <g>
                                            <ellipse cx="18" cy="0" rx="7" ry="11" fill={colors.eyes} />
                                            {/* Subtler highlight */}
                                            <circle cx="20" cy="-4" r="3" fill="white" opacity="0.8" />
                                        </g>
                                    </g>
                                )}
                            </g>
                            {/* Mouth */}
                            <g transform={`translate(${smoothPupil.x * 0.5}, 22)`}>
                                {isCombat ? (
                                    <path d="M-8 4 L8 4" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" />
                                ) : (
                                    <path d="M-8 0 Q0 6 8 0" stroke={colors.eyes} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8" />
                                )}
                            </g>
                        </g>
                        
                        {/* HOLOGRAPHIC VISOR HUD (Curved Overlay) - Reduced Opacity */}
                        <g opacity="0.2" transform={`translate(${-smoothPupil.x * 0.1}, 0)`}>
                            <path d="M-40 -20 Q0 -30 40 -20" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 4" />
                            <path d="M-45 10 Q0 15 45 10" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                        </g>

                        {/* DYNAMIC GLARE - Reduced for clarity */}
                        <path 
                            d="M-50 -50 Q 0 -20 50 -50 A 60 60 0 0 1 -50 -50" 
                            fill="url(#glareGradient)" 
                            style={{ transform: `translate(${-smoothPupil.x * 0.8}px, ${-smoothPupil.y * 0.8}px)` }}
                            opacity="0.3"
                        />
                    </g>

                    {/* 3. WEAPON SYSTEM (PLASMA RIFLE) */}
                    {isCombat && (
                        <g 
                            transform={`translate(${targetBack.x}, ${targetBack.y}) rotate(${gunRotation})`}
                            className="origin-center"
                        >
                            <PlasmaRifle isAiming={isAiming} isFiring={isFiring} colors={colors} />
                        </g>
                    )}

                    {/* 4. FOREGROUND ARM */}
                    <MechanicalArm 
                        shoulder={shoulderFront}
                        target={targetFront}
                        lengths={armLengths}
                        flip={flipFront}
                        colors={colors}
                        isLeft={true} 
                        hasHolo={isIdle} 
                    />

                </g>
                
                {/* --- SENSOR DRONE (Floating Companion) --- */}
                <g transform="translate(100, -60)">
                    <SensorDrone active={isIdle || isAlert || showScanner} />
                </g>

            </g>
        </svg>
    </div>
  );
};