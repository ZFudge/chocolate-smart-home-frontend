import { NeoPixelObject } from '@/components/NeoPixels/interfaces';

const neoPixelsMockData: NeoPixelObject[] = [
  {
    id: 1,
    name: 'NeoPixel 1',
    space: 'bedroom',
    online: true,
    on: true,
    twinkle: true,
    transform: true,
    white: false,
    ms: 5,
    brightness: 127,
    scheduled: false,
    palette: [
      '#0099FF',
      '#0099FF',
      '#00FF99',
      '#9900FF',
      '#9900FF',
      '#99FF00',
      '#99FF00',
      '#FF0099',
      '#FF9900',
    ],
  },
  {
    id: 2,
    name: 'NeoPixel 2',
    space: 'hallway',
    online: false,
    on: false,
    twinkle: false,
    transform: false,
    white: true,
    ms: 31,
    brightness: 55,
    scheduled: true,
    palette: [
      '#0099FF',
      '#FF0099',
      '#99FF00',
      '#FF9900',
      '#9900FF',
      '#00FF99',
      '#0099FF',
      '#99FF00',
      '#9900FF',
    ],
  },
];

export default neoPixelsMockData;
