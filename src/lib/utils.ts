import { DeviceObject } from '@/interfaces';
import { notifyTagCreated, notifyTagCreateFailed } from './notifications';

export const boolToOnOff = (b: boolean) => (b ? 'ON' : 'OFF');

export const filterDevicesByTags = (devices: DeviceObject[], filteredTagIds: number[]) => {
  if (filteredTagIds.length === 0) {
    return devices;
  }

  return devices.filter((device: DeviceObject) =>
    device.tags?.some((tagId) => filteredTagIds.includes(tagId))
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
  const response = await fetch('/api/tags/', {
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

export const getLastSeenDate = (last_seen: string | null) => {
  if (last_seen === null) {
    return 'Never';
  }
  // server timestamp is in UTC
  const lastSeenDate = new Date(last_seen);
  lastSeenDate.setUTCFullYear(lastSeenDate.getFullYear());
  lastSeenDate.setUTCMonth(lastSeenDate.getMonth());
  lastSeenDate.setUTCDate(lastSeenDate.getDate());
  lastSeenDate.setUTCHours(lastSeenDate.getHours());
  const lastSeenTime = lastSeenDate.toLocaleTimeString();

  const now = new Date();
  const nowUTC = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
    now.getUTCMilliseconds()
  );
  const daysAgo = Math.floor((nowUTC.getTime() - lastSeenDate.getTime()) / 24 / 3600 / 1000);
  if (daysAgo === 0) {
    return `Today at ${lastSeenTime}`;
  } else if (daysAgo === 1) {
    return `Yesterday at ${lastSeenTime}`;
  } else {
    return `${daysAgo} days ago at ${lastSeenTime}`;
  }
};
