import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, format, parseISO, startOfDay } from 'date-fns';

// Constants for Pomodoro timer
const POMODORO_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

export const usePomodoroStore = create(
  persist(
    (set, get) => ({
      // Timer state
      isRunning: false,
      mode: 'pomodoro', // 'pomodoro' or 'break'
      timeLeft: POMODORO_TIME,
      pomodorosCompleted: 0,
      sessionsToday: 0,
      
      // History of pomodoro sessions for heatmap
      history: [],
      
      // Timer controls
      startTimer: () => set({ isRunning: true }),
      pauseTimer: () => set({ isRunning: false }),
      resetTimer: () => set((state) => ({ 
        timeLeft: state.mode === 'pomodoro' ? POMODORO_TIME : BREAK_TIME,
        isRunning: false 
      })),
      
      // Timer tick function (to be called each second)
      tick: () => set((state) => {
        if (!state.isRunning || state.timeLeft <= 0) return state;
        
        return { timeLeft: state.timeLeft - 1 };
      }),
      
      // Complete current timer session
      completeSession: () => set((state) => {
        // Check if it was a pomodoro or a break
        if (state.mode === 'pomodoro') {
          const today = format(new Date(), 'yyyy-MM-dd');
          const existingEntry = state.history.find(entry => entry.date === today);
          
          // Update history for heatmap
          const updatedHistory = existingEntry
            ? state.history.map(entry => 
                entry.date === today 
                  ? { ...entry, count: entry.count + 1 } 
                  : entry
              )
            : [...state.history, { date: today, count: 1 }];
            
          // Switch to break mode
          return {
            mode: 'break',
            timeLeft: BREAK_TIME,
            isRunning: true,
            pomodorosCompleted: state.pomodorosCompleted + 1,
            sessionsToday: state.sessionsToday + 1,
            history: updatedHistory
          };
        } else {
          // Switch back to pomodoro mode
          return {
            mode: 'pomodoro',
            timeLeft: POMODORO_TIME,
            isRunning: true
          };
        }
      }),
      
      // Reset daily counter at the start of a new day
      resetDailyCounter: () => set((state) => {
        const now = new Date();
        const today = format(now, 'yyyy-MM-dd');
        const lastSession = state.history[state.history.length - 1];
        
        // If no sessions or last session was from a different day, reset counter
        if (!lastSession || lastSession.date !== today) {
          return { sessionsToday: 0 };
        }
        
        return state;
      }),
      
      // Get statistics
      getStats: () => {
        const { pomodorosCompleted, sessionsToday, history } = get();
        const today = format(new Date(), 'yyyy-MM-dd');
        
        // Get total hours
        const totalHours = (pomodorosCompleted * 25) / 60;
        
        // Get last 30 days of data for heatmap
        const last30Days = [];
        const now = new Date();
        
        for (let i = 29; i >= 0; i--) {
          const date = format(addDays(startOfDay(now), -i), 'yyyy-MM-dd');
          const historyEntry = history.find(entry => entry.date === date);
          
          last30Days.push({
            date,
            count: historyEntry ? historyEntry.count : 0
          });
        }
        
        return {
          totalPomodoros: pomodorosCompleted,
          todayPomodoros: sessionsToday,
          totalHours,
          last30Days
        };
      }
    }),
    {
      name: 'pomodoro-storage',
    }
  )
); 