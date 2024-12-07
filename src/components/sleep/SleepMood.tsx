import React from 'react';
import { Smile, Frown, Meh, Battery } from 'lucide-react';
import type { SleepEntry } from '../../types/sleep';

interface SleepMoodProps {
  value: SleepEntry['mood'];
  onChange: (mood: SleepEntry['mood']) => void;
}

export function SleepMood({ value, onChange }: SleepMoodProps) {
  const moods = [
    { value: 'refreshed', icon: Smile, label: 'Refreshed', color: 'text-green-500' },
    { value: 'energetic', icon: Battery, label: 'Energetic', color: 'text-blue-500' },
    { value: 'tired', icon: Meh, label: 'Tired', color: 'text-yellow-500' },
    { value: 'groggy', icon: Frown, label: 'Groggy', color: 'text-red-500' },
  ] as const;

  return (
    <div className="flex flex-col items-center space-y-3">
      <h3 className="text-lg font-medium text-gray-700">How do you feel?</h3>
      <div className="flex space-x-4">
        {moods.map(({ value: moodValue, icon: Icon, label, color }) => (
          <button
            key={moodValue}
            onClick={() => onChange(moodValue)}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              value === moodValue
                ? `${color} bg-gray-100`
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm mt-1">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}