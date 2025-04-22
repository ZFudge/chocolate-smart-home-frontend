import { create } from 'zustand';
import { combine } from 'zustand/middleware';

import { NeoPixelObject } from './components/NeoPixels/interfaces';
import { DeviceMapping } from './interfaces';


const useDevicesStore = create(
  combine(
    {
      devices: {} as DeviceMapping,
    },
    (set) => {
      return {
        addDeviceData: (newDevice: NeoPixelObject) => {
          set((state) => ({
            devices: {
              ...state.devices,
              [newDevice.mqtt_id]: newDevice,
            },
          }));
        },
      };
    }
  ),
);

export default useDevicesStore;
