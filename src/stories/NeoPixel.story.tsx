import mockNeoPixelsData from '@/tests/mockData';
import NeoPixelTable from '../components/NeoPixels/NeoPixelTable';

export default {
  title: 'NeoPixel',
};

export const DeviceTable = () => <NeoPixelTable neoPixelData={mockNeoPixelsData} />;
