import { useState, useEffect } from 'react';
import { TabType, MoodType, ThoughtRecord, UserSettings } from './types';
import { MOOD_CONFIG, INITIAL_THOUGHTS } from './data';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { ReflectView } from './components/ReflectView';
import { LibraryView } from './components/LibraryView';
import { AcuteView } from './components/AcuteView';
import { JournalView } from './components/JournalView';
import { BreathingExercise } from './components/BreathingExercise';
import { GroundingExercise } from './components/GroundingExercise';
import { ReframeModal } from './components/ReframeModal';
import { CrisisModal } from './components/CrisisModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('reflect');
  const [selectedMood, setSelectedMood] = useState<MoodType>('anxious');
  const [thoughts, setThoughts] = useState<ThoughtRecord[]>(INITIAL_THOUGHTS);
  
  // Exercise state
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  // Modals state
  const [isReframeModalOpen, setIsReframeModalOpen] = useState(false);
  const [latestReleasedRecord, setLatestReleasedRecord] = useState<ThoughtRecord | null>(null);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isReleasingThought, setIsReleasingThought] = useState(false);

  // User Settings
  const [settings, setSettings] = useState<UserSettings>({
    name: 'Alex',
    preferredPacing: 4,
    biometricAlerts: true,
    darkTheme: false,
    emergencyContact: '',
  });

  // Dynamic background atmospheric color update based on mood
  useEffect(() => {
    if (currentTab === 'acute') {
      document.body.style.backgroundColor = '#faf9f5';
    } else {
      const targetColor = MOOD_CONFIG[selectedMood]?.color || '#faf9f5';
      document.body.style.backgroundColor = targetColor;
    }
  }, [selectedMood, currentTab]);

  // Handle thought release
  const handleReleaseThought = async (thoughtText: string, mood: MoodType) => {
    setIsReleasingThought(true);

    let reframeData = {
      reframe: `It's completely natural to have moments like this. Remember that your current thoughts don't define your entire reality.`,
      perspective: 'Taking a slow breath helps bring your mind back to the present moment.',
      technique: 'Paced Breathing',
    };

    try {
      const res = await fetch('/api/ai/reframe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thought: thoughtText, mood }),
      });
      if (res.ok) {
        const json = await res.json();
        if (json.reframe) {
          reframeData = json;
        }
      }
    } catch {
      // Use fallback
    }

    const newRecord: ThoughtRecord = {
      id: Date.now().toString(),
      content: thoughtText,
      mood: mood,
      date: 'Just now',
      reframe: reframeData.reframe,
      perspective: reframeData.perspective,
      technique: reframeData.technique,
    };

    setThoughts((prev) => [newRecord, ...prev]);
    setLatestReleasedRecord(newRecord);
    setIsReleasingThought(false);
    setIsReframeModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col mood-transition relative font-body">
      {/* Header (Top Navigation) */}
      <Header onOpenSettings={() => setIsSettingsModalOpen(true)} />

      {/* Main Content Router */}
      <main className="flex-1 w-full">
        {currentTab === 'reflect' && (
          <ReflectView
            userName={settings.name}
            selectedMood={selectedMood}
            onSelectMood={(m) => setSelectedMood(m)}
            onReleaseThought={handleReleaseThought}
            onStartExercise={(id) => setActiveExercise(id)}
            onOpenCrisis={() => setIsCrisisModalOpen(true)}
            onOpenJournal={() => setCurrentTab('journal')}
            isReleasing={isReleasingThought}
          />
        )}

        {currentTab === 'library' && (
          <LibraryView
            onStartExercise={(id) => setActiveExercise(id)}
            onOpenCrisis={() => setIsCrisisModalOpen(true)}
          />
        )}

        {currentTab === 'acute' && (
          <AcuteView
            onStartBreathing={() => setActiveExercise('paced-breathing')}
            onFine={() => setCurrentTab('reflect')}
            onDismiss={() => setCurrentTab('reflect')}
            onOpenCrisis={() => setIsCrisisModalOpen(true)}
          />
        )}

        {currentTab === 'journal' && (
          <JournalView
            thoughts={thoughts}
            onOpenCrisis={() => setIsCrisisModalOpen(true)}
            onStartExercise={(id) => setActiveExercise(id)}
          />
        )}
      </main>

      {/* Bottom Fixed Navigation */}
      <BottomNavBar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
      />

      {/* Interactive Practice Exercise Modals */}
      {activeExercise === 'paced-breathing' && (
        <BreathingExercise
          onClose={() => setActiveExercise(null)}
          title="Paced Breathing"
          targetMinutes={2}
        />
      )}

      {activeExercise === 'grounding-54321' && (
        <GroundingExercise onClose={() => setActiveExercise(null)} />
      )}

      {/* Thought Released AI Reframe Modal */}
      {isReframeModalOpen && (
        <ReframeModal
          record={latestReleasedRecord}
          onClose={() => setIsReframeModalOpen(false)}
          onStartBreathing={() => {
            setIsReframeModalOpen(false);
            setActiveExercise('paced-breathing');
          }}
        />
      )}

      {/* Crisis Support Guardrail Modal */}
      {isCrisisModalOpen && (
        <CrisisModal
          onClose={() => setIsCrisisModalOpen(false)}
          onStartBreathing={() => {
            setIsCrisisModalOpen(false);
            setActiveExercise('paced-breathing');
          }}
        />
      )}

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={(s) => setSettings(s)}
          onClose={() => setIsSettingsModalOpen(false)}
          onTriggerBiometricAlert={() => setCurrentTab('acute')}
        />
      )}
    </div>
  );
}
