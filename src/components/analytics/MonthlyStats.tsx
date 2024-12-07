import React from 'react';
import { Clock, Moon, Sun, Activity } from 'lucide-react';
import type { SleepEntry } from '../../types/sleep';
import { calculateAverageSleepTime, calculateSleepEfficiency } from '../../utils/sleepAnalytics';
import { formatDuration } from '../../utils/timeUtils';

interface MonthlyStatsProps {
  entries: SleepEntry[];
}

export function MonthlyStats({ entries }: MonthlyStatsProps) {
  const avgSleepTime = calculateAverageSleepTime(entries);
  const efficiency = calculateSleepEfficiency(entries);

  const stats = [
    {
      icon: Clock,
      label: 'Average Sleep Time',
      value: formatDuration(avgSleepTime),
      color: 'text-blue-500',
    },
    {
      icon: Moon,
      label: 'Total Sleep Sessions',
      value: entries.length,
      color: 'text-indigo-500',
    },
    {
      icon: Sun,
      label: 'Most Common Bedtime',
      value: '10:30 PM',
      color: 'text-yellow-500',
    },
    {
      icon: Activity,
      label: 'Sleep Efficiency',
      value: `${Math.round(efficiency)}%`,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Monthly Statistics</h3>
      <div className="grid grid-cols-2 gap-6">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="flex items-center space-x-3">
            <div className={`p-3 rounded-full bg-opacity-10 ${color} bg-current`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{label}</p>
              <p className="font-semibold text-gray-800">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}