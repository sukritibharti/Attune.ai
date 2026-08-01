import React from 'react';
import { ThoughtRecord } from '../types';

interface ReframeModalProps {
  record: ThoughtRecord | null;
  onClose: () => void;
  onStartBreathing: () => void;
}

export const ReframeModal: React.FC<ReframeModalProps> = ({
  record,
  onClose,
  onStartBreathing,
}) => {
  if (!record) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 fade-in">
      <div className="bg-zinc-900 w-full max-w-lg rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-zinc-800 space-y-6 max-h-[90vh] overflow-y-auto relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">psychology</span>
            <span className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Thought Reframed
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Original Thought */}
        <div className="bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800">
          <p className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
            Original Input
          </p>
          <p className="font-body text-base text-zinc-300 italic">"{record.content}"</p>
        </div>

        {/* AI Reframed Perspective */}
        <div className="bg-indigo-950/40 p-6 rounded-2xl border border-indigo-500/30 space-y-3">
          <div className="flex items-center gap-2 text-indigo-300">
            <span className="material-symbols-outlined text-xl">lightbulb</span>
            <h4 className="font-headline text-lg font-bold text-white">
              Balanced Perspective
            </h4>
          </div>
          <p className="font-body text-base text-zinc-200 leading-relaxed">
            {record.reframe}
          </p>
          {record.perspective && (
            <p className="font-body text-xs font-semibold text-indigo-300 border-t border-indigo-500/20 pt-3">
              ✦ {record.perspective}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onStartBreathing();
            }}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-headline font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">air</span>
            Practice Guided Respiration
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 text-zinc-500 font-mono text-xs font-semibold uppercase tracking-widest hover:text-zinc-300 cursor-pointer"
          >
            DISMISS & SAVE
          </button>
        </div>
      </div>
    </div>
  );
};
