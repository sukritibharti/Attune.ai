import React, { useState } from 'react';
import { TECHNIQUES, NATURE_IMAGE_URL } from '../data';

interface LibraryViewProps {
  onStartExercise: (exerciseId: string) => void;
  onOpenCrisis: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onStartExercise, onOpenCrisis }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechniques = TECHNIQUES.filter(
    (tech) =>
      tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tech.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-6 pt-6 pb-32 space-y-6 relative z-10">
      {/* Background Accent Blur */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header Title Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-zinc-400 uppercase text-xs tracking-widest font-bold mb-1">
            Regulation Registry
          </h2>
          <h1 className="font-headline text-3xl md:text-4xl font-light text-white">
            Technique <span className="font-semibold text-indigo-400">Library</span>
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 shadow-md">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search exercises..."
            className="w-full pl-12 pr-4 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl font-body text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>
      </section>

      {/* Main Bento Grid for Techniques */}
      <div className="grid grid-cols-12 gap-6">
        {filteredTechniques.map((tech) => (
          <div
            key={tech.id}
            onClick={() => onStartExercise(tech.id)}
            className="col-span-12 sm:col-span-6 bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 flex flex-col justify-between hover:border-indigo-500/50 shadow-xl cursor-pointer group transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-2xl">{tech.icon}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-mono text-[10px] bg-zinc-800 text-zinc-300 border border-zinc-700/60 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {tech.duration}
                  </span>
                  <span className="font-mono text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                    {tech.tag}
                  </span>
                </div>
              </div>

              <h3 className="font-headline text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                {tech.title}
              </h3>
              <p className="font-body text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                {tech.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-zinc-800 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
              <span>Start Exercise</span>
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        ))}

        {/* Featured Visual Bento Card */}
        <div
          onClick={() => onStartExercise('paced-breathing')}
          className="col-span-12 sm:col-span-6 bg-gradient-to-br from-indigo-900/60 to-zinc-900 border border-indigo-500/30 rounded-[2rem] p-6 flex flex-col justify-between shadow-2xl cursor-pointer group hover:border-indigo-400 transition-all"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 font-bold">
              DAILY HARMONY
            </span>
            <span className="material-symbols-outlined text-indigo-300">spa</span>
          </div>

          <div>
            <h4 className="font-headline text-2xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors">
              Rhythmic Alignment
            </h4>
            <p className="font-body text-sm text-zinc-300 leading-relaxed mb-4">
              Daily structured breathwork builds resilience against stress spikes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <span className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">play_arrow</span>
            </span>
            <span>Launch Quick Session</span>
          </div>
        </div>

        {/* Emergency Crisis Bento Card */}
        <div className="col-span-12 bg-zinc-900 border border-rose-900/40 rounded-[2rem] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <span className="material-symbols-outlined text-2xl">emergency_home</span>
            </div>
            <div>
              <p className="font-headline font-bold text-sm text-white">
                Immediate Mental Crisis Support
              </p>
              <p className="font-body text-xs text-zinc-400">Free, confidential & available 24/7.</p>
            </div>
          </div>
          <button
            onClick={onOpenCrisis}
            className="px-6 py-3 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 rounded-2xl font-headline font-semibold text-xs cursor-pointer transition-all shrink-0"
          >
            Access Support Lines
          </button>
        </div>
      </div>
    </div>
  );
};
