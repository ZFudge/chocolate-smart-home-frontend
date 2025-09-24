import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { DeviceMapping, DeviceObject } from './interfaces';

const useDevicesStore = create(
  combine(
    {
      devices: {} as DeviceMapping,
    },
    (set) => {
      return {
        addDeviceData: (newDevice: DeviceObject) => {
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
