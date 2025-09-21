import { NeoPixelObject } from './components/NeoPixels/interfaces';

export type Devices = NeoPixelObject;

export interface DeviceMapping {
  [key: number]: Devices;
}

export interface Device {
  mqtt_id: number;
  remote_name: string;
  name: string;
  tags?: string[];
}

export interface Tag {
  id: number;
  name: string;
}

export interface TagMapping {
  [key: string]: Tag;
}
