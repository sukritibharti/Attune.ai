import React, { useState, useEffect, useRef } from 'react';

interface BreathingExerciseProps {
  onClose: () => void;
  title?: string;
  targetMinutes?: number;
}

type Phase = 'inhale' | 'hold' | 'exhale' | 'pause';

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  onClose,
  title = 'Paced Breathing',
  targetMinutes = 2,
}) => {
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [secondsInPhase, setSecondsInPhase] = useState(4);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [roundsCompleted, setRoundsCompleted] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Audio Context for gentle chime
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTone = (freq: number) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio fallback
    }
  };

  const totalTargetSeconds = targetMinutes * 60;

  useEffect(() => {
    if (!isActive || isCompleted) return;

    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        const next = prev + 1;
        if (next >= totalTargetSeconds) {
          setIsCompleted(true);
          setIsActive(false);
        }
        return next;
      });

      setSecondsInPhase((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition phase
        if (phase === 'inhale') {
          setPhase('hold');
          playTone(523.25); // C5
          return 4;
        } else if (phase === 'hold') {
          setPhase('exhale');
          playTone(392.0); // G4
          return 4;
        } else if (phase === 'exhale') {
          setPhase('pause');
          playTone(329.63); // E4
          return 2;
        } else {
          setPhase('inhale');
          setRoundsCompleted((r) => r + 1);
          playTone(440.0); // A4
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase, isCompleted, isMuted, totalTargetSeconds]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhale deeply...';
      case 'hold':
        return 'Hold gently...';
      case 'exhale':
        return 'Exhale slowly...';
      case 'pause':
        return 'Rest...';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale':
        return 'scale-125 bg-indigo-600/30 border-indigo-500 text-indigo-300 shadow-[0_0_30px_rgba(79,70,229,0.4)]';
      case 'hold':
        return 'scale-125 bg-indigo-500/40 border-indigo-400 text-white shadow-[0_0_40px_rgba(79,70,229,0.6)]';
      case 'exhale':
        return 'scale-90 bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]';
      case 'pause':
        return 'scale-100 bg-zinc-800/80 border-zinc-700 text-zinc-400';
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#09090b]/95 backdrop-blur-2xl flex flex-col items-center justify-between p-6 fade-in overflow-y-auto">
      {/* Top Header */}
      <div className="w-full max-w-md flex items-center justify-between pt-4 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-400">air</span>
          <h2 className="font-headline text-lg font-bold text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Toggle Sound"
          >
            <span className="material-symbols-outlined text-lg">
              {isMuted ? 'volume_off' : 'volume_up'}
            </span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      {/* Main Exercise Canvas */}
      {!isCompleted ? (
        <div className="w-full max-w-md my-auto flex flex-col items-center justify-center py-8 text-center space-y-8">
          {/* Animated Breathing Circle */}
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer Pulsing Glow */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-[4000ms] ease-in-out blur-2xl opacity-50 ${
                phase === 'inhale' ? 'bg-indigo-600 scale-150' : 'bg-emerald-500 scale-90'
              }`}
            />
            {/* Inner Interactive Ring */}
            <div
              className={`w-48 h-48 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-[3800ms] ease-in-out shadow-2xl ${getCircleScale()}`}
            >
              <span className="material-symbols-outlined text-4xl mb-1">
                air
              </span>
              <span className="font-headline text-5xl font-light tracking-tighter text-white">
                {secondsInPhase}
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-widest mt-1">
                {phase}
              </span>
            </div>
          </div>

          {/* Phase Guidance Text */}
          <div className="space-y-2">
            <h3 className="font-headline text-2xl font-light text-white">
              {getPhaseText()}
            </h3>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              ROUND {roundsCompleted + 1} • {formatTime(totalSeconds)} / {formatTime(totalTargetSeconds)}
            </p>
          </div>

          {/* Play / Pause Control */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-headline font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">
                {isActive ? 'pause' : 'play_arrow'}
              </span>
              {isActive ? 'PAUSE' : 'RESUME'}
            </button>
            <button
              onClick={() => setIsCompleted(true)}
              className="px-6 py-3.5 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-2xl font-headline font-semibold text-xs hover:border-zinc-700 transition-all cursor-pointer"
            >
              COMPLETE
            </button>
          </div>
        </div>
      ) : (
        /* Completion View */
        <div className="w-full max-w-md my-auto flex flex-col items-center justify-center text-center space-y-6 py-8">
          <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-[0_0_30px_rgba(79,70,229,0.3)] animate-pulse">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-headline text-3xl font-light text-white">
              Protocol Complete
            </h3>
            <p className="font-body text-sm text-zinc-400 px-4 leading-relaxed">
              You completed {formatTime(totalSeconds)} of guided breath work. Your nervous system is settling into equilibrium.
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-xl w-full space-y-2 text-left">
            <p className="font-mono text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              Somatic Check
            </p>
            <p className="font-body text-sm text-zinc-200 leading-relaxed">
              Notice any subtle shifts in shoulder tension, heart rate, or mental speed right now.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-headline font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all cursor-pointer"
          >
            RETURN TO DASHBOARD
          </button>
        </div>
      )}
    </div>
  );
};
