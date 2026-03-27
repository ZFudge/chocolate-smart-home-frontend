import { NoOnOff, OnOffTable } from '@/components/OnOff';
import { useDevicesStore } from '@/stores';

const OnOffPage = () => {
  const { onOffDevices } = useDevicesStore();

  if (Object.keys(onOffDevices).length === 0) {
    return <NoOnOff />;
  }
  return <OnOffTable />;
};

export default OnOffPage;
