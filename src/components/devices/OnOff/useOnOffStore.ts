import { create } from 'zustand';
import { OnOffObject } from '@/components/devices/OnOff/interfaces';

interface OnOffStore {
  onOffDevices: Record<number, OnOffObject>;
  addOnOffData: (newDevice: OnOffObject) => void;
}

const useOnOffStore = create<OnOffStore>((set, get) => ({
  onOffDevices: {} as Record<number, OnOffObject>,
  addOnOffData: (newDevice: OnOffObject) => {
    set({ onOffDevices: { ...get().onOffDevices, [newDevice.mqtt_id]: newDevice as OnOffObject } });
  },
}));

export default useOnOffStore;
