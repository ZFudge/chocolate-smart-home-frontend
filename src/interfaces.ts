import { NeoPixelObject } from '@/components/devices/NeoPixels/interfaces';
import { OnOffObject } from '@/components/devices/OnOff/interfaces';

export interface IndexableObj {
  [key: string]: any;
}

export interface Tag {
  id: number;
  name: string;
}

export interface DeviceObject {
  mqtt_id: number;
  name: string;
  device_type_name: string;
  last_seen: string | null;
  last_update_sent: string | null;
  online?: boolean;
  reboots?: number;
  remote_name?: string;
  tags?: number[];
  fetched_from_db?: boolean;
  plugin: Record<string, any>;
}

export type DeviceObjectType = DeviceObject | NeoPixelObject | OnOffObject;

export type DeviceMapping = Record<number, DeviceObjectType>;

export type TagMapping = Record<number, Tag>;

export type DeviceIdsByTagId = Record<number, number[]>;
