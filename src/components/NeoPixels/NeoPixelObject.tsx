export default interface NeoPixelObject {
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
