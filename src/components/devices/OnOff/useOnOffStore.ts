import { create } from 'zustand';
import { OnOffObject } from '@/components/devices/OnOff/interfaces';

interface OnOffStore {
  onOffDevices: Record<number, OnOffObject>;
  addOnOffData: (newDevice: OnOffObject) => void;
  selectedDevices: number[];
  setSelectedDevices: (selectedDevices: number[]) => void;
  toggleAll: () => void;
  toggleDevice: (mqtt_id: number) => void;
}

const useOnOffStore = create<OnOffStore>((set, get) => ({
  onOffDevices: {} as Record<number, OnOffObject>,
  addOnOffData: (newDevice: OnOffObject) => {
    set({ onOffDevices: { ...get().onOffDevices, [newDevice.mqtt_id]: newDevice as OnOffObject } });
  },
  toggleAll: () =>
    set({
      selectedDevices:
        get().selectedDevices.length < Object.keys(get().onOffDevices).length
          ? Object.keys(get().onOffDevices).map(parseInt)
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
}));

export default useOnOffStore;
