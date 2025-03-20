import React, { useEffect, useState } from 'react';
import { usePomodoroStore } from '../hooks/usePomodoroStore';
import { format, parseISO, getDay } from 'date-fns';

function HeatmapTracker() {
  // Get data from pomodoro store
  const { getStats } = usePomodoroStore();
  const [monthData, setMonthData] = useState({
    name: '',
    year: 0,
    data: []
  });
  
  useEffect(() => {
    const stats = getStats();
    setMonthData(stats.currentMonth || { name: '', year: 0, data: [] });
    
    // Clean up old history data
    usePomodoroStore.getState().cleanupHistory();
  }, [getStats]);
  
  // Function to get appropriate color based on count
  const getColor = (count, isToday) => {
    if (isToday) {
      return count === 0 
        ? 'bg-primary bg-opacity-20 ring-2 ring-primary' 
        : 'bg-primary ring-2 ring-primary';
    }
    
    if (count === 0) return 'bg-neutral';
    if (count < 3) return 'bg-accent-red bg-opacity-30';
    if (count < 6) return 'bg-accent-red bg-opacity-50';
    if (count < 9) return 'bg-accent-red bg-opacity-70';
    return 'bg-accent-red';
  };
  
  // Calculate days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Organize days into a grid for the current month
  const renderMonthGrid = () => {
    if (!monthData.data || monthData.data.length === 0) {
      return <div className="text-gray-500 text-center py-4">No data available</div>;
    }
    
    // Create a 7-column grid (one for each day of the week)
    const grid = Array(7).fill().map(() => []);
    
    // Fill the grid with the days
    monthData.data.forEach(day => {
      const date = parseISO(day.date);
      const dayOfWeek = getDay(date);
      grid[dayOfWeek].push(day);
    });
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {/* Day names (Sun-Sat) */}
        {daysOfWeek.map((dayName, i) => (
          <div key={`header-${i}`} className="text-center text-xs font-medium text-gray-400 mb-2">
            {dayName}
          </div>
        ))}
        
        {/* Day cells */}
        {grid.map((column, colIndex) => (
          <div key={`col-${colIndex}`} className="flex flex-col gap-2">
            {column.map((day, dayIndex) => (
              <div
                key={`day-${colIndex}-${dayIndex}`}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${getColor(day.count, day.isToday)} hover:scale-110 transition-all duration-200 shadow-sm`}
                title={`${format(parseISO(day.date), 'MMM d, yyyy')}: ${day.count} sessions`}
              >
                <span className={`text-sm font-medium ${day.count > 0 ? 'text-white' : 'text-gray-500'}`}>
                  {day.day}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium">Activity Heatmap</h2>
        <div className="text-xl font-bold text-primary">{monthData.name} {monthData.year}</div>
      </div>
      
      <div className="p-4 flex justify-center">
        {renderMonthGrid()}
      </div>
      
      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-2 bg-surface p-2 rounded-full shadow-inner">
          <span className="text-xs text-gray-400">Less</span>
          <div className="w-3 h-3 rounded-full bg-neutral"></div>
          <div className="w-3 h-3 rounded-full bg-accent-red bg-opacity-30"></div>
          <div className="w-3 h-3 rounded-full bg-accent-red bg-opacity-50"></div>
          <div className="w-3 h-3 rounded-full bg-accent-red bg-opacity-70"></div>
          <div className="w-3 h-3 rounded-full bg-accent-red"></div>
          <span className="text-xs text-gray-400">More</span>
        </div>
      </div>
    </div>
  );
}

export default HeatmapTracker; 