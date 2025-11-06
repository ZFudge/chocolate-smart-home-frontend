import { Text, Tooltip } from '@mantine/core';
import { DeviceObject } from '@/interfaces';

const DeviceName = ({ device }: { device: DeviceObject }) => {
  const label = `${device.mqtt_id} (${device.name})`;

  return (
    <Tooltip label={label} position="left" withArrow>
      <Text ta="left">{device.name}</Text>
    </Tooltip>
  );
};

export default DeviceName;
