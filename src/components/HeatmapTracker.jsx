import React, { useEffect, useState } from 'react';
import { usePomodoroStore } from '../hooks/usePomodoroStore';
import { format, parseISO } from 'date-fns';

function HeatmapTracker() {
  // Get data from pomodoro store
  const { getStats } = usePomodoroStore();
  const [heatmapData, setHeatmapData] = useState([]);
  
  useEffect(() => {
    const stats = getStats();
    setHeatmapData(stats.last30Days);
  }, [getStats]);
  
  // Function to get appropriate color based on count
  const getColor = (count) => {
    if (count === 0) return 'bg-neutral';
    if (count < 3) return 'bg-accent-red bg-opacity-30';
    if (count < 6) return 'bg-accent-red bg-opacity-50';
    if (count < 9) return 'bg-accent-red bg-opacity-70';
    return 'bg-accent-red';
  };
  
  // Calculate days of the week (0 = Sunday, 6 = Saturday)
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Chunk data into weeks for the heatmap grid
  const weeks = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }
  
  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-4 pb-2 border-b border-primary">Activity Heatmap</h2>
      
      <div className="text-xs text-gray-400 flex mb-2">
        <div className="w-6"></div>
        {daysOfWeek.map((day, i) => (
          <div key={i} className="w-6 text-center">{day}</div>
        ))}
      </div>
      
      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex">
            <div className="text-xs text-gray-400 w-6 flex items-center justify-center">
              {weekIndex * 7 + 1 < heatmapData.length && 
                format(parseISO(heatmapData[weekIndex * 7].date), 'd')}
            </div>
            <div className="flex space-x-1 flex-1">
              {week.map((day, dayIndex) => (
                <div 
                  key={dayIndex} 
                  className={`w-6 h-6 rounded-sm ${getColor(day.count)}`}
                  title={`${format(parseISO(day.date), 'yyyy-MM-dd')}: ${day.count} sessions`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-end mt-2">
        <div className="flex items-center text-xs text-gray-400 space-x-1">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-neutral"></div>
          <div className="w-3 h-3 rounded-sm bg-accent-red bg-opacity-30"></div>
          <div className="w-3 h-3 rounded-sm bg-accent-red bg-opacity-50"></div>
          <div className="w-3 h-3 rounded-sm bg-accent-red bg-opacity-70"></div>
          <div className="w-3 h-3 rounded-sm bg-accent-red"></div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

export default HeatmapTracker; 