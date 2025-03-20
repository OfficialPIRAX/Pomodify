import React, { useState } from 'react';
import { useTaskStore } from '../hooks/useTaskStore';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  PencilSquareIcon,
  ClockIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';

function TaskItem({ task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);
  const { updateTask, deleteTask, completeTask } = useTaskStore();
  
  const handleSaveEdit = () => {
    if (editedName.trim()) {
      updateTask(task.id, { name: editedName.trim() });
      setIsEditing(false);
    }
  };
  
  const getTaskClasses = () => {
    let classes = "todo-item";
    
    if (task.status === 'overdue') {
      classes += " todo-item-overdue";
    } else if (task.status === 'overplanned') {
      classes += " todo-item-overplanned";
    }
    
    return classes;
  };
  
  const getStatusColor = () => {
    switch (task.status) {
      case 'open':
        return 'text-white';
      case 'overdue':
        return 'text-accent-red';
      case 'overplanned':
        return 'text-gray-400';
      case 'done':
        return 'text-secondary';
      default:
        return 'text-white';
    }
  };
  
  const getTagBadge = () => {
    switch (task.tag) {
      case 'work':
        return <span className="badge badge-primary badge-sm">work</span>;
      case 'personal':
        return <span className="badge badge-secondary badge-sm">personal</span>;
      default:
        return <span className="badge badge-neutral badge-sm">{task.tag}</span>;
    }
  };
  
  return (
    <div className={getTaskClasses()}>
      {task.status === 'done' ? (
        <CheckCircleIcon className="w-5 h-5 text-secondary" />
      ) : (
        <button 
          onClick={() => completeTask(task.id)} 
          className="btn btn-circle btn-xs btn-ghost"
        >
          <CheckCircleIcon className="w-5 h-5" />
        </button>
      )}
      
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="input input-sm input-bordered w-full bg-neutral"
            onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
            onBlur={handleSaveEdit}
            autoFocus
          />
        ) : (
          <div className={`flex flex-col ${task.status === 'done' ? 'line-through text-gray-400' : getStatusColor()}`}>
            <div className="flex items-center">
              <span>{task.name}</span>
              {task.tag && (
                <div className="ml-2">
                  {getTagBadge()}
                </div>
              )}
            </div>
            
            {task.deadline && (
              <div className="text-xs flex items-center mt-1 text-gray-400">
                <ClockIcon className="w-3 h-3 mr-1" />
                <span>Due: {format(new Date(task.deadline), 'MMM d, yyyy')}</span>
              </div>
            )}
            
            {task.plannedFor && (
              <div className="text-xs flex items-center mt-1 text-accent-blue">
                <CalendarIcon className="w-3 h-3 mr-1" />
                <span>Planned: {format(new Date(task.plannedFor), 'MMM d, yyyy h:mm a')}</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      {task.status !== 'done' && !isEditing && (
        <div className="flex space-x-1">
          <button 
            onClick={() => setIsEditing(true)} 
            className="btn btn-circle btn-xs btn-ghost"
          >
            <PencilSquareIcon className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => deleteTask(task.id)} 
            className="btn btn-circle btn-xs btn-ghost text-accent-red"
          >
            <XCircleIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskItem; 