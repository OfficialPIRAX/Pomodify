import React, { useEffect } from 'react';
import TodoList from '../components/TodoList';
import PomodoroTimer from '../components/PomodoroTimer';
import HeatmapTracker from '../components/HeatmapTracker';
import ProgressStats from '../components/ProgressStats';
import { XMarkIcon, MinusIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  useEffect(() => {
    console.log('Electron object:', window.electron);
  }, []);

  // Handle window control actions
  const handleMinimize = () => {
    console.log('Minimize button clicked');
    if (window.electron) {
      window.electron.minimize();
    } else {
      console.error('Electron API not available');
    }
  };

  const handleMaximize = () => {
    console.log('Maximize button clicked');
    if (window.electron) {
      window.electron.maximize();
    } else {
      console.error('Electron API not available');
    }
  };

  const handleClose = () => {
    console.log('Close button clicked');
    if (window.electron) {
      window.electron.quit();
    } else {
      console.error('Electron API not available');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Draggable title bar region */}
      <div className="draggable-region h-8 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4">
        <h1 className="text-sm font-bold select-none">Productivity Dashboard</h1>
        
        {/* Window control buttons */}
        <div className="window-controls flex space-x-2">
          <button className="window-minimize" onClick={handleMinimize} title="Minimize">
            <MinusIcon className="w-3 h-3 mx-auto" />
          </button>
          <button className="window-maximize" onClick={handleMaximize} title="Maximize">
            <ArrowsPointingOutIcon className="w-3 h-3 mx-auto" />
          </button>
          <button className="window-close" onClick={handleClose} title="Close">
            <XMarkIcon className="w-3 h-3 mx-auto" />
          </button>
        </div>
      </div>

      {/* Main content with padding to account for the title bar */}
      <div className="pt-8 p-6">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Productivity Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Todo Lists */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TodoList category="today" title="Work Todos Today" />
              <TodoList category="planned" title="Planned" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TodoList category="forgotten" title="Forgotten" />
              <TodoList category="completed" title="Completed" />
            </div>
          </div>

          {/* Right Column - Pomodoro & Stats */}
          <div className="space-y-6">
            <PomodoroTimer />
            <ProgressStats />
            <HeatmapTracker />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 