export interface SleepEntry {
  id: string;
  startTime: Date;
  endTime: Date;
  quality: number; // 1-5 scale
  notes?: string;
  mood?: 'refreshed' | 'tired' | 'groggy' | 'energetic';
}

export interface SleepStats {
  duration: number; // in minutes
  efficiency: number; // percentage
  quality: number; // 1-5 scale
}

export interface SleepGoal {
  id: string;
  targetBedtime: string;
  targetDuration: number; // in minutes
  targetQuality: number;
  isActive: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number; // 0-100
}

export type SleepPhase = 'awake' | 'light' | 'deep' | 'rem';