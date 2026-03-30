import { DeviceObject, Tag } from '@/interfaces';
import { notifyTagCreated, notifyTagCreateFailed } from './notifications';

export const boolToOnOff = (b: boolean) => (b ? 'ON' : 'OFF');

export const filterDevicesByTags = (devices: DeviceObject[], filteredTagIds: number[]) => {
  if (filteredTagIds.length === 0) {
    return devices;
  }

  return devices.filter((device: DeviceObject) =>
    device.tags?.some((tag: Tag | number) =>
      typeof tag === 'number' ? filteredTagIds.includes(tag) : filteredTagIds.includes(tag.id)
    )
  );
};

export const getBorderColor = (color: string) => `${color}77`;
export const getDividerColor = (color: string) => `${color}55`;
export const getTextInputStyles = (color: string) => ({
  input: {
    border: `0.5px solid ${getBorderColor(color)}`,
  },
});

export const createNewTag = async (tagName: string) => {
  const response = await fetch('/api/tag/', {
    method: 'POST',
    body: JSON.stringify({ name: tagName }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    console.error(response.statusText);
    notifyTagCreateFailed(tagName);
    throw new Error(response.statusText);
  }
  const tagData = await response.json();
  notifyTagCreated(tagName);
  return tagData;
};
