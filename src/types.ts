export type TabType = 'acute' | 'reflect' | 'library' | 'journal';

export type MoodType = 'anxious' | 'lonely' | 'overwhelmed' | 'low' | 'other';

export interface ThoughtRecord {
  id: string;
  content: string;
  mood: MoodType;
  date: string;
  reframe?: string;
  perspective?: string;
  technique?: string;
}

export interface Technique {
  id: string;
  title: string;
  description: string;
  duration: string;
  tag: string;
  icon: string;
  bgClass: string;
  textClass: string;
}

export interface UserSettings {
  name: string;
  preferredPacing: number; // e.g. 4 seconds
  biometricAlerts: boolean;
  darkTheme: boolean;
  emergencyContact: string;
}
