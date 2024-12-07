import React from 'react';
import { Moon, Sun, Smile } from 'lucide-react';
import type { SleepEntry } from '../../types/sleep';
import { format } from 'date-fns';
import { calculateSleepDuration } from '../../utils/timeUtils';

interface WeeklyStatsProps {
  entries: SleepEntry[];
}

export function WeeklyStats({ entries }: WeeklyStatsProps) {
  const bestSleepDay = entries.reduce((best, current) => {
    const currentDuration = calculateSleepDuration(
      new Date(current.startTime),
      new Date(current.endTime)
    );
    const bestDuration = best
      ? calculateSleepDuration(new Date(best.startTime), new Date(best.endTime))
      : 0;
    return currentDuration > bestDuration ? current : best;
  }, entries[0]);

  const averageBedtime = entries.length > 0
    ? new Date(
        entries.reduce((acc, entry) => acc + new Date(entry.startTime).getTime(), 0) /
          entries.length
      )
    : null;

  const mostCommonMood = entries.length > 0
    ? entries.reduce((acc, entry) => {
        acc[entry.mood || 'unknown'] = (acc[entry.mood || 'unknown'] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    : {};

  const topMood = Object.entries(mostCommonMood).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ['unknown', 0]
  )[0];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Weekly Insights</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-full">
            <Moon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Average Bedtime</p>
            <p className="font-semibold">
              {averageBedtime ? format(averageBedtime, 'hh:mm a') : 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-3 bg-yellow-100 rounded-full">
            <Sun className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Best Sleep Day</p>
            <p className="font-semibold">
              {bestSleepDay ? format(new Date(bestSleepDay.startTime), 'EEEE') : 'N/A'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-3 bg-green-100 rounded-full">
            <Smile className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Most Common Mood</p>
            <p className="font-semibold capitalize">{topMood === 'unknown' ? 'N/A' : topMood}</p>
          </div>
        </div>
      </div>
    </div>
  );
}