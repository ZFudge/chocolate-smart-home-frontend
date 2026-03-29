import { create } from 'zustand';
import { NEO_PIXEL } from '@/components/devices/NeoPixels/constants';

export interface AppStore {
  color: string;
  setColor: (color: string) => void;
  tab: string;
  setTab: (value: string | null) => void;
}

const useAppStore = create<AppStore>((set) => ({
  color: localStorage.getItem('color') || 'blue',
  setColor: (color: string) => {
    localStorage.setItem('color', color);
    set({ color });
  },
  tab: localStorage.getItem('tab') ?? NEO_PIXEL,
  setTab: (tab: string | null) => {
    localStorage.setItem('tab', tab || NEO_PIXEL);
    set({ tab: tab || NEO_PIXEL });
  },
}));

export default useAppStore;
