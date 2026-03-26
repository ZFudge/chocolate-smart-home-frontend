import { Text, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { DeviceObject } from '@/interfaces';

const DeviceName = ({ device }: { device: DeviceObject }) => {
  const label = `${device.mqtt_id} (${device.name})`;

  return (
    <Tooltip label={label} position="left" withArrow>
      <Text ta="left" className={classes['theme-match']}>
        {device.name}
      </Text>
    </Tooltip>
  );
};

export default DeviceName;
