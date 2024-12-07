import React from 'react';
import { BookOpen } from 'lucide-react';

interface SleepNotesProps {
  value: string;
  onChange: (notes: string) => void;
}

export function SleepNotes({ value, onChange }: SleepNotesProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <BookOpen className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium text-gray-700">Sleep Notes</h3>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="How was your sleep? Any dreams? Write your thoughts..."
        className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
      />
    </div>
  );
}