import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { DeviceMapping } from './interfaces';
import { DeviceObjectTypes } from './types';

const useDevicesStore = create(
  combine(
    {
      devices: {} as DeviceMapping,
    },
    (set) => {
      return {
        addDeviceData: (newDevice: DeviceObjectTypes) => {
          set((state) => ({
            devices: {
              ...state.devices,
              [newDevice.mqtt_id]: newDevice,
            },
          }));
        },
      };
    }
  )
);

export default useDevicesStore;
