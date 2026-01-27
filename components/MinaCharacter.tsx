import React, { useState } from 'react';
import { playSound } from '../utils/sound';

interface MinaCharacterProps {
  className?: string;
  variant?: 'idle' | 'thinking' | 'alert' | 'success';
}

export const MinaCharacter: React.FC<MinaCharacterProps> = ({ className, variant = 'idle' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playSound('hover');
  };

  const handleClick = () => {
    playSound('chime');
  };

  // Determine colors and animations based on variant
  const isAlert = variant === 'alert';
  const isThinking = variant === 'thinking';
  const isSuccess = variant === 'success';

  const faceColor = isAlert ? "#7f1d1d" : (isSuccess ? "#064e3b" : "#ea580c"); // Red-900 vs Green-900 vs Orange
  const eyeColor = isAlert ? "#fca5a5" : "#fff";
  
  // Hand animations
  const minuteHandClass = isThinking ? "animate-[spin_0.5s_linear_infinite_reverse]" : (isAlert ? "animate-[pulse_0.2s_infinite]" : "animate-[spin_3s_linear_infinite]");
  const hourHandClass = isThinking ? "animate-[spin_2s_linear_infinite_reverse]" : "animate-[spin_60s_linear_infinite]";

  return (
    <div 
        className={`relative group select-none cursor-pointer transition-all duration-500 ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
    >
        <svg viewBox="0 0 200 240" className={`w-full h-full drop-shadow-2xl overflow-visible transition-transform duration-500 ease-out-expo ${isHovered && !isAlert ? 'scale-105' : 'animate-float'}`}>
            <defs>
                <radialGradient id="faceGradient" cx="0.5" cy="0.4" r="0.6">
                    <stop offset="0%" stopColor={isAlert ? "#ef4444" : (isSuccess ? "#10b981" : "#fb923c")} />
                    <stop offset="80%" stopColor={isAlert ? "#b91c1c" : (isSuccess ? "#059669" : "#ea580c")} />
                    <stop offset="100%" stopColor={isAlert ? "#7f1d1d" : (isSuccess ? "#047857" : "#9a3412")} />
                </radialGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
            </defs>

            {/* Ears */}
            <g transform="translate(0, 10)">
                {/* Left Ear */}
                <g 
                    className={isAlert ? "animate-ear-alert" : "animate-ear-idle"} 
                    style={{ transformOrigin: '25px 90px' }}
                >
                    <path d="M25 70 Q 5 90 25 110" stroke={isAlert ? "#b91c1c" : "#ea580c"} strokeWidth="8" fill={isAlert ? "#ef4444" : "#fb923c"} strokeLinecap="round" />
                    <circle cx="25" cy="90" r="12" fill={isAlert ? "#b91c1c" : "#ea580c"} />
                </g>
                
                {/* Right Ear */}
                <g 
                    className={isAlert ? "animate-[earAlert_0.4s_ease-in-out_infinite_reverse]" : "animate-[earIdle_3s_ease-in-out_infinite_reverse]"}
                    style={{ transformOrigin: '175px 90px' }}
                >
                    <path d="M175 70 Q 195 90 175 110" stroke={isAlert ? "#b91c1c" : "#ea580c"} strokeWidth="8" fill={isAlert ? "#ef4444" : "#fb923c"} strokeLinecap="round" />
                    <circle cx="175" cy="90" r="12" fill={isAlert ? "#b91c1c" : "#ea580c"} />
                </g>
            </g>

            {/* Legs */}
            <path d="M85 180 Q 80 210 70 230" stroke="#f59e0b" strokeWidth="8" fill="none" strokeLinecap="round" />
            <path d="M115 180 Q 120 210 130 230" stroke="#f59e0b" strokeWidth="8" fill="none" strokeLinecap="round" />

            {/* Arms */}
            <g transform="translate(40, 110)">
               <path d={isThinking ? "M10 20 Q 20 0 40 -20" : "M10 20 Q 0 0 -20 -20"} stroke="#f59e0b" strokeWidth="8" fill="none" strokeLinecap="round" className={isThinking ? "animate-pulse" : "mina-arm-left"} />
            </g>
            <g transform="translate(160, 110)">
               <path d={isThinking ? "M-10 20 Q -20 0 -40 -20" : "M-10 20 Q 0 0 20 -20"} stroke="#f59e0b" strokeWidth="8" fill="none" strokeLinecap="round" className={isThinking ? "animate-pulse" : "mina-arm-right"} />
            </g>

            {/* Body */}
            <circle cx="100" cy="100" r="85" fill="#000" className="opacity-20 blur-sm translate-y-2" />
            <circle cx="100" cy="100" r="80" fill="url(#faceGradient)" stroke="#fcd34d" strokeWidth="4" />
            
            {/* Highlight Shine */}
            <ellipse cx="70" cy="60" rx="30" ry="15" fill="#fff" fillOpacity="0.2" transform="rotate(-30 70 60)" />

            {/* Face */}
            <g className="mina-face">
                {/* Eyes */}
                <ellipse cx="75" cy="90" rx="10" ry={isAlert ? "10" : "14"} fill={eyeColor} className={isAlert ? "animate-ping" : "mina-eye"} />
                <ellipse cx="125" cy="90" rx="10" ry={isAlert ? "10" : "14"} fill={eyeColor} className={isAlert ? "animate-ping" : "mina-eye"} />
                
                {/* Pupils */}
                {!isThinking && (
                    <>
                        <circle cx="77" cy="90" r="4" fill="#1a1816" />
                        <circle cx="123" cy="90" r="4" fill="#1a1816" />
                    </>
                )}
                {/* Thinking Eyes (Squint/Dash) */}
                {isThinking && (
                    <>
                        <rect x="65" y="88" width="20" height="4" fill="#1a1816" />
                        <rect x="115" y="88" width="20" height="4" fill="#1a1816" />
                    </>
                )}

                {/* Mouth */}
                {isAlert ? (
                   <circle cx="100" cy="130" r="10" fill="#1a1816" /> // O face
                ) : isThinking ? (
                   <line x1="85" y1="130" x2="115" y2="130" stroke="#fff" strokeWidth="4" /> // Straight line
                ) : isSuccess ? (
                   <path d="M80 125 Q 100 145 120 125" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" /> // Big Smile
                ) : (
                   <path d="M80 125 Q 100 140 120 125" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" /> // Smile
                )}
            </g>

            {/* Clock Hands */}
            <line x1="100" y1="100" x2="100" y2="50" stroke="#fef3c7" strokeWidth="4" strokeLinecap="round" className={`origin-[100px_100px] ${minuteHandClass}`} />
            <line x1="100" y1="100" x2="140" y2="100" stroke="#fef3c7" strokeWidth="4" strokeLinecap="round" className={`origin-[100px_100px] ${hourHandClass}`} />
            <circle cx="100" cy="100" r="5" fill="#fef3c7" />
        </svg>
    </div>
  );
};