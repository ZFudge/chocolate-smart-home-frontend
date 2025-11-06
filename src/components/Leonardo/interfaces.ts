import { DeviceObject } from '@/interfaces';
import { LeonardoCommand } from './types';

export interface LeonardoCommandObject {
  command: LeonardoCommand;
  device: DeviceObject;
}
