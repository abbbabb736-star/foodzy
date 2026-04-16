import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme(theme) {
        set({ theme: theme === 'dark' ? 'dark' : 'light' });
      },
      toggleTheme() {
        set({ theme: get().theme === 'light' ? 'dark' : 'light' });
      },
    }),
    {
      name: 'exam7-settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
