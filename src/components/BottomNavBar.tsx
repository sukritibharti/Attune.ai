import React from 'react';
import { TabType } from '../types';

interface BottomNavBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'acute', label: 'Acute', icon: 'potted_plant' },
    { id: 'reflect', label: 'Reflect', icon: 'self_care' },
    { id: 'library', label: 'Library', icon: 'spa' },
    { id: 'journal', label: 'Journal', icon: 'menu_book' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.5)] rounded-t-[2rem]">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-indigo-600 text-white rounded-2xl px-5 py-2 shadow-[0_0_15px_rgba(79,70,229,0.5)] active:scale-90'
                : 'text-zinc-500 hover:text-zinc-300 active:scale-90'
            }`}
          >
            <span
              className={`material-symbols-outlined ${isActive ? 'fill-1 mb-0.5' : 'mb-1'}`}
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {tab.icon}
            </span>
            <span className="font-headline text-[10px] font-bold uppercase tracking-widest">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
