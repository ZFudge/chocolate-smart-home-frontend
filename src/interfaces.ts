import { NeoPixelObject } from './components/NeoPixels/interfaces';

export type Devices = NeoPixelObject;

export interface DeviceMapping {
  [key: number]: Devices;
}

export interface Device {
  mqtt_id: number;
  remote_name: string;
  name: string;
}
