import { create } from 'zustand';

export interface AppStore {
  color: string;
  setColor: (color: string) => void;
}

const useAppStore = create<AppStore>((set) => ({
  color: localStorage.getItem('color') || 'blue',
  setColor: (color: string) => {
    localStorage.setItem('color', color);
    set({ color });
  },
}));

export default useAppStore;
