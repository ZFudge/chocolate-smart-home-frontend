import { DeviceObject } from '@/interfaces';

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

export interface NeoPixelObject extends DeviceObject {
  palette: PresetFormValuesType;
  ms: number;
  brightness: number;
  on: boolean;
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

export interface PalettePresetData {
  id: number;
  palette: string[];
  name: string;
}

export interface NeoPixelMapping {
  [key: number]: NeoPixelObject;
}

export interface PaletteFormValuesType {
  '0-color': string;
  '1-color': string;
  '2-color': string;
  '3-color': string;
  '4-color': string;
  '5-color': string;
  '6-color': string;
  '7-color': string;
  '8-color': string;
}
