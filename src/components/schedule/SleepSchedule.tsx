import React, { useEffect } from 'react';
import { Clock, Bell } from 'lucide-react';
import { useSleepStore } from '../../store/sleepStore';

export function SleepSchedule() {
  const { scheduleTime, setScheduleTime } = useSleepStore();

  useEffect(() => {
    if (scheduleTime) {
      // Request notification permission
      if ('Notification' in window) {
        Notification.requestPermission();
      }

      // Set up notification
      const [hours, minutes] = scheduleTime.split(':');
      const now = new Date();
      let notificationTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        parseInt(hours),
        parseInt(minutes)
      );

      if (notificationTime < now) {
        notificationTime.setDate(notificationTime.getDate() + 1);
      }

      const timeUntilNotification = notificationTime.getTime() - now.getTime();

      setTimeout(() => {
        if (Notification.permission === 'granted') {
          new Notification('Time for bed!', {
            body: 'Maintain a consistent sleep schedule for better rest.',
            icon: '/moon.png',
          });
        }
      }, timeUntilNotification);
    }
  }, [scheduleTime]);

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Sleep Schedule</h2>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <label htmlFor="bedtime" className="text-gray-700 font-medium">
              Set your bedtime
            </label>
            <input
              type="time"
              id="bedtime"
              value={scheduleTime || ''}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {scheduleTime && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Bell className="w-5 h-5" />
              <p>You'll receive a notification at {scheduleTime}</p>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Sleep Schedule Tips</h3>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Go to bed at the same time every night</li>
              <li>Aim for 7-9 hours of sleep</li>
              <li>Avoid screens 1 hour before bedtime</li>
              <li>Create a relaxing bedtime routine</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}