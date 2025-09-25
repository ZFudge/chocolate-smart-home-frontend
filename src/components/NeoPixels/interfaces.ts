import { Tag } from '@/interfaces';

export type PresetFormValuesType = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface NeoPixelObject {
  mqtt_id: number;
  name: string;
  remote_name?: string;
  device_type_name: string;
  tags?: Tag[];
  palette: PresetFormValuesType;
  ms: number;
  brightness: number;
  on: boolean;
  online: boolean;
  last_seen: string | null;
  twinkle: boolean;
  transform: boolean;
  white?: boolean;
  scheduled?: boolean | undefined;
  timeout?: number;
}

export interface IndexableObj {
  [key: string]: any;
}

export interface PalettePreset {
  value: PresetFormValuesType;
  label: string;
}

export interface NeoPixelMapping {
  [key: number]: NeoPixelObject;
}
