import { NeoPixelObject } from './components/NeoPixels/interfaces';

export type Devices = NeoPixelObject;

export interface DeviceMapping {
  [key: number]: Devices;
}
