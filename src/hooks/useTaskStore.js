import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { isAfter, isBefore, startOfDay, isToday, parseISO } from 'date-fns';

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],
      
      // Add a new task
      addTask: (task) => set((state) => ({ 
        tasks: [...state.tasks, { 
          id: uuidv4(), 
          createdAt: new Date().toISOString(),
          status: 'open',
          ...task 
        }] 
      })),
      
      // Delete a task by id
      deleteTask: (id) => set((state) => ({ 
        tasks: state.tasks.filter(task => task.id !== id) 
      })),
      
      // Update a task
      updateTask: (id, updates) => set((state) => ({ 
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, ...updates } : task
        ) 
      })),
      
      // Move task to a different category
      moveTask: (id, category) => set((state) => ({ 
        tasks: state.tasks.map(task => 
          task.id === id ? { ...task, category } : task
        ) 
      })),
      
      // Complete a task
      completeTask: (id) => set((state) => ({ 
        tasks: state.tasks.map(task => 
          task.id === id ? { 
            ...task, 
            status: 'done',
            completedAt: new Date().toISOString(),
            category: 'completed'
          } : task
        ) 
      })),
      
      // Mark tasks as overdue if they have a deadline in the past
      // Also move planned tasks to forgotten if they're past their planned time
      updateTaskStatuses: () => set((state) => {
        const now = new Date();
        const today = startOfDay(now);
        
        return {
          tasks: state.tasks.map(task => {
            // Skip completed tasks
            if (task.status === 'done') return task;
            
            // Check for overdue tasks
            if (task.deadline && isBefore(new Date(task.deadline), now) && task.status !== 'overdue') {
              return { ...task, status: 'overdue' };
            }
            
            // Check for tasks that were planned for a time that has passed
            if (task.category === 'planned' && task.plannedFor) {
              const plannedTime = new Date(task.plannedFor);
              
              // If planned time has passed and it's not already marked as forgotten
              if (isBefore(plannedTime, now)) {
                return { ...task, status: 'overplanned', category: 'forgotten' };
              }
            }
            
            // Check for overplanned tasks from previous days in the today category
            if (task.category === 'today' && task.createdAt && isBefore(new Date(task.createdAt), today) && task.status !== 'overplanned') {
              return { ...task, status: 'overplanned', category: 'forgotten' };
            }
            
            return task;
          })
        };
      }),
      
      // Get tasks by category
      getTasksByCategory: (category) => {
        return get().tasks.filter(task => task.category === category);
      },
      
      // Get tasks by status
      getTasksByStatus: (status) => {
        return get().tasks.filter(task => task.status === status);
      },
    }),
    {
      name: 'task-storage',
    }
  )
); 