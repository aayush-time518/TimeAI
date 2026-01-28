
let muted = false;

// Initialize from storage if available
try {
  const stored = localStorage.getItem('tva_muted');
  if (stored !== null) {
    muted = stored === 'true';
  }
} catch (e) {
  console.warn('LocalStorage access denied');
}

export const isMuted = () => muted;

export const toggleMute = () => {
  muted = !muted;
  try {
    localStorage.setItem('tva_muted', muted.toString());
  } catch (e) {}
  return muted;
};

export const playSound = (type: 'tick' | 'chime' | 'hover' | 'alert' | 'pop') => {
  if (muted) return;

  // Prevent sounds if user hasn't interacted with page yet (browser policy), 
  // but usually click handlers allow this.
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;
  
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  osc.connect(gain);
  gain.connect(ctx.destination);
  
  const now = ctx.currentTime;
  
  if (type === 'tick') {
    // Mechanical clock tick
    osc.type = 'square';
    osc.frequency.setValueAtTime(2000, now);
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    osc.start(now);
    osc.stop(now + 0.03);
  } else if (type === 'chime') {
    // Friendly assistant opening sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(1000, now + 0.2);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1);
    osc.start(now);
    osc.stop(now + 1);
  } else if (type === 'hover') {
    // Subtle hover interaction
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, now);
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.05);
    osc.start(now);
    osc.stop(now + 0.05);
  } else if (type === 'alert') {
    // Error or alert sound
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(100, now + 0.3);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  } else if (type === 'pop') {
    // Message sent/received
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.1);
  }
};
