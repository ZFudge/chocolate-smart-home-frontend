import { Container, Text, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { DeviceObject } from '@/interfaces';

const DeviceName = ({ device }: { device: DeviceObject }) => {
  const label = `${device.mqtt_id} (${device.name})`;

  return (
    <Tooltip label={label} position="left" withArrow>
      <Container style={{ borderRadius: '0.25rem' }} p="xs" className={classes['theme-match']}>
        <Text ta="left" fw={500} size="sm" data-testid={`${device.mqtt_id}-device-name`}>
          {device.name}
        </Text>
      </Container>
    </Tooltip>
  );
};

export default DeviceName;
