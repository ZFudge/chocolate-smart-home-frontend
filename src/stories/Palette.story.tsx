import NeoPixelObject from 'src/components/NeoPixels/NeoPixelObject';
import EditPaletteModal from '../components/NeoPixels/EditPaletteModal';

export default {
  title: 'PaletteModal',
};

const device: NeoPixelObject = {
  id: 1,
  name: 'NeoPixel Name 1',
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
    '#09F09F',
    '#0F90F9',
    '#F90F90',
    '#F09F09',
    '#9F09F0',
    '#90F90F',
    '#FFFFFF',
    '#999999',
    '#000000',
  ],
};

export const OpenModal = () => <EditPaletteModal device={device} close={() => {}} />;
