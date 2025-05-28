import { NEO_PIXEL } from '@/components/NeoPixels/constants';
import NoNeoPixels from '@/components/NeoPixels/NoNeoPixels';
import NPTable from '@/components/NeoPixels/Table/NPTable';
import useDevicesStore from '@/useDevicesStore';

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
