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
      className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-500 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
        
        {/* Simple Logo */}
        <div className="relative">
             <div className="absolute inset-0 bg-tva-orange/30 blur-xl rounded-full scale-150 opacity-50"></div>
             <div className="relative w-24 h-24 bg-gradient-to-br from-tva-orange to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/20 transform rotate-3">
                <Clock className="w-12 h-12 text-white" strokeWidth={2.5} />
             </div>
        </div>

        {/* Minimal Text & Loader */}
        <div className="flex flex-col items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight font-sans">Time AI</h1>
            <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce"></div>
            </div>
        </div>

      </div>
    </div>
  );
};
