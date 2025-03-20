import React from 'react';
import { useWorkModeStore } from '../hooks/useWorkModeStore';

function WorkModeToggle() {
  const { isWorkMode, toggleWorkMode } = useWorkModeStore();
  
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-400">Work Mode</span>
      <label className="swap swap-rotate">
        <input 
          type="checkbox" 
          checked={isWorkMode}
          onChange={toggleWorkMode}
        />
        
        {/* OFF icon */}
        <div className="swap-off bg-neutral rounded-full p-1">
          <div className="w-6 h-6 flex items-center justify-center text-xs">OFF</div>
        </div>
        
        {/* ON icon */}
        <div className="swap-on bg-accent-red rounded-full p-1">
          <div className="w-6 h-6 flex items-center justify-center text-xs">ON</div>
        </div>
      </label>
    </div>
  );
}

export default WorkModeToggle; 