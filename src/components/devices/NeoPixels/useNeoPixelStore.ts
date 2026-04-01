import { create } from 'zustand';
import { NeoPixelObject } from './interfaces';

interface NeoPixelStore {
  neoPixelDevices: Record<number, NeoPixelObject>;
  addNeoPixelData: (newDevice: NeoPixelObject) => void;
  selectedDevices: number[];
  setSelectedDevices: (selectedDevices: number[]) => void;
  toggleAll: () => void;
  toggleDevice: (mqtt_id: number) => void;
  selectedPaletteDevices: number[] | number | null;
  setSelectedPaletteDevices: (selectedPaletteDevices: number[] | number | null) => void;
}

const useNeoPixelStore = create<NeoPixelStore>((set, get) => ({
  neoPixelDevices: {} as Record<number, NeoPixelObject>,
  addNeoPixelData: (newDevice: NeoPixelObject) => {
    set({
      neoPixelDevices: {
        ...get().neoPixelDevices,
        [newDevice.mqtt_id]: newDevice as NeoPixelObject,
      },
    });
  },
  toggleAll: () =>
    set({
      selectedDevices:
        get().selectedDevices.length < Object.keys(get().neoPixelDevices).length
          ? Object.keys(get().neoPixelDevices).map(parseInt)
          : [],
    }),
  toggleDevice: (mqtt_id: number) =>
    set({
      selectedDevices: get().selectedDevices.includes(mqtt_id)
        ? get().selectedDevices.filter((id) => id !== mqtt_id)
        : [...get().selectedDevices, mqtt_id],
    }),
  selectedDevices: [] as number[],
  setSelectedDevices: (selectedDevices: number[]) => set({ selectedDevices }),
  selectedPaletteDevices: [] as number[] | number | null,
  setSelectedPaletteDevices: (selectedPaletteDevices: number[] | number | null) =>
    set({ selectedPaletteDevices }),
}));

export default useNeoPixelStore;
