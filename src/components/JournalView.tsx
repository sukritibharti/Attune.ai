import React, { useState } from 'react';
import { ThoughtRecord, MoodType } from '../types';
import { MOOD_CONFIG } from '../data';

interface JournalViewProps {
  thoughts: ThoughtRecord[];
  onOpenCrisis: () => void;
  onStartExercise: (exerciseId: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  thoughts,
  onOpenCrisis,
  onStartExercise,
}) => {
  const [filterMood, setFilterMood] = useState<MoodType | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredThoughts = thoughts.filter(
    (item) => filterMood === 'all' || item.mood === filterMood
  );

  return (
    <div className="max-w-4xl mx-auto px-6 pt-6 pb-32 space-y-6 relative z-10">
      {/* Background Accent Blur */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-zinc-400 uppercase text-xs tracking-widest font-bold mb-1">
            Cognitive Log & Analytics
          </h2>
          <h1 className="font-headline text-3xl md:text-4xl font-light text-white">
            Journal & <span className="font-semibold text-indigo-400">History</span>
          </h1>
        </div>
        <span className="font-mono text-xs font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-full">
          {thoughts.length} ENTRIES
        </span>
      </section>

      {/* Bento Grid Stats Widgets */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 sm:col-span-4 bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] text-center shadow-xl">
          <p className="text-zinc-400 uppercase text-xs tracking-widest font-bold mb-2">
            Reflections Logged
          </p>
          <p className="font-headline text-5xl font-light tracking-tighter text-indigo-400">
            {thoughts.length}
          </p>
        </div>
        <div className="col-span-12 sm:col-span-4 bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] text-center shadow-xl">
          <p className="text-zinc-400 uppercase text-xs tracking-widest font-bold mb-2">
            Calm Streak
          </p>
          <p className="font-headline text-5xl font-light tracking-tighter text-emerald-400">
            4 <span className="text-xl text-zinc-500 font-normal">Days</span>
          </p>
        </div>
        <div className="col-span-12 sm:col-span-4 bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] text-center shadow-xl">
          <p className="text-zinc-400 uppercase text-xs tracking-widest font-bold mb-2">
            Breathing Time
          </p>
          <p className="font-headline text-5xl font-light tracking-tighter text-amber-400">
            12 <span className="text-xl text-zinc-500 font-normal">Min</span>
          </p>
        </div>
      </div>

      {/* Mood Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setFilterMood('all')}
          className={`px-4 py-2 rounded-xl font-headline text-xs font-semibold tracking-wider cursor-pointer whitespace-nowrap transition-all ${
            filterMood === 'all'
              ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
              : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
          }`}
        >
          All Entries ({thoughts.length})
        </button>
        {(['anxious', 'lonely', 'overwhelmed', 'low', 'other'] as MoodType[]).map((m) => {
          const count = thoughts.filter((t) => t.mood === m).length;
          return (
            <button
              key={m}
              onClick={() => setFilterMood(m)}
              className={`px-4 py-2 rounded-xl font-headline text-xs font-semibold tracking-wider cursor-pointer whitespace-nowrap transition-all flex items-center gap-1.5 ${
                filterMood === m
                  ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{MOOD_CONFIG[m].icon}</span>
              {MOOD_CONFIG[m].label} ({count})
            </button>
          );
        })}
      </div>

      {/* Reflection Log List */}
      <div className="space-y-4">
        {filteredThoughts.length === 0 ? (
          <div className="bg-zinc-900 rounded-[2rem] p-12 text-center border border-zinc-800 space-y-3 shadow-xl">
            <span className="material-symbols-outlined text-4xl text-zinc-600">edit_note</span>
            <p className="font-headline text-lg text-white">No entries found</p>
            <p className="font-body text-sm text-zinc-500">
              Share a thought on the Reflect tab to build your reflection log.
            </p>
          </div>
        ) : (
          filteredThoughts.map((record) => {
            const moodInfo = MOOD_CONFIG[record.mood] || MOOD_CONFIG.other;
            const isExpanded = expandedId === record.id;
            return (
              <div
                key={record.id}
                onClick={() => setExpandedId(isExpanded ? null : record.id)}
                className="bg-zinc-900 p-6 rounded-[2rem] border border-zinc-800 shadow-xl hover:border-zinc-700 transition-all cursor-pointer space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700 font-mono text-xs font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-indigo-400">
                        {moodInfo.icon}
                      </span>
                      {moodInfo.label}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">{record.date}</span>
                  </div>
                  <span className="material-symbols-outlined text-zinc-500 text-xl">
                    {isExpanded ? 'expand_less' : 'expand_more'}
                  </span>
                </div>

                <p className="font-body text-base text-zinc-200 font-normal leading-relaxed">
                  "{record.content}"
                </p>

                {record.reframe && (
                  <div className="bg-indigo-950/40 p-5 rounded-2xl border border-indigo-500/30 space-y-2 mt-2">
                    <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase tracking-widest">
                      <span className="material-symbols-outlined text-sm">psychology</span>
                      Reframed Perspective
                    </div>
                    <p className="font-body text-sm text-zinc-200 leading-relaxed">
                      {record.reframe}
                    </p>
                    {record.perspective && (
                      <p className="font-body text-xs italic text-indigo-300/80 pt-2 border-t border-indigo-500/20">
                        "{record.perspective}"
                      </p>
                    )}
                  </div>
                )}

                {isExpanded && record.technique && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartExercise('paced-breathing');
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-headline text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">air</span>
                      Practice {record.technique}
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Emergency Crisis Guardrail */}
      <div className="p-6 border border-rose-900/40 rounded-[2rem] bg-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-0.5 text-center sm:text-left">
          <p className="font-headline font-bold text-sm text-white">
            Need immediate support?
          </p>
          <p className="font-body text-xs text-zinc-400">Crisis support lines are free & available 24/7.</p>
        </div>
        <button
          onClick={onOpenCrisis}
          className="px-6 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 rounded-2xl font-headline font-semibold text-xs cursor-pointer shrink-0 transition-all"
        >
          Contact Lifeline
        </button>
      </div>
    </div>
  );
};
