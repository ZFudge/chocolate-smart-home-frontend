import { NoNeoPixels, NPTable } from '@/components/NeoPixels';
import { useDevicesStore } from '@/stores';

const NeoPixelsPage = () => {
  const { neoPixelDevices } = useDevicesStore();

  if (Object.keys(neoPixelDevices).length === 0) {
    return <NoNeoPixels />;
  }
  return <NPTable />;
};

export default NeoPixelsPage;
