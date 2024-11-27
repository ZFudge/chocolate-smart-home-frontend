import { render } from '@test-utils';
import NeoPixelObject from '../NeoPixelObject';
import PaletteModal from './PaletteModal';

const device: NeoPixelObject = {
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
};

describe('Neo pixel Device component', () => {
  it('', () => {
    render(<PaletteModal device={device} opened close={() => {}} />);
  });
});
