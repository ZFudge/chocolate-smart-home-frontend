import { NeoPixelObject } from './components/NeoPixels/interfaces';
import { OnOffObject } from './components/OnOff/interfaces';
import { DeviceObject } from './interfaces';

export type DeviceObjectTypes = DeviceObject | NeoPixelObject | OnOffObject;
