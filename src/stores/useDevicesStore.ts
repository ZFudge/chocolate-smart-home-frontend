import { create } from 'zustand';
import { DeviceMapping, DeviceObjectType, Tag } from '@/interfaces';

interface DevicesStore {
  devices: DeviceMapping;
  addDeviceData: (newDevice: DeviceObjectType | DeviceObjectType[]) => void;
  tags: Tag[];
  filteredTagIds: number[];
  filteredValue: string;
  addTagsData: (newTags: Tag[]) => void;
  setFilteredTagIds: (filteredTagIds: number[]) => void;
  setFilteredValue: (filteredValue: string) => void;
}

const useDevicesStore = create<DevicesStore>((set, get) => ({
  devices: {} as DeviceMapping,
  addDeviceData: (newDevice: DeviceObjectType | DeviceObjectType[]) => {
    const devices = get().devices;
    if (Array.isArray(newDevice)) {
      newDevice.forEach((device) => (devices[device.mqtt_id] = device));
    } else {
      devices[newDevice.mqtt_id] = newDevice;
    }
    set({ devices });
  },
  tags: [] as Tag[],
  filteredTagIds: [] as number[],
  filteredValue: '' as string,
  setFilteredTagIds: (filteredTagIds: number[]) => set({ filteredTagIds }),
  setFilteredValue: (filteredValue: string) => set({ filteredValue }),
  addTagsData: (newTags: Tag[]) => set({ tags: newTags }),
}));

export default useDevicesStore;
