import { create } from 'zustand';
import { LEONARDO, NEO_PIXEL, ON_OFF } from '@/components/devices';
import { NeoPixelObject } from '@/components/devices/NeoPixels/interfaces';
import { OnOffObject } from '@/components/devices/OnOff/interfaces';
import { DeviceMapping, DeviceObject, DeviceObjectType, Tag } from '@/interfaces';

interface DevicesStore {
  devices: DeviceMapping;
  addDeviceData: (newDevice: DeviceObjectType | DeviceObjectType[]) => void;
  tags: Tag[];
  filteredTagIds: number[];
  filteredValue: string;
  addTagsData: (newTags: Tag[]) => void;
  setFilteredTagIds: (filteredTagIds: number[]) => void;
  setFilteredValue: (filteredValue: string) => void;
  onOffDevices: Record<number, OnOffObject>;
  neoPixelDevices: Record<number, NeoPixelObject>;
  leonardoDevices: Record<number, DeviceObject>;
  triageDevice: (newDevice: DeviceObjectType) => void;
}

const useDevicesStore = create<DevicesStore>((set, get) => ({
  devices: {} as DeviceMapping,
  onOffDevices: {} as Record<number, OnOffObject>,
  neoPixelDevices: {} as Record<number, NeoPixelObject>,
  leonardoDevices: {} as Record<number, DeviceObject>,
  triageDevice: (newDevice: DeviceObjectType) => {
    switch (newDevice.device_type_name) {
      case ON_OFF:
        set({
          onOffDevices: { ...get().onOffDevices, [newDevice.mqtt_id]: newDevice as OnOffObject },
        });
        break;
      case NEO_PIXEL:
        set({
          neoPixelDevices: {
            ...get().neoPixelDevices,
            [newDevice.mqtt_id]: newDevice as NeoPixelObject,
          },
        });
        break;
      case LEONARDO:
        set({
          leonardoDevices: {
            ...get().leonardoDevices,
            [newDevice.mqtt_id]: newDevice as DeviceObject,
          },
        });
        break;
      default:
        break;
    }
  },
  addDeviceData: (newDevice: DeviceObjectType | DeviceObjectType[]) => {
    const devices = get().devices;
    const handleDevice = (device: DeviceObjectType) => {
      device.tags = device.tags ?? [];
      devices[device.mqtt_id] = device;
      get().triageDevice(device);
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
