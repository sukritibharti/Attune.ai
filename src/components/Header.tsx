import React from 'react';
import { AVATAR_IMAGE_URL } from '../data';

interface HeaderProps {
  onOpenSettings: () => void;
  avatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings, avatarUrl }) => {
  return (
    <header className="w-full top-0 sticky z-40 bg-[#09090b]/80 backdrop-blur-md flex items-center justify-between px-6 h-14 border-b border-zinc-800/80 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center overflow-hidden ring-2 ring-indigo-500/20 shadow-sm">
          <img
            src={avatarUrl || AVATAR_IMAGE_URL}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-headline font-bold text-lg text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]">
          A
        </div>
        <div>
          <h1 className="font-headline text-lg font-bold text-zinc-100 tracking-tight leading-none">
            Attune
          </h1>
          <p className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">
            Bento OS • v2.4
          </p>
        </div>
      </div>
      <button
        onClick={onOpenSettings}
        aria-label="Settings"
        className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-all active:scale-95 cursor-pointer p-2 rounded-xl border border-transparent hover:border-zinc-700"
      >
        <span className="material-symbols-outlined text-xl">settings</span>
      </button>
    </header>
  );
};
