import { DeviceObjectTypes } from './types';

export interface Tag {
  id: number;
  name: string;
}

export interface TagMapping {
  [key: string]: Tag;
}

export interface DeviceIdsByTagId {
  [key: number]: number[];
}

export interface DeviceType {
  id: number;
  name: string;
}

export interface DeviceObject {
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

export interface DeviceMapping {
  [key: number]: DeviceObjectTypes;
}
