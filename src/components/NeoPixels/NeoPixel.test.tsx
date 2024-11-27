import { render } from '@test-utils';
import NeoPixelObject from './NeoPixelObject';
import NeoPixelTable from './NeoPixelTable';

const data: NeoPixelObject[] = [
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
    palette: ['#09F', '#09F', '#0F9', '#90F', '#90F', '#9F0', '#9F0', '#F09', '#F90'],
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
    palette: ['#09F', '#F09', '#9F0', '#F90', '#90F', '#0F9', '#09F', '#9F0', '#90F'],
  },
];

describe('Neo pixel Device component', () => {
  it('', () => {
    render(<NeoPixelTable data={data} />);
  });
});
