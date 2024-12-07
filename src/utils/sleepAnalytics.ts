import type { SleepEntry, SleepStats } from '../types/sleep';
import { calculateSleepDuration } from './timeUtils';

export const calculateSleepStats = (entry: SleepEntry): SleepStats => {
  const duration = calculateSleepDuration(new Date(entry.startTime), new Date(entry.endTime));
  const efficiency = calculateSleepEfficiency([entry]);

  return {
    duration,
    efficiency,
    quality: entry.quality,
  };
};

export const calculateAverageSleepTime = (entries: SleepEntry[]): number => {
  if (entries.length === 0) return 0;
  
  const totalDuration = entries.reduce((total, entry) => {
    return total + calculateSleepDuration(new Date(entry.startTime), new Date(entry.endTime));
  }, 0);
  
  return Math.round(totalDuration / entries.length);
};

export const calculateSleepEfficiency = (entries: SleepEntry[]): number => {
  if (entries.length === 0) return 0;
  
  const totalDuration = entries.reduce((total, entry) => {
    return total + calculateSleepDuration(new Date(entry.startTime), new Date(entry.endTime));
  }, 0);
  
  // Calculate efficiency based on recommended 8 hours of sleep
  const optimalDuration = entries.length * 480; // 480 minutes = 8 hours
  return Math.min((totalDuration / optimalDuration) * 100, 100);
};

export const getSleepQualityText = (quality: number): string => {
  switch (quality) {
    case 5:
      return 'Excellent';
    case 4:
      return 'Good';
    case 3:
      return 'Fair';
    case 2:
      return 'Poor';
    case 1:
      return 'Very Poor';
    default:
      return 'Not Rated';
  }
};