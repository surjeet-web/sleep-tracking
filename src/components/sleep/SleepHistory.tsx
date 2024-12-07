import React from 'react';
import { format } from 'date-fns';
import { Moon, Star, Clock, MessageCircle } from 'lucide-react';
import { useSleepStore } from '../../store/sleepStore';
import { formatDuration } from '../../utils/timeUtils';
import { calculateSleepStats } from '../../utils/sleepAnalytics';
import { getSleepQualityText } from '../../utils/sleepAnalytics';

export function SleepHistory() {
  const entries = useSleepStore((state) => state.entries);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Sleep History</h2>
      <div className="space-y-4">
        {entries.slice().reverse().map((entry) => {
          const stats = calculateSleepStats(entry);
          return (
            <div
              key={entry.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Moon className="w-5 h-5 text-indigo-600" />
                  <span className="font-medium text-gray-800">
                    {format(new Date(entry.startTime), 'MMM d, yyyy')}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{format(new Date(entry.startTime), 'HH:mm')} - {format(new Date(entry.endTime), 'HH:mm')}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">Duration: {formatDuration(stats.duration)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600">Quality: {getSleepQualityText(entry.quality)}</span>
                </div>
              </div>

              {entry.mood && (
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <div className="px-3 py-1 bg-indigo-100 rounded-full text-indigo-700 text-sm">
                    {entry.mood}
                  </div>
                </div>
              )}

              {entry.notes && (
                <div className="flex items-start space-x-2 text-gray-600">
                  <MessageCircle className="w-4 h-4 mt-1" />
                  <p className="text-sm">{entry.notes}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}