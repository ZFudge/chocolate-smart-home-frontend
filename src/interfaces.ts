import { NeoPixelObject } from './components/NeoPixels/interfaces';
import { OnOffObject } from './components/OnOff/interfaces';

export interface Tag {
  id: number;
  name: string;
}

export interface TagMapping {
  [key: string]: Tag;
}

export interface DeviceMapping {
  [key: number]: Devices;
}

export interface DeviceIdsByTagId {
  [key: number]: number[];
}

export interface Device {
  mqtt_id: number;
  remote_name: string;
  name: string;
  tags?: Tag[];
}

export interface DeviceType {
  id: number;
  name: string;
}

export interface DeviceObjectNoType {
  device_type: DeviceType;
  id: number;
  last_seen: string | null;
  mqtt_id: number;
  name: string;
  online: boolean;
  reboots?: number;
  remote_name?: string;
  tags?: Tag[];
}

export interface DeviceObjectMapping {
  [key: number]: DeviceObject;
}

export type Devices = DeviceObject | NeoPixelObject | OnOffObject;

export type DeviceObject = DeviceObjectNoType | NeoPixelObject | OnOffObject;
