import { DeviceIdsByTagId, DeviceObject, Tag } from '@/interfaces';

export const boolToOnOff = (b: boolean) => (b ? 'ON' : 'OFF');

export const getFilteredDeviceIds = (
  devices: DeviceObject[],
  tags: Tag[],
  filteredTagIds: number[]
) => {
  if (filteredTagIds.length === 0) {
    return devices.map((device) => device.mqtt_id);
  }

  const deviceIdsByTagId = tags.reduce((acc: DeviceIdsByTagId, tag: Tag) => {
    const deviceIds = devices
      .filter((device: DeviceObject) =>
        device.tags?.some((deviceTag: Tag) => deviceTag.id === tag.id)
      )
      .map((device) => device.mqtt_id);
    acc[tag.id] = deviceIds;
    return acc;
  }, {});

  const filteredDeviceIds: number[] = filteredTagIds.length
    ? Array.from(
        new Set(
          filteredTagIds.reduce(
            (acc: number[], id: number) => [...acc, ...deviceIdsByTagId[id]],
            []
          )
        )
      )
    : devices.map((device) => device.mqtt_id);

  return filteredDeviceIds;
};
