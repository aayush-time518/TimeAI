import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/sound';

interface MinaCharacterProps {
  className?: string;
  variant?: 'idle' | 'thinking' | 'alert' | 'success' | 'talking';
}

export const MinaCharacter: React.FC<MinaCharacterProps> = ({ className, variant = 'idle' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  
  // Direct DOM Refs for High Performance Animation
  const leftEyeRef = useRef<SVGGElement>(null);
  const rightEyeRef = useRef<SVGGElement>(null);

  // Animation State Refs
  const targetEyePos = useRef({ x: 0, y: 0 });
  const currentEyePos = useRef({ x: 0, y: 0 });

  // 1. Capture Mouse Target (Lightweight)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Don't track if thinking or alert (character is focused elsewhere)
      if (variant === 'thinking' || variant === 'alert') {
          targetEyePos.current = { x: 0, y: 0 };
          return;
      }

      const { innerWidth, innerHeight } = window;
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      
      // Circular constraint logic
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxInteractionDist = Math.min(innerWidth, innerHeight) / 2; 
      const factor = Math.min(dist / maxInteractionDist, 1);
      
      // Max range in pixels
      const range = variant === 'talking' ? 3 : 10; 
      
      targetEyePos.current = { 
        x: Math.cos(angle) * (range * factor), 
        y: Math.sin(angle) * (range * factor) 
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [variant]);

  // 2. Animation Loop (LERP) with Direct DOM Updates
  useEffect(() => {
    let rafId: number;
    
    const animate = () => {
        // If variant changes to thinking/alert, force target to 0 immediately in logic
        const target = (variant === 'thinking' || variant === 'alert') 
            ? { x: 0, y: 0 } 
            : targetEyePos.current;

        // "Ease" factor: 0.08 creates a nice weight
        const ease = 0.08; 

        const dx = target.x - currentEyePos.current.x;
        const dy = target.y - currentEyePos.current.y;

        // Apply movement if distance is significant
        if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
            currentEyePos.current.x += dx * ease;
            currentEyePos.current.y += dy * ease;
            
            // Apply transform directly to DOM elements
            if (leftEyeRef.current) {
                leftEyeRef.current.style.transform = `translate(${currentEyePos.current.x}px, ${currentEyePos.current.y}px) scale(1, ${isBlinking ? 0.1 : 1})`;
            }
            if (rightEyeRef.current) {
                rightEyeRef.current.style.transform = `translate(${currentEyePos.current.x}px, ${currentEyePos.current.y}px) scale(1, ${isBlinking ? 0.1 : 1})`;
            }
        } else if (isBlinking) {
             // Still need to update for blinking even if not moving
             if (leftEyeRef.current) {
                leftEyeRef.current.style.transform = `translate(${currentEyePos.current.x}px, ${currentEyePos.current.y}px) scale(1, 0.1)`;
            }
            if (rightEyeRef.current) {
                rightEyeRef.current.style.transform = `translate(${currentEyePos.current.x}px, ${currentEyePos.current.y}px) scale(1, 0.1)`;
            }
        } else {
             // Reset scale when not blinking and stationary
             if (leftEyeRef.current) {
                leftEyeRef.current.style.transform = `translate(${currentEyePos.current.x}px, ${currentEyePos.current.y}px) scale(1, 1)`;
            }
            if (rightEyeRef.current) {
                rightEyeRef.current.style.transform = `translate(${currentEyePos.current.x}px, ${currentEyePos.current.y}px) scale(1, 1)`;
            }
        }

        rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [variant, isBlinking]);

  // Natural Blinking Logic
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    if (variant === 'alert' || variant === 'thinking') return;

    const blink = () => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
        
        const min = variant === 'talking' ? 2000 : 3000;
        const max = variant === 'talking' ? 4000 : 7000;
        const nextBlink = Math.random() * (max - min) + min;
        timeoutId = setTimeout(blink, nextBlink);
    };

    const initialDelay = Math.random() * 2000 + 1000;
    timeoutId = setTimeout(blink, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [variant]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound('hover');
  };

  const handleClick = () => {
    playSound('chime');
  };

  // Determine colors and animations
  const isAlert = variant === 'alert';
  const isThinking = variant === 'thinking';
  const isSuccess = variant === 'success';
  const isTalking = variant === 'talking';

  const minuteHandClass = isThinking 
    ? "animate-[spin_3s_ease-in-out_infinite_reverse]" 
    : (isAlert ? "animate-[pulse_0.2s_infinite]" : "animate-[spin_3s_linear_infinite]");
  
  const hourHandClass = isThinking 
    ? "animate-[spin_12s_ease-in-out_infinite_reverse]" 
    : "animate-[spin_60s_linear_infinite]";

  const primaryColor = isAlert ? "#ef4444" : (isSuccess ? "#10b981" : "#2563eb");
  const secondaryColor = isAlert ? "#b91c1c" : (isSuccess ? "#059669" : "#0ea5e9");
  const strokeColor = "#1e40af";

  return (
    <div 
        className={`relative group select-none cursor-pointer transition-transform duration-700 ease-out-expo ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
    >
        <svg viewBox="0 0 200 240" className={`w-full h-full drop-shadow-2xl overflow-visible transition-transform duration-700 ease-out-expo ${isHovered && !isAlert ? 'scale-105' : 'animate-float'}`}>
            <defs>
                <radialGradient id="faceGradient" cx="0.5" cy="0.4" r="0.6">
                    <stop offset="0%" stopColor={isAlert ? "#ef4444" : (isSuccess ? "#10b981" : "#60a5fa")} />
                    <stop offset="100%" stopColor={isAlert ? "#7f1d1d" : (isSuccess ? "#047857" : "#2563eb")} />
                </radialGradient>
            </defs>

            {/* Ears */}
            <g transform="translate(0, 10)">
                <g 
                    className={isAlert ? "animate-ear-alert" : "animate-ear-idle"} 
                    style={{ transformOrigin: '25px 90px' }}
                >
                    <path d="M25 70 Q 5 90 25 110" stroke={primaryColor} strokeWidth="8" fill={secondaryColor} strokeLinecap="round" />
                    <circle cx="25" cy="90" r="12" fill={primaryColor} />
                </g>
                <g 
                    className={isAlert ? "animate-[earAlert_0.4s_ease-in-out_infinite_reverse]" : "animate-[earIdle_3s_ease-in-out_infinite_reverse]"}
                    style={{ transformOrigin: '175px 90px' }}
                >
                    <path d="M175 70 Q 195 90 175 110" stroke={primaryColor} strokeWidth="8" fill={secondaryColor} strokeLinecap="round" />
                    <circle cx="175" cy="90" r="12" fill={primaryColor} />
                </g>
            </g>

            {/* Legs */}
            <path d="M85 180 Q 80 210 70 230" stroke={strokeColor} strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M115 180 Q 120 210 130 230" stroke={strokeColor} strokeWidth="8" fill="none" strokeLinecap="round" />

            {/* Arms */}
            <g transform="translate(40, 110)">
               <path d={isThinking ? "M10 20 Q 20 10 30 -10" : "M10 20 Q 0 0 -20 -20"} stroke={strokeColor} strokeWidth="8" fill="none" strokeLinecap="round" className={isThinking ? "" : "mina-arm-left"} />
            </g>
            <g transform="translate(160, 110)">
               <path d={isThinking ? "M-10 20 Q -20 10 -30 -10" : "M-10 20 Q 0 0 20 -20"} stroke={strokeColor} strokeWidth="8" fill="none" strokeLinecap="round" className={isThinking ? "" : "mina-arm-right"} />
            </g>

            {/* Body Shadow */}
            <circle cx="100" cy="100" r="85" fill="#000" className="opacity-10 blur-sm translate-y-2" />
            {/* Main Face */}
            <circle cx="100" cy="100" r="80" fill="url(#faceGradient)" stroke="#fff" strokeWidth="4" />
            
            {/* Highlight Shine */}
            <ellipse cx="70" cy="60" rx="30" ry="15" fill="#fff" fillOpacity="0.4" transform="rotate(-30 70 60)" />

            {/* Face Components */}
            <g className="mina-face">
                {isThinking ? (
                    <g className="opacity-90">
                        <path d="M65 94 Q 75 100 85 94" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
                        <path d="M115 94 Q 125 100 135 94" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </g>
                ) : (
                    <>
                        {/* Eyes - Controlled via Ref for Physics */}
                        <g ref={leftEyeRef} style={{ transformOrigin: '75px 90px' }}>
                            <ellipse cx="75" cy="90" rx="10" ry={isAlert ? "10" : "14"} fill="#fff" />
                            <circle cx="75" cy="90" r="4" fill="#1e293b" />
                        </g>
                        <g ref={rightEyeRef} style={{ transformOrigin: '125px 90px' }}>
                            <ellipse cx="125" cy="90" rx="10" ry={isAlert ? "10" : "14"} fill="#fff" />
                            <circle cx="125" cy="90" r="4" fill="#1e293b" />
                        </g>
                    </>
                )}

                {/* Mouth */}
                {isAlert ? (
                   <circle cx="100" cy="130" r="8" fill="#fff" />
                ) : isThinking ? (
                   <path d="M90 130 H 110" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
                ) : isTalking ? (
                   <g>
                     <path d="M85 130 Q 100 145 115 130" stroke="#fff" strokeWidth="4" fill="#1a1816" strokeLinecap="round">
                        <animate attributeName="d" 
                                 values="M85 130 Q 100 130 115 130; M85 130 Q 100 150 115 130; M85 130 Q 100 130 115 130" 
                                 dur="0.25s" 
                                 repeatCount="indefinite" />
                     </path>
                   </g>
                ) : isSuccess ? (
                   <path d="M80 125 Q 100 145 120 125" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
                ) : (
                   <path d="M80 125 Q 100 140 120 125" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
                )}
            </g>

            {/* Clock Hands */}
            <line x1="100" y1="100" x2="100" y2="50" stroke="#fff" strokeWidth="4" strokeLinecap="round" className={`origin-[100px_100px] ${minuteHandClass}`} />
            <line x1="100" y1="100" x2="140" y2="100" stroke="#fff" strokeWidth="4" strokeLinecap="round" className={`origin-[100px_100px] ${hourHandClass}`} />
            <circle cx="100" cy="100" r="5" fill="#fff" />
        </svg>
    </div>
  );
};