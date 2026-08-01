import React from 'react';
import { NATURE_IMAGE_URL } from '../data';

interface AcuteViewProps {
  onStartBreathing: () => void;
  onFine: () => void;
  onDismiss: () => void;
  onOpenCrisis: () => void;
}

export const AcuteView: React.FC<AcuteViewProps> = ({
  onStartBreathing,
  onFine,
  onDismiss,
  onOpenCrisis,
}) => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-6 py-8 overflow-hidden relative z-10">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="pulse-glow absolute -top-1/4 -left-1/4 w-[80%] h-[80%] bg-indigo-600/10 rounded-full blur-[140px]" />
        <div
          className="pulse-glow absolute -bottom-1/4 -right-1/4 w-[80%] h-[80%] bg-emerald-500/10 rounded-full blur-[140px]"
          style={{ animationDelay: '-4s' }}
        />
      </div>

      {/* Main Content Canvas */}
      <main className="w-full max-w-lg relative z-10 fade-in my-auto">
        {/* Identity Brand Header & Badge */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-full shadow-lg">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-mono text-[11px] font-bold text-rose-400 uppercase tracking-widest">
              Biometric Spike Detected
            </span>
          </div>
        </div>

        {/* Acute Response Card */}
        <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-zinc-800 relative overflow-hidden">
          {/* Glowing Top Edge */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-rose-500 to-indigo-500" />

          {/* Icon Graphic Context */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              <span
                className="material-symbols-outlined text-[42px] text-indigo-400 fill-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-8 space-y-3">
            <h1 className="font-headline text-2xl md:text-3xl font-light text-white leading-snug">
              Elevated heart rate detected.
            </h1>
            <p className="font-body text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
              A 2-minute rhythmic respiration cycle will help reset your parasympathetic nervous system.
            </p>
          </div>

          {/* Actions Stack */}
          <div className="flex flex-col gap-3">
            {/* Primary Action */}
            <button
              onClick={onStartBreathing}
              className="group relative overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white h-[60px] rounded-2xl flex items-center justify-center font-headline font-bold text-base shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-3">
                Begin Guided Breathing
                <span className="material-symbols-outlined text-[24px]">air</span>
              </span>
            </button>

            {/* Secondary Option */}
            <button
              onClick={onFine}
              className="h-[50px] rounded-2xl border border-zinc-800 bg-zinc-950/60 text-zinc-300 font-headline font-semibold text-sm hover:bg-zinc-800 transition-all duration-200 cursor-pointer"
            >
              I am currently calm
            </button>

            {/* Tertiary / Dismiss */}
            <button
              onClick={onDismiss}
              className="h-[40px] text-zinc-500 font-mono text-xs font-semibold uppercase tracking-widest hover:text-zinc-300 transition-colors cursor-pointer mt-1"
            >
              DISMISS ALERT
            </button>
          </div>
        </div>

        {/* Bottom Crisis Guardrail */}
        <div className="mt-8 text-center pb-20">
          <p className="font-body text-xs text-zinc-500 mb-3">In an emergency situation?</p>
          <button
            onClick={onOpenCrisis}
            className="px-6 py-2.5 border border-rose-500/30 rounded-full text-rose-400 font-mono text-xs font-bold uppercase tracking-wider hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            Access Emergency Lifelines
          </button>
        </div>
      </main>
    </div>
  );
};
