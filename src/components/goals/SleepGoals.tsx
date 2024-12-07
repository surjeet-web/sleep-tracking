import React, { useState } from 'react';
import { Target, Plus, Check } from 'lucide-react';
import { useSleepStore } from '../../store/sleepStore';
import type { SleepGoal } from '../../types/sleep';

export function SleepGoals() {
  const { goals, addGoal, updateGoal } = useSleepStore();
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    targetBedtime: '22:00',
    targetDuration: 480,
    targetQuality: 4,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      id: crypto.randomUUID(),
      ...newGoal,
      isActive: true,
    });
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Target className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">Sleep Goals</h2>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Bedtime</label>
            <input
              type="time"
              value={newGoal.targetBedtime}
              onChange={(e) => setNewGoal({ ...newGoal, targetBedtime: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Target Sleep Duration (hours)
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={newGoal.targetDuration / 60}
              onChange={(e) =>
                setNewGoal({ ...newGoal, targetDuration: parseInt(e.target.value) * 60 })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Quality</label>
            <select
              value={newGoal.targetQuality}
              onChange={(e) =>
                setNewGoal({ ...newGoal, targetQuality: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {[1, 2, 3, 4, 5].map((quality) => (
                <option key={quality} value={quality}>
                  {quality} Stars
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Goal
          </button>
        </form>
      )}

      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-gray-800">Bedtime: {goal.targetBedtime}</h3>
              <p className="text-sm text-gray-600">
                Duration: {goal.targetDuration / 60} hours | Quality: {goal.targetQuality} stars
              </p>
            </div>
            <button
              onClick={() => updateGoal(goal.id, { isActive: !goal.isActive })}
              className={`p-2 rounded-full ${
                goal.isActive ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'
              }`}
            >
              <Check className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}