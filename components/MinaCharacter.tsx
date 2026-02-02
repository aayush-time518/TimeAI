import React, { useEffect, useState } from 'react';

interface MinaCharacterProps {
  className?: string;
  variant?: 'idle' | 'walking' | 'thinking' | 'alert' | 'success' | 'talking' | 'aiming' | 'firing';
  eyeTarget?: { x: number; y: number } | null;
  showScanner?: boolean;
}

// --- IK SOLVER HELPER ---
// Solves 2-Bone IK for an arm
// Returns the Elbow coordinate.
const solveIK = (shoulder: {x: number, y: number}, target: {x: number, y: number}, lengths: {L1: number, L2: number}, flip: boolean = false) => {
    const dx = target.x - shoulder.x;
    const dy = target.y - shoulder.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Clamp reach to prevent breaking if target is too far
    const reach = Math.min(dist, lengths.L1 + lengths.L2 - 0.1);
    
    // Law of Cosines to find angle at shoulder
    const a = (lengths.L1 * lengths.L1 - lengths.L2 * lengths.L2 + reach * reach) / (2 * reach);
    const h = Math.sqrt(Math.max(0, lengths.L1 * lengths.L1 - a * a));
    
    // Midpoint on line from shoulder to target
    const x2 = shoulder.x + a * (dx / reach);
    const y2 = shoulder.y + a * (dy / reach);
    
    // Elbow coordinates
    // 'flip' determines which of the two circle intersections we pick
    const elbowX = flip ? x2 + h * (dy / reach) : x2 - h * (dy / reach);
    const elbowY = flip ? y2 - h * (dx / reach) : y2 + h * (dx / reach);

    return { x: elbowX, y: elbowY };
};

// Helper to rotate a point around a pivot
const rotatePoint = (point: {x: number, y: number}, angleDeg: number) => {
    const rad = angleDeg * Math.PI / 180;
    return {
        x: point.x * Math.cos(rad) - point.y * Math.sin(rad),
        y: point.x * Math.sin(rad) + point.y * Math.cos(rad)
    };
};

