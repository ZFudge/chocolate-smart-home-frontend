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

export interface PIRConfig {
  armed?: boolean;
  timeout: number;
}

export interface NeoPixelPlugin {
  palette: PresetFormValuesType;
  ms: number;
  brightness: number;
  on: boolean;
  twinkle: boolean;
  transform: boolean;
  white?: boolean;
  scheduled_palette_rotation?: boolean | undefined;
  all_twinkle_colors_are_current: boolean | undefined;
  timeout?: number;
  pir_timeout?: number;
  pir_armed?: boolean;
  pir_enabled?: boolean;
}

export interface NeoPixelObject extends DeviceObject {
  plugin: NeoPixelPlugin;
}

export interface PalettePreset {
  value: PresetFormValuesType;
  label: string;
}

export interface PalettePresetData {
  id: number;
  colors: string[];
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
