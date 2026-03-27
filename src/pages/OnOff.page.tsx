import { NoOnOff, ON_OFF, OnOffTable } from '@/components/OnOff';
import { useDevicesStore } from '@/stores';

const OnOffPage = () => {
  const { devices } = useDevicesStore();

  const devicesArray = Object.values(devices).filter(
    (device) => device.device_type_name === ON_OFF
  );

  if (devicesArray.length === 0) {
    return <NoOnOff />;
  }
  return <OnOffTable devices={devicesArray} />;
};

export default OnOffPage;
