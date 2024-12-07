import React from 'react';
import { format, startOfMonth, getDaysInMonth, subMonths } from 'date-fns';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useSleepStore } from '../../store/sleepStore';
import { calculateSleepDuration } from '../../utils/timeUtils';
import { MonthlySummary } from './MonthlySummary';
import { MonthlyStats } from './MonthlyStats';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function MonthlyAnalytics() {
  const entries = useSleepStore((state) => state.entries);
  const currentMonth = startOfMonth(new Date());
  const lastMonth = startOfMonth(subMonths(new Date(), 1));
  
  const daysInMonth = getDaysInMonth(currentMonth);

  const monthDays = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    label: format(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1), 'd'),
  }));

  const currentMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.startTime);
    return format(entryDate, 'yyyy-MM') === format(currentMonth, 'yyyy-MM');
  });

  const lastMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.startTime);
    return format(entryDate, 'yyyy-MM') === format(lastMonth, 'yyyy-MM');
  });

  const data = {
    labels: monthDays.map((day) => day.label),
    datasets: [
      {
        label: 'Sleep Duration (hours)',
        data: monthDays.map((day) => {
          const entry = entries.find(
            (e) =>
              parseInt(format(new Date(e.startTime), 'd')) === day.day &&
              format(new Date(e.startTime), 'M') === format(currentMonth, 'M')
          );
          return entry
            ? calculateSleepDuration(new Date(entry.startTime), new Date(entry.endTime)) / 60
            : null;
        }),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
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
        text: `Sleep Pattern for ${format(currentMonth, 'MMMM yyyy')}`,
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Analysis</h2>
        <Line data={data} options={options} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlySummary
          entries={currentMonthEntries}
          title={`${format(currentMonth, 'MMMM yyyy')}`}
        />
        <MonthlySummary
          entries={lastMonthEntries}
          title={`${format(lastMonth, 'MMMM yyyy')}`}
        />
      </div>

      <MonthlyStats entries={currentMonthEntries} />
    </div>
  );
}