import { NeoPixelObject } from '../interfaces';

export const filterByValue = (filteredValue: string, device: NeoPixelObject) =>
  device.name.includes(filteredValue) ||
  device.plugin?.ms.toString().includes(filteredValue) ||
  device.plugin?.brightness.toString().includes(filteredValue) ||
  Number(device.plugin?.on).toString().includes(filteredValue) ||
  Number(device.online).toString().includes(filteredValue) ||
  device.last_seen?.includes(filteredValue) ||
  Number(device.plugin?.twinkle).toString().includes(filteredValue) ||
  Number(device.plugin?.transform).toString().includes(filteredValue) ||
  device.plugin?.timeout?.toString().includes(filteredValue);
