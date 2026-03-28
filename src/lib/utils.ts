import { DeviceObject, Tag } from '@/interfaces';

export const boolToOnOff = (b: boolean) => (b ? 'ON' : 'OFF');

export const filterDevicesByTags = (devices: DeviceObject[], filteredTagIds: number[]) => {
  if (filteredTagIds.length === 0) {
    return devices;
  }

  return devices.filter((device: DeviceObject) =>
    device.tags?.some((deviceTag: Tag) => filteredTagIds.includes(deviceTag.id))
  );
};

export const getBorderColor = (color: string) => `${color}77`;
export const getDividerColor = (color: string) => `${color}55`;
export const getTextInputStyles = (color: string) => ({
  input: {
    border: `0.5px solid ${getBorderColor(color)}`,
  },
});
