import { LEONARDO, LeonardoTable, NoLeonardo } from '@/components/devices';
import { DeviceObject } from '@/interfaces';
import { useDevicesStore } from '@/stores';

const LeonardoPage = () => {
  const { devices } = useDevicesStore();

  if (
    Object.values(devices).filter((device: DeviceObject) => device.device_type_name === LEONARDO)
      .length === 0
  ) {
    return <NoLeonardo />;
  }
  return <LeonardoTable />;
};

export default LeonardoPage;
