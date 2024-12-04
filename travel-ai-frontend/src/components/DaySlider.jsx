import React from 'react';
import { Calendar } from 'lucide-react';

export default function DaySlider({ currentDay, onChange }) {
  return (
    <div className="bg-gray-900/90 backdrop-blur-sm p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-white">
          <Calendar className="w-5 h-5 mr-2" />
          <span>Day {currentDay}</span>
        </div>
      </div>
      
      <input
        type="range"
        min={1}
        max={7}
        value={currentDay}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
      />
      
      <div className="flex justify-between text-sm text-gray-400 mt-2">
        <span>Day 1</span>
        <span>Day 7</span>
      </div>
    </div>
  );
}