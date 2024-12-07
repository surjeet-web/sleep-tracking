import React, { useState } from 'react';
import { Moon, Sun, Clock } from 'lucide-react';
import type { SleepEntry } from '../../types/sleep';
import { formatTime } from '../../utils/timeUtils';
import { calculateSleepStats } from '../../utils/sleepAnalytics';
import { SleepQuality } from './SleepQuality';
import { SleepMood } from './SleepMood';
import { SleepNotes } from './SleepNotes';
import { SleepStats } from './SleepStats';
import { SleepHistory } from './SleepHistory';
import { useSleepStore } from '../../store/sleepStore';

export function SleepTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [quality, setQuality] = useState(0);
  const [mood, setMood] = useState<SleepEntry['mood']>();
  const [notes, setNotes] = useState('');
  const [lastEntry, setLastEntry] = useState<SleepEntry | null>(null);
  const addEntry = useSleepStore((state) => state.addEntry);

  const startTracking = () => {
    setIsTracking(true);
    setStartTime(new Date());
    setQuality(0);
    setMood(undefined);
    setNotes('');
  };

  const stopTracking = () => {
    if (!startTime) return;
    
    const entry: SleepEntry = {
      id: crypto.randomUUID(),
      startTime,
      endTime: new Date(),
      quality,
      mood,
      notes: notes.trim() || undefined,
    };

    addEntry(entry);
    setLastEntry(entry);
    setIsTracking(false);
    setStartTime(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Sleep Tracker</h2>
        <Clock className="w-6 h-6 text-blue-600" />
      </div>

      <div className="space-y-6">
        {isTracking ? (
          <>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Moon className="w-8 h-8 text-indigo-600" />
                <span className="text-lg font-medium">
                  Started at {startTime && formatTime(startTime)}
                </span>
              </div>
            </div>
            
            <SleepQuality value={quality} onChange={setQuality} />
            <SleepMood value={mood} onChange={setMood} />
            <SleepNotes value={notes} onChange={setNotes} />
            
            <button
              onClick={stopTracking}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Stop Tracking
            </button>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Sun className="w-8 h-8 text-yellow-500" />
                <span className="text-lg font-medium">Ready to sleep?</span>
              </div>
              <button
                onClick={startTracking}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
              >
                Start Tracking
              </button>
            </div>

            {lastEntry && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Last Sleep Session</h3>
                <SleepStats stats={calculateSleepStats(lastEntry)} />
              </div>
            )}

            <SleepHistory />
          </>
        )}
      </div>
    </div>
  );
}