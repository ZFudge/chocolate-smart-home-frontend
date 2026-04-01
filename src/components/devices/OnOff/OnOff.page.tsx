import { useEffect } from 'react';
import { NoOnOff, OnOffTable } from '@/components/devices';
import { DeviceObject } from '@/interfaces';
import { useDevicesStore } from '@/stores';
import { ON_OFF } from './constants';
import { OnOffObject } from './interfaces';
import useOnOffStore from './useOnOffStore';

const OnOffPage = () => {
  const { addOnOffData, onOffDevices } = useOnOffStore();

  useEffect(() => {
    useDevicesStore.subscribe((state, prevState) => {
      if (
        state.filteredTagIds !== prevState.filteredTagIds ||
        state.filteredValue !== prevState.filteredValue
      ) {
        return;
      }
      Object.values(state.devices).forEach((device: DeviceObject) => {
        if (device.device_type_name !== ON_OFF) {
          return;
        }
        const onOffDevice = onOffDevices[device.mqtt_id];
        if (onOffDevice) {
          // ordered by likelihood to update, to minimize comparisons
          if (
            onOffDevice.on !== (device as OnOffObject).on ||
            onOffDevice.last_seen !== device.last_seen ||
            onOffDevice.reboots !== device.reboots ||
            onOffDevice.online !== device.online ||
            new Set(onOffDevice.tags).difference(new Set((device as OnOffObject).tags)).size > 0 ||
            onOffDevice.remote_name !== device.remote_name ||
            onOffDevice.name !== device.name
          ) {
            addOnOffData(device as OnOffObject);
          }
        } else {
          addOnOffData(device as OnOffObject);
        }
      });
    });
  }, [addOnOffData]);

  if (Object.keys(onOffDevices).length === 0) {
    return <NoOnOff />;
  }
  return <OnOffTable />;
};

export default OnOffPage;
