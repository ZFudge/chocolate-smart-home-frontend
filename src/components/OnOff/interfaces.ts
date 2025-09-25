import { Tag } from '@/interfaces';

export interface OnOffObject {
  mqtt_id: number;
  name: string;
  remote_name?: string;
  device_type_name: string;
  space?: string;
  online: boolean;
  last_seen: string | null;
  on: boolean;
  tags?: Tag[];
}

export interface IndexableObj {
  [key: string]: any;
}

export interface OnOffMapping {
  [key: number]: OnOffObject;
}
