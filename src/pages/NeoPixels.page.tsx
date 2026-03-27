import { NEO_PIXEL, NoNeoPixels, NPTable } from '@/components/NeoPixels';
import { useDevicesStore } from '@/stores';

const NeoPixelsPage = () => {
  const { devices } = useDevicesStore();

  const devicesArray = Object.values(devices).filter(
    (device) => device.device_type_name === NEO_PIXEL
  );

  if (devicesArray.length === 0) {
    return <NoNeoPixels />;
  }
  return <NPTable devices={devicesArray} />;
};

export default NeoPixelsPage;
