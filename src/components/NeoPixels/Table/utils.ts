import { NeoPixelObject } from '../interfaces';

export const filterByValue = (filteredValue: string, device: NeoPixelObject) =>
  device.name.includes(filteredValue) ||
  device.ms.toString().includes(filteredValue) ||
  device.brightness.toString().includes(filteredValue) ||
  Number(device.on).toString().includes(filteredValue) ||
  Number(device.online).toString().includes(filteredValue) ||
  device.last_seen?.includes(filteredValue) ||
  Number(device.twinkle).toString().includes(filteredValue) ||
  Number(device.transform).toString().includes(filteredValue) ||
  device.timeout?.toString().includes(filteredValue);
