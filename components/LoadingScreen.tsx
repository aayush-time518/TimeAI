import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Simple timer for splash screen
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 500); // Wait for fade out
    }, 1200);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 flex items-center justify-center transition-opacity duration-1000 ${exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      {/* Background Atmosphere (Blurred Video) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/time_ai_vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 scale-110"
          style={{ filter: 'saturate(1.3) contrast(1.2) brightness(1.05) blur(64px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-50/20 via-yellow-50/10 to-white/5 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-6">

        {/* Featured Video (Clean & Contained) */}
        <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-gray-900/10 ring-1 ring-white/5 bg-black/40 backdrop-blur-sm">
          <video
            src="/time_ai_vid.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ filter: 'saturate(1.3) contrast(1.2) brightness(1.05)' }}
          />
        </div>

        {/* Loading Indicator */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <h1 className="text-2xl font-black text-gray-900 tracking-tight font-sans opacity-90 drop-shadow-sm">Time AI</h1>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2.5 h-2.5 bg-gray-700 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2.5 h-2.5 bg-gray-700 rounded-full animate-bounce"></div>
          </div>
        </div>

      </div>
    </div>
  );
};