export const MinaCharacter: React.FC<MinaCharacterProps> = ({ className, variant = 'idle', eyeTarget, showScanner = false }) => {
  
  const colors = {
    body: '#dc2626',      
    face: '#ffffff',      
    limbs: '#1e293b',     
    gloves: '#f8fafc',
    boots: '#0f172a',
    eyes: '#0f172a',
    gunBody: '#334155',     // Dark Slate
    gunAccent: '#cbd5e1',   // Light Metallic
    gunGlow: '#3b82f6',     // Electric Blue
    gunHeat: '#ef4444',     // Red Hot
    gunDark: '#0f172a',
  };

  const isWalking = variant === 'walking';
  const isAiming = variant === 'aiming'; 
  const isFiring = variant === 'firing'; 
  const isSuccess = variant === 'success';
  const isAlert = variant === 'alert';
  const isTalking = variant === 'talking';
  const isCombat = isAiming || isFiring;

  // --- CONFIGURATION ---
  const centerlineOffset = isCombat ? 12 : 0; 
  
  // Eye Tracking
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
      if (!eyeTarget) {
          setPupilOffset({ x: 0, y: 0 });
          return;
      }
      const combatBias = isCombat ? 8 : 0;
      const x = Math.max(-8, Math.min(8, (eyeTarget.x - 50) * 0.3)) + combatBias; 
      const y = Math.max(-4, Math.min(4, (eyeTarget.y - 50) * 0.2));
      setPupilOffset({ x, y });
  }, [eyeTarget, isCombat]);


  // --- UNIVERSAL RIGGING SYSTEM ---
  
  // 1. Static Anchors (Shoulders)
  // These never move relative to the body group, ensuring perfect attachment.
  const shoulderFront = { x: -42, y: 6 }; 
  const shoulderBack = { x: 38, y: 6 };

  // 2. Determine Targets based on State
  let targetFront = { x: -55, y: 55 }; // Default Idle
  let targetBack = { x: 55, y: 55 };   // Default Idle
  let gunRotation = 0;
  
  // Elbow Flip States (Controls bend direction)
  // Default: Front arm bends left (false), Back arm bends right (true) for "A-pose" relaxation
  let flipFront = false; 
  let flipBack = true; 

  if (isSuccess) {
      // Cheering Pose
      targetFront = { x: -75, y: -40 };
      targetBack = { x: 75, y: -40 };
      flipFront = true; // Elbows Up
      flipBack = false; // Elbows Up
  } else if (isCombat) {
      // --- COMBAT RECOIL MATH ---
      const baseGripX = 45;
      const baseGripY = 10;
      
      const recoilX = isFiring ? -18 : 0;
      const recoilY = isFiring ? -4 : 0;
      gunRotation = isFiring ? -15 : 0;

      const gripPos = { x: baseGripX + recoilX, y: baseGripY + recoilY };
      
      const foregripOffset = { x: 50, y: 0 }; 
      const rotatedOffset = rotatePoint(foregripOffset, gunRotation);
      const foregripPos = { x: gripPos.x + rotatedOffset.x, y: gripPos.y + rotatedOffset.y };

      targetFront = gripPos;
      targetBack = foregripPos;
      
      // Combat Elbows (Both usually bend down/out)
      flipFront = false;
      flipBack = false; 
  }

  // 3. Solve IK for Both Arms
  // We use the same solver for Idle, Success, and Combat. 
  // This guarantees the <path> 'd' attribute is always compatible for CSS transitions.
  const armFront = solveIK(shoulderFront, targetFront, { L1: 40, L2: 38 }, flipFront);
  const armBack = solveIK(shoulderBack, targetBack, { L1: 40, L2: 38 }, flipBack);

  // Transition Styles
  // 'transition-all' on SVG paths allows the browser to interpolate the 'd' attribute 
  // (supported in most modern browsers if point count matches M-L-L)
  const animClass = isFiring ? "transition-none" : "transition-all duration-500 ease-out-expo";
  const bodyAnimClass = isFiring ? "transition-transform duration-75 ease-out" : "transition-transform duration-500 ease-out-expo";

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
        
        {/* --- EMOTION BUBBLES --- */}
        {isAlert && (
             <div className="absolute top-[-10%] right-0 animate-float-bubble z-50">
                 <div className="bg-white border-4 border-tva-orange text-tva-orange font-black rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg pb-1">!</div>
             </div>
        )}
        {isSuccess && (
             <div className="absolute top-[-10%] right-0 animate-float-bubble z-50">
                 <div className="bg-white border-4 border-green-500 text-green-500 font-black rounded-full w-12 h-12 flex items-center justify-center text-2xl shadow-lg">✓</div>
             </div>
        )}

        <svg viewBox="0 0 200 240" className="w-full h-full relative z-10 overflow-visible">
            
            {/* --- SCANNER CONE --- */}
            <g className={`transition-opacity duration-300 ${showScanner ? 'opacity-100' : 'opacity-0'}`} style={{ pointerEvents: 'none' }}>
                <defs>
                    <linearGradient id="scanGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                </defs>
                <path 
                    d="M100 100 L 400 60 L 400 140 Z" 
                    fill="url(#scanGradient)" 
                    transform={`translate(${centerlineOffset}, 0) rotate(${pupilOffset.y * 2} 100 100)`}
                    className="animate-pulse"
                />
            </g>

            {/* --- LEGS --- */}
            <g transform="translate(100, 160)">
                <g className={isWalking ? "animate-[walkLegL_0.6s_ease-in-out_infinite]" : "transition-all duration-500"}>
                    <path 
                        d={isCombat ? "M-15 0 L-35 50" : isWalking ? "M-20 0 Q-35 25 -20 50" : "M-20 0 L-20 50"} 
                        stroke={colors.limbs} strokeWidth="14" fill="none" strokeLinecap="round" 
                    />
                    <path 
                        d={isCombat ? "M-45 50 L-25 50 L-25 60 L-45 60 Z" : "M-30 50 L-10 50 L-10 60 L-30 60 Z"} 
                        fill={colors.boots} 
                        transform={isCombat ? "rotate(-15 -35 50)" : ""}
                    />
                </g>
                <g className={isWalking ? "animate-[walkLegR_0.6s_ease-in-out_infinite]" : "transition-all duration-500"}>
                    <path 
                        d={isCombat ? "M15 0 L35 50" : isWalking ? "M20 0 Q35 25 20 50" : "M20 0 L20 50"} 
                        stroke={colors.limbs} strokeWidth="14" fill="none" strokeLinecap="round" 
                    />
                    <path 
                        d={isCombat ? "M25 50 L45 50 L45 60 L25 60 Z" : "M10 50 L30 50 L30 60 L10 60 Z"} 
                        fill={colors.boots} 
                        transform={isCombat ? "rotate(15 35 50)" : ""}
                    />
                </g>
            </g>

            {/* --- UPPER BODY GROUP --- */}
            <g 
                className={`origin-bottom ${bodyAnimClass}`}
                style={{ transform: isFiring ? 'translate(-4px, 2px) rotate(-2deg)' : 'translate(0,0)' }}
            >
                {/* 1. BACKGROUND ARM (Left Character Arm / Foregrip Hand) */}
                <g transform="translate(100, 100)">
                    {/* IK Arm Path */}
                    <path 
                        d={`M${shoulderBack.x} ${shoulderBack.y} L${armBack.x} ${armBack.y} L${targetBack.x} ${targetBack.y}`}
                        stroke={colors.limbs} strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"
                        className={animClass}
                        opacity={isCombat ? 0.8 : 1} 
                    />
                    {/* Hand Circle */}
                    <circle 
                        cx={targetBack.x} cy={targetBack.y} r={isCombat ? 10 : 14} 
                        fill={colors.gloves} stroke={colors.limbs} strokeWidth="2"
                        className={animClass}
                    />
                </g>

                {/* 2. TORSO & HEAD */}
                <g transform="translate(100, 100)">
                    <circle cx="0" cy="0" r="65" fill={colors.body} stroke={colors.limbs} strokeWidth="5" />
                    <path d="M45 0 A 45 65 0 0 1 0 65 A 65 65 0 0 0 65 0 Z" fill="rgba(0,0,0,0.15)" />

                    {/* Face Plate */}
                    <g 
                        className={bodyAnimClass}
                        style={{ transform: `translate(${centerlineOffset}px, 0) scale(${isCombat ? 0.95 : 1}, 1)` }}
                    > 
                        <circle cx="0" cy="0" r="52" fill={colors.face} />
                        {/* Clock Marks */}
                        {Array.from({ length: 12 }).map((_, i) => (
                            <line key={i} x1="0" y1="-44" x2="0" y2="-40" transform={`rotate(${i * 30})`} stroke={colors.limbs} strokeWidth="3" opacity="0.3" />
                        ))}

                        {/* EXPRESSION */}
                        <g>
                            <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y - 5})`}>
                                {isCombat ? (
                                    <>
                                        <path d="M-22 -2 L-8 2" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" />
                                        <circle cx="-15" cy="4" r="3" fill={colors.eyes} />
                                        <circle cx="15" cy="4" r="6" fill={colors.eyes} />
                                        <circle cx="15" cy="4" r="2" fill="white" />
                                        {/* Targeting Reticle Overlay */}
                                        <g className="animate-spin-slow">
                                            <circle cx="15" cy="4" r="11" stroke="#ef4444" strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="4 2" />
                                            <line x1="15" y1="-8" x2="15" y2="-6" stroke="#ef4444" strokeWidth="1" />
                                            <line x1="15" y1="16" x2="15" y2="14" stroke="#ef4444" strokeWidth="1" />
                                        </g>
                                    </>
                                ) : (
                                    <g className={isWalking ? "animate-eye-scan" : isTalking ? "" : "animate-blink"}>
                                        <ellipse cx="-15" cy="0" rx="6" ry="9" fill={colors.eyes} />
                                        <ellipse cx="15" cy="0" rx="6" ry="9" fill={colors.eyes} />
                                        <g>
                                            <circle cx="-12" cy="-3" r="3" fill="white" />
                                            <circle cx="18" cy="-3" r="3" fill="white" />
                                        </g>
                                    </g>
                                )}
                            </g>

                            {/* Mouth */}
                            <g transform={`translate(${pupilOffset.x * 0.5}, 18)`}>
                                {isCombat ? (
                                    <path d="M-5 2 L5 2" stroke={colors.eyes} strokeWidth="3" strokeLinecap="round" />
                                ) : (
                                    <path d="M-6 0 Q0 4 6 0" stroke={colors.eyes} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                )}
                            </g>
                        </g>
                    </g>
                </g>

                {/* 3. GUN GROUP (Visible only in Combat, Attached to Front Hand Target) */}
                <g 
                    transform={`translate(100, 100) translate(${targetFront.x}, ${targetFront.y}) rotate(${gunRotation})`}
                    className={`${animClass} ${isCombat ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                >
                        {/* Gun Body */}
                        <path d="M-10 -15 L60 -15 L60 15 L-10 15 Z" fill={colors.gunBody} stroke={colors.limbs} strokeWidth="2" />
                        <path d="M-10 -15 L10 -25 L70 -25 L60 -15 Z" fill={colors.gunAccent} stroke={colors.limbs} strokeWidth="1" />
                        
                        {/* Grip Base */}
                        <rect x="-8" y="5" width="16" height="20" rx="4" fill={colors.gunDark} />

                        {/* Recoil Slide */}
                        <g className={`transition-transform duration-75 ease-out`} style={{ transform: isFiring ? 'translateX(-25px)' : 'translateX(0)' }}>
                            <rect x="-5" y="-12" width="30" height="24" rx="2" fill={colors.gunDark} stroke={colors.gunAccent} strokeWidth="1" />
                            {/* Heat Vents */}
                            <rect x="0" y="-8" width="20" height="3" fill={isFiring ? colors.gunHeat : colors.gunGlow} className={isAiming ? "animate-pulse" : ""} />
                            <rect x="0" y="5" width="20" height="3" fill={isFiring ? colors.gunHeat : colors.gunGlow} className={isAiming ? "animate-pulse" : ""} />
                        </g>

                        {/* Barrel */}
                        <rect x="60" y="-8" width="20" height="16" fill={colors.gunAccent} stroke={colors.limbs} strokeWidth="1" />
                        
                        {/* Muzzle Glow */}
                        {isAiming && (
                        <g transform="translate(80, 0)">
                            <circle r="12" fill={colors.gunGlow} opacity="0.2" className="animate-ping" />
                            <circle r="4" fill={colors.gunGlow} opacity="0.8" />
                        </g>
                        )}

                        {/* Heat Sink Ejection Particle */}
                        {isFiring && (
                            <rect x="10" y="-30" width="8" height="4" fill="yellow" className="animate-[floatBubble_0.3s_ease-out_forwards]" />
                        )}
                </g>

                {/* 4. FOREGROUND ARM (Right Character Arm / Grip Hand) */}
                <g transform="translate(100, 100)">
                     {/* Shoulder Joint */}
                     <circle cx={shoulderFront.x} cy={shoulderFront.y} r="13" fill={colors.body} stroke={colors.limbs} strokeWidth="2" />
                     
                     {/* IK Arm Path */}
                     <path 
                        d={`M${shoulderFront.x} ${shoulderFront.y} L${armFront.x} ${armFront.y} L${targetFront.x} ${targetFront.y}`}
                        stroke={colors.limbs} strokeWidth="14" fill="none" strokeLinecap="round" strokeLinejoin="round"
                        className={animClass}
                     />

                     {/* Elbow Detail */}
                     <circle cx={armFront.x} cy={armFront.y} r="6" fill={colors.limbs} className={animClass} />

                     {/* Hand Over Grip (Hides Seam) */}
                     <circle 
                        cx={targetFront.x} cy={targetFront.y} r={isCombat ? 12 : 14} 
                        fill={colors.gloves} stroke={colors.limbs} strokeWidth="2"
                        className={animClass}
                     />
                </g>

            </g>
        </svg>
    </div>
  );
};