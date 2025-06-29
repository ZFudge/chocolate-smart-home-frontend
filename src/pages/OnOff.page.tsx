import { ON_OFF } from '@/components/OnOff/constants';
import NoOnOff from '@/components/OnOff/NoOnOff';
import OnOffTable from '@/components/OnOff/Table/OnOffTable';
import useDevicesStore from '@/useDevicesStore';

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
