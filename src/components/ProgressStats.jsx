import React, { useEffect, useState } from 'react';
import { usePomodoroStore } from '../hooks/usePomodoroStore';
import { TrophyIcon, ClockIcon } from '@heroicons/react/24/outline';

function ProgressStats() {
  const { getStats } = usePomodoroStore();
  const [stats, setStats] = useState({
    totalPomodoros: 0,
    todayPomodoros: 0,
    totalHours: 0
  });
  
  useEffect(() => {
    // Initial fetch
    setStats(getStats());
    
    // Update stats every minute
    const interval = setInterval(() => {
      setStats(getStats());
    }, 60000);
    
    return () => clearInterval(interval);
  }, [getStats]);
  
  // Calculate rank (this is just for UI purposes - in a real app this would compare to other users)
  const getRank = () => {
    if (stats.totalPomodoros < 10) return 'Novice';
    if (stats.totalPomodoros < 50) return 'Apprentice';
    if (stats.totalPomodoros < 100) return 'Expert';
    if (stats.totalPomodoros < 200) return 'Master';
    return 'Grandmaster';
  };
  
  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-4 pb-2 border-b border-primary">Your Progress</h2>
      
      <div className="space-y-4">
        {/* Rank */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
            <TrophyIcon className="w-5 h-5 text-primary" />
          </div>
          <div className="ml-3">
            <div className="text-sm text-gray-400">Current Rank</div>
            <div className="font-medium">{getRank()}</div>
          </div>
        </div>
        
        {/* Total Hours */}
        <div className="flex items-center">
          <div className="w-10 h-10 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center">
            <ClockIcon className="w-5 h-5 text-secondary" />
          </div>
          <div className="ml-3">
            <div className="text-sm text-gray-400">Total Focus Time</div>
            <div className="font-medium">{stats.totalHours.toFixed(1)} hours</div>
          </div>
        </div>
        
        {/* Pomodoro Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-sm text-gray-400">All Time</div>
            <div className="text-xl font-bold">{stats.totalPomodoros}</div>
            <div className="text-xs text-gray-400">pomodoros</div>
          </div>
          
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-sm text-gray-400">Today</div>
            <div className="text-xl font-bold">{stats.todayPomodoros}</div>
            <div className="text-xs text-gray-400">pomodoros</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressStats; 