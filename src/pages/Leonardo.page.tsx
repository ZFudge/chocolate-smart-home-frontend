import { LEONARDO, LeonardoTable, NoLeonardo } from '@/components/Leonardo';
import { useDevicesStore } from '@/stores';

const LeonardoPage = () => {
  const { devices } = useDevicesStore();

  const devicesArray = Object.values(devices).filter(
    (device) => device.device_type_name === LEONARDO
  );

  if (devicesArray.length === 0) {
    return <NoLeonardo />;
  }
  return <LeonardoTable devices={devicesArray} />;
};

export default LeonardoPage;
