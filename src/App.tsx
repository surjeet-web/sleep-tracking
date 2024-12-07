import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SleepTracker } from './components/sleep/SleepTracker';
import { WeeklyAnalytics } from './components/analytics/WeeklyAnalytics';
import { MonthlyAnalytics } from './components/analytics/MonthlyAnalytics';
import { SleepSchedule } from './components/schedule/SleepSchedule';
import { SleepGoals } from './components/goals/SleepGoals';
import { Achievements } from './components/achievements/Achievements';
import { Navbar } from './components/navigation/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-100 pb-20">
        <div className="max-w-4xl mx-auto p-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Sleep Better
          </h1>
          <Routes>
            <Route path="/" element={
              <div className="space-y-6">
                <SleepTracker />
                <SleepGoals />
                <Achievements />
              </div>
            } />
            <Route path="/weekly" element={<WeeklyAnalytics />} />
            <Route path="/monthly" element={<MonthlyAnalytics />} />
            <Route path="/schedule" element={<SleepSchedule />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </BrowserRouter>
  );
}

export default App;