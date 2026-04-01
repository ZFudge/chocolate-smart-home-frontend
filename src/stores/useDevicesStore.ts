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
    const handleDevice = (device: DeviceObjectType) => {
      device.tags = device.tags ?? [];
      devices[device.mqtt_id] = device;
    };
    if (Array.isArray(newDevice)) {
      newDevice.forEach(handleDevice);
    } else {
      handleDevice(newDevice);
    }
    set({ devices });
  },
  tags: [] as Tag[],
  filteredTagIds: [] as number[],
  filteredValue: '' as string,
  setFilteredTagIds: (filteredTagIds: number[]) => set({ filteredTagIds }),
  setFilteredValue: (filteredValue: string) => set({ filteredValue }),
  addTagsData: (newTags: Tag[]) => set({ tags: [...get().tags, ...newTags] }),
}));

export default useDevicesStore;
