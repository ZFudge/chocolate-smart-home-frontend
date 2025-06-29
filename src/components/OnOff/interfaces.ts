export interface OnOffObject {
  mqtt_id: number;
  name: string;
  device_type_name: string;
  space?: string;
  on: boolean;
  online: boolean;
}

export interface IndexableObj {
  [key: string]: any;
}

export interface OnOffMapping {
  [key: number]: OnOffObject;
}
