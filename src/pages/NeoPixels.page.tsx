import { NEO_PIXEL, NoNeoPixels, NPTable } from '@/components/NeoPixels';
import { NeoPixelObject } from '@/components/NeoPixels/interfaces';
import { useDevicesStore } from '@/stores';

const NeoPixelsPage = () => {
  const { devices } = useDevicesStore();

  const devicesArray = Object.values(devices).filter(
    (device) => device.device_type_name === NEO_PIXEL
  );

  if (devicesArray.length === 0) {
    return <NoNeoPixels />;
  }
  return <NPTable devices={devicesArray as NeoPixelObject[]} />;
};

export default NeoPixelsPage;
