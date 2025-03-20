import React, { useEffect, useState } from 'react';
import { usePomodoroStore } from '../hooks/usePomodoroStore';
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

// Helper function to format time
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

function PomodoroTimer() {
  // Get state and actions from our stores
  const { 
    isRunning, 
    mode, 
    timeLeft, 
    startTimer, 
    pauseTimer, 
    resetTimer, 
    tick,
    completeSession,
    sessionsToday 
  } = usePomodoroStore();
  
  // Calculate progress percentage for the circle
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    // Reset daily counter on component mount
    usePomodoroStore.getState().resetDailyCounter();
  }, []);
  
  useEffect(() => {
    // Calculate progress based on mode and time left
    const totalTime = mode === 'pomodoro' ? 25 * 60 : 5 * 60;
    const percentage = (timeLeft / totalTime) * 100;
    setProgress(percentage);
    
    // Timer logic
    let timerId = null;
    
    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        tick();
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Timer complete
      completeSession();
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning, timeLeft, mode, tick, completeSession]);
  
  // Handler for play/pause
  const handlePlayPause = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  };
  
  // Get circle stroke color based on mode
  const getStrokeColor = () => {
    return mode === 'pomodoro' ? 'stroke-accent-red' : 'stroke-accent-blue';
  };
  
  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-4 pb-2 border-b border-primary">Pomodoro Timer</h2>
      
      <div className="flex flex-col items-center">
        {/* Timer Circle */}
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45"
              fill="transparent"
              stroke="#2A2A2A"
              strokeWidth="8"
            />
            
            {/* Progress circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45"
              fill="transparent"
              stroke={mode === 'pomodoro' ? '#CF6679' : '#64B5F6'}
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              transform="rotate(-90 50 50)"
            />
          </svg>
          
          {/* Time display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{formatTime(timeLeft)}</span>
            <span className="text-xs text-gray-400 capitalize">{mode} Mode</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex space-x-4 mt-4">
          <button
            onClick={handlePlayPause}
            className="btn btn-circle btn-primary"
          >
            {isRunning ? (
              <PauseIcon className="w-6 h-6" />
            ) : (
              <PlayIcon className="w-6 h-6" />
            )}
          </button>
          
          <button
            onClick={resetTimer}
            className="btn btn-circle btn-outline"
          >
            <ArrowPathIcon className="w-6 h-6" />
          </button>
        </div>
        
        {/* Stats */}
        <div className="mt-4 text-center">
          <span className="text-sm text-gray-400">Sessions Today</span>
          <div className="text-2xl font-bold">{sessionsToday}</div>
        </div>
      </div>
    </div>
  );
}

export default PomodoroTimer; 