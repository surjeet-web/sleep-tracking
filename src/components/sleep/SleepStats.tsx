import React from 'react';
import { Clock, Activity, Star } from 'lucide-react';
import type { SleepStats } from '../../types/sleep';
import { formatDuration } from '../../utils/timeUtils';

interface SleepStatsProps {
  stats: SleepStats;
}

export function SleepStats({ stats }: SleepStatsProps) {
  const metrics = [
    {
      icon: Clock,
      label: 'Duration',
      value: formatDuration(stats.duration),
      color: 'text-blue-500',
    },
    {
      icon: Activity,
      label: 'Efficiency',
      value: `${Math.round(stats.efficiency)}%`,
      color: 'text-green-500',
    },
    {
      icon: Star,
      label: 'Quality',
      value: `${stats.quality}/5`,
      color: 'text-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {metrics.map(({ icon: Icon, label, value, color }) => (
        <div
          key={label}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
        >
          <Icon className={`w-6 h-6 ${color} mb-2`} />
          <span className="text-sm text-gray-600">{label}</span>
          <span className="text-lg font-semibold">{value}</span>
        </div>
      ))}
    </div>
  );
}