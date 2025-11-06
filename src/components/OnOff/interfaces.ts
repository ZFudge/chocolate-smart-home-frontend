import { DeviceObject } from '@/interfaces';

export interface OnOffObject extends DeviceObject {
  on: boolean;
}

export interface IndexableObj {
  [key: string]: any;
}

export interface OnOffMapping {
  [key: number]: OnOffObject;
}
