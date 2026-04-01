import { useEffect } from 'react';
import { NeoPixelsTable, NoNeoPixels } from '@/components/devices';
import { DeviceObject } from '@/interfaces';
import { useDevicesStore } from '@/stores';
import { NEO_PIXEL } from './constants';
import { NeoPixelObject } from './interfaces';
import useNeoPixelStore from './useNeoPixelStore';

const NeoPixelsPage = () => {
  const { addNeoPixelData, neoPixelDevices } = useNeoPixelStore();

  useEffect(() => {
    useDevicesStore.subscribe((state, prevState) => {
      if (
        state.filteredTagIds !== prevState.filteredTagIds ||
        state.filteredValue !== prevState.filteredValue
      ) {
        return;
      }
      Object.values(state.devices).forEach((device: DeviceObject) => {
        if (device.device_type_name !== NEO_PIXEL) {
          return;
        }
        const neoPixelDevice = neoPixelDevices[device.mqtt_id];
        if (neoPixelDevice) {
          // ordered by likelihood to update, to minimize comparisons
          if (
            neoPixelDevice.on !== (device as NeoPixelObject).on ||
            neoPixelDevice.last_seen !== device.last_seen ||
            neoPixelDevice.reboots !== device.reboots ||
            neoPixelDevice.online !== device.online ||
            new Set(neoPixelDevice.tags).difference(new Set((device as NeoPixelObject).tags)).size >
              0 ||
            neoPixelDevice.remote_name !== device.remote_name ||
            neoPixelDevice.name !== device.name
          ) {
            addNeoPixelData(device as NeoPixelObject);
          }
        } else {
          addNeoPixelData(device as NeoPixelObject);
        }
      });
    });
  }, [addNeoPixelData]);

  if (Object.keys(neoPixelDevices).length === 0) {
    return <NoNeoPixels />;
  }
  return <NeoPixelsTable />;
};

export default NeoPixelsPage;
