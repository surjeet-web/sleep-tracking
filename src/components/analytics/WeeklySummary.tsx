import React from 'react';
import { Clock, Zap, Star } from 'lucide-react';
import type { SleepEntry } from '../../types/sleep';
import { calculateSleepDuration, formatDuration } from '../../utils/timeUtils';

interface WeeklySummaryProps {
  entries: SleepEntry[];
  title: string;
}

export function WeeklySummary({ entries, title }: WeeklySummaryProps) {
  const totalSleepTime = entries.reduce((acc, entry) => {
    return acc + calculateSleepDuration(new Date(entry.startTime), new Date(entry.endTime));
  }, 0);

  const averageSleepTime = entries.length > 0 ? totalSleepTime / entries.length : 0;
  const averageQuality = entries.length > 0
    ? entries.reduce((acc, entry) => acc + entry.quality, 0) / entries.length
    : 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span className="text-gray-600">Average Sleep</span>
          </div>
          <span className="font-semibold">{formatDuration(Math.round(averageSleepTime))}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-600">Total Sleep</span>
          </div>
          <span className="font-semibold">{formatDuration(totalSleepTime)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-purple-500" />
            <span className="text-gray-600">Average Quality</span>
          </div>
          <span className="font-semibold">{averageQuality.toFixed(1)} / 5</span>
        </div>
      </div>
    </div>
  );
}