import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { useSleepStore } from '../../store/sleepStore';

export function Achievements() {
  const { achievements } = useSleepStore();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-800">Achievements</h2>
      </div>

      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border ${
              achievement.unlockedAt
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-800">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
              {achievement.unlockedAt ? (
                <Award className="w-6 h-6 text-yellow-500" />
              ) : (
                <div className="w-20">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}