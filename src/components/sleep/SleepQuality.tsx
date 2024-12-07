import React from 'react';
import { Star } from 'lucide-react';

interface SleepQualityProps {
  value: number;
  onChange: (rating: number) => void;
}

export function SleepQuality({ value, onChange }: SleepQualityProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-lg font-medium text-gray-700">How did you sleep?</h3>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(rating)}
            className={`p-1 rounded-full transition-colors ${
              rating <= value ? 'text-yellow-400' : 'text-gray-300'
            }`}
          >
            <Star className="w-8 h-8 fill-current" />
          </button>
        ))}
      </div>
    </div>
  );
}