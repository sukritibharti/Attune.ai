import React, { useState } from 'react';

interface GroundingExerciseProps {
  onClose: () => void;
}

interface GroundingStep {
  count: number;
  sense: string;
  instruction: string;
  icon: string;
  color: string;
}

const STEPS: GroundingStep[] = [
  {
    count: 5,
    sense: 'SEE',
    instruction: 'Look around you and name 5 things you can see right now.',
    icon: 'visibility',
    color: 'bg-[#d1e5f9]/50 text-[#4e6071]',
  },
  {
    count: 4,
    sense: 'TOUCH',
    instruction: 'Notice 4 physical sensations or things you can touch around you.',
    icon: 'back_hand',
    color: 'bg-[#8ba88e]/40 text-[#4a654e]',
  },
  {
    count: 3,
    sense: 'HEAR',
    instruction: 'Listen carefully and identify 3 subtle sounds in your environment.',
    icon: 'hearing',
    color: 'bg-[#b69d7b]/40 text-[#705b3e]',
  },
  {
    count: 2,
    sense: 'SMELL',
    instruction: 'Notice 2 scents around you, or recall 2 comforting smells.',
    icon: 'scents',
    color: 'bg-[#e3e2df] text-[#424842]',
  },
  {
    count: 1,
    sense: 'TASTE',
    instruction: 'Focus on 1 taste in your mouth or take a slow sip of water.',
    icon: 'restaurant',
    color: 'bg-[#D1928A]/30 text-[#ba1a1a]',
  },
];

export const GroundingExercise: React.FC<GroundingExerciseProps> = ({ onClose }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [items, setItems] = useState<string[]>(['', '', '', '', '']);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = STEPS[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < STEPS.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
      setItems(['', '', '', '', '']);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#09090b]/95 backdrop-blur-2xl flex flex-col items-center justify-between p-6 fade-in overflow-y-auto">
      {/* Top Bar */}
      <div className="w-full max-w-md flex items-center justify-between pt-4 border-b border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-400">visibility</span>
          <h2 className="font-headline text-lg font-bold text-white">
            5-4-3-2-1 Somatic Grounding
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {!isCompleted ? (
        <div className="w-full max-w-md my-auto space-y-6 py-6 text-center">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2">
            {STEPS.map((s, idx) => (
              <div
                key={s.sense}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIdx
                    ? 'w-8 bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]'
                    : idx < currentStepIdx
                    ? 'w-3 bg-emerald-500'
                    : 'w-3 bg-zinc-800'
                }`}
              />
            ))}
          </div>

          {/* Sense Badge */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 flex items-center justify-center shadow-[0_0_25px_rgba(79,70,229,0.3)] animate-pulse">
              <span className="material-symbols-outlined text-4xl">{currentStep.icon}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-headline text-2xl font-light text-white">
              {currentStep.count} Things You Can <span className="font-bold text-indigo-400">{currentStep.sense}</span>
            </h3>
            <p className="font-body text-sm text-zinc-400 px-2 leading-relaxed">
              {currentStep.instruction}
            </p>
          </div>

          {/* Inputs for Step */}
          <div className="space-y-2.5 text-left pt-2">
            {Array.from({ length: currentStep.count }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-zinc-900 border border-zinc-800 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <input
                  type="text"
                  value={items[i] || ''}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[i] = e.target.value;
                    setItems(newItems);
                  }}
                  placeholder={`Observation #${i + 1}...`}
                  className="flex-1 bg-zinc-950/70 border border-zinc-800 rounded-xl px-4 py-2.5 font-body text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-headline font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all cursor-pointer mt-4"
          >
            {currentStepIdx < STEPS.length - 1 ? 'PROCEED TO NEXT SENSE' : 'COMPLETE GROUNDING'}
          </button>
        </div>
      ) : (
        /* Completion View */
        <div className="w-full max-w-md my-auto flex flex-col items-center justify-center text-center space-y-6 py-8">
          <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)] animate-pulse">
            <span className="material-symbols-outlined text-4xl">check_circle</span>
          </div>
          <div className="space-y-2">
            <h3 className="font-headline text-3xl font-light text-white">
              Somatic System Anchored
            </h3>
            <p className="font-body text-sm text-zinc-400 px-4 leading-relaxed">
              By systematically engaging all 5 senses, you successfully signaled safety to your central nervous system.
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
