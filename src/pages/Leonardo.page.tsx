import { LEONARDO } from '@/components/Leonardo/constants';
import NoLeonardo from '@/components/Leonardo/NoLeonardo';
import LeonardoTable from '@/components/Leonardo/Table/LeonardoTable';
import useDevicesStore from '@/useDevicesStore';

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
