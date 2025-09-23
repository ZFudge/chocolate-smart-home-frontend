import { Text, Tooltip } from '@mantine/core';
import { Device } from '@/interfaces';

const DeviceName = ({ device }: { device: Device }) => {
  const label = `${device.mqtt_id} (${device.remote_name})`;

  return (
    <Tooltip label={label} position="left" withArrow>
      <Text ta="left">{device.name}</Text>
    </Tooltip>
  );
};

export default DeviceName;
