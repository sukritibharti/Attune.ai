import React from 'react';
import { UserSettings } from '../types';

interface SettingsModalProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: UserSettings) => void;
  onClose: () => void;
  onTriggerBiometricAlert: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
  onTriggerBiometricAlert,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 fade-in">
      <div className="bg-zinc-900 w-full max-w-md rounded-[2.5rem] p-6 md:p-8 shadow-2xl border border-zinc-800 space-y-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-indigo-400">settings</span>
            <h3 className="font-headline text-lg font-bold text-white">System Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* User Name */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
            Profile Name
          </label>
          <input
            type="text"
            value={settings.name}
            onChange={(e) =>
              onUpdateSettings({ ...settings, name: e.target.value })
            }
            className="w-full bg-zinc-950/70 border border-zinc-800 rounded-2xl px-4 py-3 font-body text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
          />
        </div>

        {/* Breathing Pace */}
        <div className="space-y-2">
          <label className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
            Guided Respiration Rhythm ({settings.preferredPacing}s Cycle)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[3, 4, 5].map((sec) => (
              <button
                key={sec}
                onClick={() => onUpdateSettings({ ...settings, preferredPacing: sec })}
                className={`py-3 rounded-xl font-headline font-semibold text-xs cursor-pointer transition-all ${
                  settings.preferredPacing === sec
                    ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]'
                    : 'bg-zinc-950/60 border border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                {sec} Seconds
              </button>
            ))}
          </div>
        </div>

        {/* Biometric Alert Simulator */}
        <div className="p-4 bg-zinc-950/70 rounded-2xl border border-zinc-800 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-headline text-sm font-bold text-white">
                Biometric Spike Trigger
              </p>
              <p className="font-mono text-[11px] text-zinc-500">
                Simulate acute heart rate increase
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onTriggerBiometricAlert();
              }}
              className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 rounded-xl font-headline font-semibold text-xs transition-colors cursor-pointer"
            >
              Simulate
            </button>
          </div>
        </div>

        {/* Save */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-headline font-bold text-sm shadow-[0_0_20px_rgba(79,70,229,0.5)] active:scale-95 transition-all cursor-pointer"
        >
          Save & Exit
        </button>
      </div>
    </div>
  );
};
