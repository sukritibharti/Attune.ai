import React, { useState } from 'react';
import { MoodType } from '../types';
import { MOOD_CONFIG, NATURE_IMAGE_URL } from '../data';

interface ReflectViewProps {
  userName: string;
  selectedMood: MoodType;
  onSelectMood: (mood: MoodType) => void;
  onReleaseThought: (thoughtText: string, mood: MoodType) => void;
  onStartExercise: (exerciseId: string) => void;
  onOpenCrisis: () => void;
  onOpenJournal: () => void;
  isReleasing?: boolean;
}

export const ReflectView: React.FC<ReflectViewProps> = ({
  userName,
  selectedMood,
  onSelectMood,
  onReleaseThought,
  onStartExercise,
  onOpenCrisis,
  onOpenJournal,
  isReleasing = false,
}) => {
  const [thoughtInput, setThoughtInput] = useState('');

  const handleRelease = () => {
    if (!thoughtInput.trim()) return;
    onReleaseThought(thoughtInput.trim(), selectedMood);
    setThoughtInput('');
  };

  const moodKeys: MoodType[] = ['anxious', 'lonely', 'overwhelmed', 'low', 'other'];

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 pt-6 pb-32 space-y-6">
      {/* Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header Title Section */}
      <section className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-zinc-400 uppercase text-xs tracking-widest font-bold mb-1">
            Reflective Engine • Active State
          </h2>
          <h1 className="font-headline text-3xl md:text-4xl font-light tracking-tight text-white">
            Good morning, <span className="font-semibold text-indigo-400">{userName}</span>
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full text-xs font-medium text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Biometrics Normal
        </div>
      </section>

      {/* Main Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Thought Input Bento Card (Col 8) */}
        <div className="col-span-12 md:col-span-8 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-zinc-400 uppercase text-xs tracking-widest font-bold">
                Current Mental Log
              </h2>
              <span className="text-xs bg-zinc-800 border border-zinc-700/60 px-3 py-1 rounded-full text-zinc-400 font-mono">
                ENCRYPTED
              </span>
            </div>

            <textarea
              id="reflection-input"
              value={thoughtInput}
              onChange={(e) => setThoughtInput(e.target.value)}
              placeholder="What thoughts are occupying your mind right now?"
              className="w-full bg-zinc-950/70 border border-zinc-800 rounded-2xl p-4 font-body text-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all resize-none min-h-[140px]"
            />
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/80">
            <p className="text-xs text-zinc-500 hidden sm:block">
              AI cognitive reframe will generate a balanced perspective.
            </p>
            <button
              onClick={handleRelease}
              disabled={!thoughtInput.trim() || isReleasing}
              className={`bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-headline font-semibold text-sm transition-all cursor-pointer ${
                !thoughtInput.trim() || isReleasing
                  ? 'opacity-40 cursor-not-allowed'
                  : 'shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95'
              }`}
            >
              {isReleasing ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Release Thought
                  <span className="material-symbols-outlined text-sm">send</span>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mood Selector Bento Card (Col 4) */}
        <div className="col-span-12 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <h2 className="text-zinc-400 uppercase text-xs tracking-widest font-bold mb-4">
              Emotional Frequency
            </h2>

            <div className="grid grid-cols-2 gap-2.5">
              {moodKeys.map((moodKey) => {
                const config = MOOD_CONFIG[moodKey];
                const isSelected = selectedMood === moodKey;
                return (
                  <button
                    key={moodKey}
                    onClick={() => onSelectMood(moodKey)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-[0_0_15px_rgba(79,70,229,0.3)]'
                        : 'bg-zinc-950/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl mb-1">{config.icon}</span>
                    <span className="font-headline text-xs font-semibold">
                      {config.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800 text-center">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
              Selected: <span className="text-indigo-400 font-bold">{selectedMood}</span>
            </span>
          </div>
        </div>

        {/* Suggested Practice Bento Card (Col 8) */}
        <div
          onClick={() => onStartExercise('paced-breathing')}
          className="col-span-12 md:col-span-8 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl hover:border-indigo-500/50 cursor-pointer group transition-all"
        >
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
              <span className="material-symbols-outlined text-3xl">air</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
                  RECOMMENDED MODULE
                </span>
              </div>
              <h3 className="font-headline text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                Paced Breathing Engine
              </h3>
              <p className="font-body text-sm text-zinc-400 mt-1 max-w-md leading-relaxed">
                4-minute rhythmic respiration protocol engineered to settle nervous system arousal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-xl border border-zinc-700/50">
              4 MIN
            </span>
            <span className="w-10 h-10 rounded-xl bg-zinc-800 group-hover:bg-indigo-600 text-zinc-300 group-hover:text-white flex items-center justify-center transition-all">
              <span className="material-symbols-outlined text-xl">play_arrow</span>
            </span>
          </div>
        </div>

        {/* History / Safety Guardrail Bento Card (Col 4) */}
        <div className="col-span-12 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                <span className="material-symbols-outlined text-xl">emergency_home</span>
              </div>
              <div>
                <h4 className="font-headline text-sm font-bold text-white">Crisis Shield</h4>
                <p className="text-xs text-zinc-500">24/7 Professional lines</p>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              If experiencing an acute emergency, access instant support protocols.
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-zinc-800">
            <button
              onClick={onOpenJournal}
              className="text-xs text-zinc-400 hover:text-white font-medium cursor-pointer"
            >
              View History
            </button>
            <button
              onClick={onOpenCrisis}
              className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 rounded-xl text-xs font-semibold cursor-pointer transition-all"
            >
              Emergency Hotline
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
