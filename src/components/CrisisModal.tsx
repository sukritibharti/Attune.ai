import React from 'react';

interface CrisisModalProps {
  onClose: () => void;
  onStartBreathing: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ onClose, onStartBreathing }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 fade-in">
      <div className="bg-zinc-900 w-full max-w-lg rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-rose-900/40 space-y-6 max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <span className="material-symbols-outlined text-xl">emergency_home</span>
            </div>
            <div>
              <h3 className="font-headline text-lg font-bold text-white">
                Crisis Support Shield
              </h3>
              <p className="font-mono text-xs text-rose-400">FREE • CONFIDENTIAL • 24/7</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Primary Hotlines */}
        <div className="space-y-3">
          <a
            href="tel:988"
            className="flex items-center justify-between p-4 bg-rose-950/40 rounded-2xl border border-rose-500/30 hover:border-rose-400 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-rose-400">call</span>
              <div>
                <p className="font-headline font-bold text-white text-base">
                  988 Suicide & Crisis Lifeline
                </p>
                <p className="font-mono text-xs text-rose-300">
                  Call or Text 988 (US & Canada)
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-rose-400 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </a>

          <a
            href="sms:741741?body=HOME"
            className="flex items-center justify-between p-4 bg-zinc-950/70 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-2xl text-indigo-400">sms</span>
              <div>
                <p className="font-headline font-semibold text-white text-base">
                  Crisis Text Line
                </p>
                <p className="font-mono text-xs text-zinc-400">Text HOME to 741741</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-zinc-500 group-hover:translate-x-1 transition-transform">
              chevron_right
            </span>
          </a>
        </div>

        {/* Immediate Grounding Prompt */}
        <div className="bg-indigo-950/40 p-5 rounded-2xl border border-indigo-500/30 space-y-3">
          <p className="font-headline text-sm font-bold text-white">
            Immediate Somatic Resets
          </p>
          <p className="font-body text-xs text-zinc-300 leading-relaxed">
            Place feet flat on the floor. Unclench your jaw and gently drop your shoulders away from your ears.
          </p>
          <button
            onClick={() => {
              onClose();
              onStartBreathing();
            }}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-headline font-semibold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
          >
            <span className="material-symbols-outlined text-sm">air</span>
            Start 2-Minute Guided Breathing
          </button>
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="w-full py-2.5 text-zinc-500 font-mono text-xs font-semibold uppercase tracking-widest hover:text-zinc-300 cursor-pointer"
        >
          DISMISS WINDOW
        </button>
      </div>
    </div>
  );
};
