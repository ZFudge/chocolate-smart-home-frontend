import { LeonardoTable, NoLeonardo } from '@/components/Leonardo';
import { useDevicesStore } from '@/stores';

const LeonardoPage = () => {
  const { leonardoDevices } = useDevicesStore();

  if (Object.keys(leonardoDevices).length === 0) {
    return <NoLeonardo />;
  }
  return <LeonardoTable />;
};

export default LeonardoPage;
