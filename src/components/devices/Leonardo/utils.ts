import { DeviceObject } from '@/interfaces';
import { LOCK, MOVE, TALON, UNLOCK } from './constants';
import { LeonardoCommand } from './types';

export const getColor = (command: LeonardoCommand) => {
  switch (command) {
    case MOVE:
      return 'green';
    case LOCK:
      return 'blue';
    case UNLOCK:
      return 'red';
    case TALON:
      return 'yellow';
    default:
      return 'gray';
  }
};

export const filterByValue = (filteredValue: string, device: DeviceObject) =>
  !filteredValue ||
  device.name.includes(filteredValue) ||
  Number(device.reboots).toString().includes(filteredValue);
