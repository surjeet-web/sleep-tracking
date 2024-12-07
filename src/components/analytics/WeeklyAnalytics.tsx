import React from 'react';
import { format, startOfWeek, addDays, isWithinInterval, subWeeks } from 'date-fns';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSleepStore } from '../../store/sleepStore';
import { calculateSleepDuration } from '../../utils/timeUtils';
import { WeeklySummary } from './WeeklySummary';
import { WeeklyStats } from './WeeklyStats';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function WeeklyAnalytics() {
  const entries = useSleepStore((state) => state.entries);
  const startDate = startOfWeek(new Date());
  const lastWeekStart = startOfWeek(subWeeks(new Date(), 1));
  
  const weekDays = Array.from({ length: 7 }, (_, i) => ({
    date: addDays(startDate, i),
    label: format(addDays(startDate, i), 'EEE'),
  }));

  const thisWeekEntries = entries.filter(entry => 
    isWithinInterval(new Date(entry.startTime), {
      start: startDate,
      end: addDays(startDate, 6)
    })
  );

  const lastWeekEntries = entries.filter(entry =>
    isWithinInterval(new Date(entry.startTime), {
      start: lastWeekStart,
      end: addDays(lastWeekStart, 6)
    })
  );

  const data = {
    labels: weekDays.map((day) => day.label),
    datasets: [
      {
        label: 'Sleep Duration (hours)',
        data: weekDays.map((day) => {
          const entry = entries.find(
            (e) =>
              format(new Date(e.startTime), 'yyyy-MM-dd') ===
              format(day.date, 'yyyy-MM-dd')
          );
          return entry
            ? calculateSleepDuration(new Date(entry.startTime), new Date(entry.endTime)) / 60
            : 0;
        }),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Sleep Pattern',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 12,
        title: {
          display: true,
          text: 'Hours',
        },
      },
    },
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Analysis</h2>
        <Bar data={data} options={options} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WeeklySummary entries={thisWeekEntries} title="This Week" />
        <WeeklySummary entries={lastWeekEntries} title="Last Week" />
      </div>

      <WeeklyStats entries={thisWeekEntries} />
    </div>
  );
}