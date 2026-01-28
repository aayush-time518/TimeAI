import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/sound';

interface MinaCharacterProps {
  className?: string;
  variant?: 'idle' | 'thinking' | 'alert' | 'success' | 'talking';
}

export const MinaCharacter: React.FC<MinaCharacterProps> = ({ className, variant = 'idle' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  // Mouse tracking logic for eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Don't track if thinking (looks focused) or alert (looks panic)
      // When talking, keep eye contact mostly but allow slight movement
      if (variant === 'thinking' || variant === 'alert') {
          setEyePos({ x: 0, y: 0 });
          return;
      }

      const { innerWidth, innerHeight } = window;
      // Calculate normalized position (-1 to 1) relative to center of screen
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      
      // Limit movement range (max 6px offset)
      // If talking, reduce range slightly to keep focus
      const range = variant === 'talking' ? 3 : 6;
      
      setEyePos({ 
        x: Math.max(-range, Math.min(range, x * range)), 
        y: Math.max(-range, Math.min(range, y * range)) 
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [variant]);

  // Natural Blinking Logic (Random intervals)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    // Don't blink if alert (wide eyed) or thinking (squinting)
    if (variant === 'alert' || variant === 'thinking') return;

    const blink = () => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        
        // Random interval between 2s and 6s
        // Blink more often when talking
        const min = variant === 'talking' ? 1500 : 2000;
        const max = variant === 'talking' ? 3000 : 4000;
        const nextBlink = Math.random() * max + min;
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

  // Determine colors and animations based on variant
  const isAlert = variant === 'alert';
  const isThinking = variant === 'thinking';
  const isSuccess = variant === 'success';
  const isTalking = variant === 'talking';

  // Smoother/Slower hands for thinking
  const minuteHandClass = isThinking 
    ? "animate-[spin_1.5s_linear_infinite_reverse]" 
    : (isAlert ? "animate-[pulse_0.2s_infinite]" : "animate-[spin_3s_linear_infinite]");
  
  const hourHandClass = isThinking 
    ? "animate-[spin_6s_linear_infinite_reverse]" 
    : "animate-[spin_60s_linear_infinite]";

  const eyeColor = isAlert ? "#fca5a5" : "#fff";
  const pupilColor = "#1a1816";

  // Common transition for eye movement
  const eyeTransition = { transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)' };

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
            {/* Thinking: Hands on hips/no arms visible? Or crossed? Let's keep relaxed. */}
            <g transform="translate(40, 110)">
               {/* Talking: Maybe small gesture? Keeping simple for now. */}
               <path d={isThinking ? "M10 20 Q 20 10 30 -10" : "M10 20 Q 0 0 -20 -20"} stroke="#f59e0b" strokeWidth="8" fill="none" strokeLinecap="round" className={isThinking ? "" : "mina-arm-left"} />
            </g>
            <g transform="translate(160, 110)">
               <path d={isThinking ? "M-10 20 Q -20 10 -30 -10" : "M-10 20 Q 0 0 20 -20"} stroke="#f59e0b" strokeWidth="8" fill="none" strokeLinecap="round" className={isThinking ? "" : "mina-arm-right"} />
            </g>

            {/* Body Shadow */}
            <circle cx="100" cy="100" r="85" fill="#000" className="opacity-20 blur-sm translate-y-2" />
            {/* Main Face */}
            <circle cx="100" cy="100" r="80" fill="url(#faceGradient)" stroke="#fcd34d" strokeWidth="4" />
            
            {/* Highlight Shine */}
            <ellipse cx="70" cy="60" rx="30" ry="15" fill="#fff" fillOpacity="0.2" transform="rotate(-30 70 60)" />

            {/* Face Components */}
            <g className="mina-face">
                
                {isThinking ? (
                    /* Thinking Eyes (Curved Lines for Squint/Focus) */
                    <g className="animate-pulse">
                        <path d="M65 92 Q 75 98 85 92" stroke="#1a1816" strokeWidth="4" fill="none" strokeLinecap="round" />
                        <path d="M115 92 Q 125 98 135 92" stroke="#1a1816" strokeWidth="4" fill="none" strokeLinecap="round" />
                    </g>
                ) : (
                    /* Normal Eyes with Blinking & Tracking */
                    <>
                        {/* Left Eye Group */}
                        <g 
                            style={{ 
                                ...eyeTransition, 
                                transform: `translate(${eyePos.x}px, ${eyePos.y}px) ${isBlinking ? 'scale(1, 0.1)' : 'scale(1, 1)'}`,
                                transformOrigin: '75px 90px'
                            }}
                        >
                            <ellipse cx="75" cy="90" rx="10" ry={isAlert ? "10" : "14"} fill={eyeColor} />
                            <circle cx="75" cy="90" r="4" fill={pupilColor} />
                        </g>

                        {/* Right Eye Group */}
                        <g 
                            style={{ 
                                ...eyeTransition, 
                                transform: `translate(${eyePos.x}px, ${eyePos.y}px) ${isBlinking ? 'scale(1, 0.1)' : 'scale(1, 1)'}`,
                                transformOrigin: '125px 90px'
                            }}
                        >
                            <ellipse cx="125" cy="90" rx="10" ry={isAlert ? "10" : "14"} fill={eyeColor} />
                            <circle cx="125" cy="90" r="4" fill={pupilColor} />
                        </g>
                    </>
                )}

                {/* Mouth Logic */}
                {isAlert ? (
                   <circle cx="100" cy="130" r="8" fill="#1a1816" /> // O face
                ) : isThinking ? (
                   // Pursed lips for thinking
                   <path d="M90 130 H 110" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
                ) : isTalking ? (
                   // Animated talking mouth
                   <g>
                     <path d="M85 130 Q 100 145 115 130" stroke="#fff" strokeWidth="4" fill="#1a1816" strokeLinecap="round">
                        <animate attributeName="d" 
                                 values="M85 130 Q 100 130 115 130; M85 130 Q 100 150 115 130; M85 130 Q 100 130 115 130" 
                                 dur="0.25s" 
                                 repeatCount="indefinite" />
                     </path>
                   </g>
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
