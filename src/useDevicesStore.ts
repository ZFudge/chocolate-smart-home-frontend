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
          const addedDevices: DeviceMapping = {};
          if (Array.isArray(newDevice)) {
            newDevice.forEach((device) => {
              addedDevices[device.mqtt_id] = device;
            });
          }
          else {
            addedDevices[newDevice.mqtt_id] = newDevice;
          }
          set((state) => ({
            devices: {
              ...state.devices,
              ...addedDevices,
            },
          }));
        },
      };
    }
  )
);

export default useDevicesStore;
