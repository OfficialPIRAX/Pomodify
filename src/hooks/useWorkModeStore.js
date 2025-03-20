import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWorkModeStore = create(
  persist(
    (set) => ({
      isWorkMode: false,
      toggleWorkMode: () => set((state) => ({ isWorkMode: !state.isWorkMode })),
      setWorkMode: (value) => set({ isWorkMode: value }),
    }),
    {
      name: 'work-mode-storage',
    }
  )
); 