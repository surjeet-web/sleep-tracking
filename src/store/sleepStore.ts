import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SleepEntry, SleepGoal, Achievement } from '../types/sleep';

interface SleepStore {
  entries: SleepEntry[];
  scheduleTime: string | null;
  goals: SleepGoal[];
  achievements: Achievement[];
  addEntry: (entry: SleepEntry) => void;
  setScheduleTime: (time: string) => void;
  addGoal: (goal: SleepGoal) => void;
  updateGoal: (id: string, goal: Partial<SleepGoal>) => void;
  unlockAchievement: (id: string) => void;
  updateAchievementProgress: (id: string, progress: number) => void;
}

export const useSleepStore = create<SleepStore>()(
  persist(
    (set) => ({
      entries: [],
      scheduleTime: null,
      goals: [],
      achievements: [
        {
          id: 'consistent-sleeper',
          title: 'Consistent Sleeper',
          description: 'Maintain a regular sleep schedule for 7 days',
          icon: '🌙',
          progress: 0,
        },
        {
          id: 'quality-rest',
          title: 'Quality Rest',
          description: 'Achieve 5-star sleep quality 3 times',
          icon: '⭐',
          progress: 0,
        },
        {
          id: 'early-bird',
          title: 'Early Bird',
          description: 'Wake up before 7 AM for 5 consecutive days',
          icon: '🌅',
          progress: 0,
        },
      ],
      addEntry: (entry) =>
        set((state) => ({
          entries: [...state.entries, entry],
        })),
      setScheduleTime: (time) =>
        set(() => ({
          scheduleTime: time,
        })),
      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, goal],
        })),
      updateGoal: (id, updatedGoal) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updatedGoal } : goal
          ),
        })),
      unlockAchievement: (id) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id
              ? { ...achievement, unlockedAt: new Date() }
              : achievement
          ),
        })),
      updateAchievementProgress: (id, progress) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id
              ? { ...achievement, progress }
              : achievement
          ),
        })),
    }),
    {
      name: 'sleep-store',
    }
  )
);