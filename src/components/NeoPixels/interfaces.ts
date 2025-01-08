export interface NeoPixelObject {
  id: number;
  name: string;
  space: string;
  palette: string[];
  ms: number;
  brightness: number;
  on: boolean;
  online: boolean;
  twinkle: boolean;
  transform: boolean;
  white?: boolean;
  scheduled: boolean | undefined;
}

export interface IndexableObj {
  [key: string]: any;
}

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

export interface PalettePreset {
  value: PresetFormValuesType;
  label: string;
}
