import React, { useState, useEffect } from 'react';
import { useTaskStore } from '../hooks/useTaskStore';
import TaskItem from './TaskItem';
import { PlusIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function TodoList({ category, title }) {
  const [newTaskName, setNewTaskName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [plannedDate, setPlannedDate] = useState(new Date());
  
  // Get tasks from the store
  const { tasks, addTask, updateTaskStatuses, getTasksByCategory } = useTaskStore();
  const categoryTasks = getTasksByCategory(category);
  
  // Update task statuses on component mount and periodically
  useEffect(() => {
    updateTaskStatuses();
    
    // Check for status updates every minute
    const interval = setInterval(() => {
      updateTaskStatuses();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [updateTaskStatuses]);
  
  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTask = {
        name: newTaskName.trim(),
        category,
        status: 'open',
        tag: 'work', // Default tag
      };
      
      // Add planned date if this is the planned category
      if (category === 'planned' && plannedDate) {
        newTask.plannedFor = plannedDate.toISOString();
      }
      
      addTask(newTask);
      setNewTaskName('');
      setPlannedDate(new Date());
      setIsAdding(false);
    }
  };
  
  const getListHeaderColor = () => {
    switch (category) {
      case 'today':
        return 'border-primary';
      case 'planned':
        return 'border-accent-blue';
      case 'forgotten':
        return 'border-gray-500';
      case 'completed':
        return 'border-secondary';
      default:
        return 'border-primary';
    }
  };
  
  return (
    <div className="card">
      <div className={`flex items-center justify-between mb-4 pb-2 border-b ${getListHeaderColor()}`}>
        <h2 className="text-lg font-medium">{title}</h2>
        
        {category !== 'completed' && category !== 'forgotten' && (
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {isAdding && (
        <div className="mb-4 space-y-2">
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="New task..."
            className="input input-bordered input-sm w-full bg-neutral"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          
          {category === 'planned' && (
            <div className="w-full">
              <DatePicker
                selected={plannedDate}
                onChange={(date) => setPlannedDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="input input-bordered input-sm w-full bg-neutral text-white"
                wrapperClassName="w-full"
                popperClassName="react-datepicker-dark"
                placeholderText="Select date and time"
              />
            </div>
          )}
          
          <button onClick={handleAddTask} className="btn btn-sm btn-primary w-full">
            Add Task
          </button>
        </div>
      )}
      
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
        {categoryTasks.length === 0 ? (
          <div className="text-gray-500 text-center py-4">No tasks yet</div>
        ) : (
          categoryTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList; 