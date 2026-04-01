import { OnOffObject } from './interfaces';

export const filterByValue = (filteredValue: string, device: OnOffObject) =>
  device.name.includes(filteredValue) || Number(device.on).toString().includes(filteredValue);
