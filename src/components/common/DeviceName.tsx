import { Badge, Container, Flex, Text, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { DeviceObject } from '@/interfaces';

const DeviceName = ({ device }: { device: DeviceObject }) => {
  const label = (
    <Flex direction="column">
      <Flex gap="xs" align="center">
        <Text ta="left" fw={500} size="sm" data-testid={`${device.mqtt_id}-device-name`}>
          MQTT ID:
        </Text>
        <Badge color="gray" size="lg">
          {device.mqtt_id}
        </Badge>
      </Flex>
    </Flex>
  );

  return (
    <Tooltip label={label} withArrow>
      <Container style={{ borderRadius: '0.25rem' }} p="xs" className={classes['theme-match']}>
        <Text
          ta="left"
          fw={500}
          size="sm"
          data-testid={`${device.mqtt_id}-device-name`}
          style={{ userSelect: 'none' }}
        >
          {device.name}
        </Text>
      </Container>
    </Tooltip>
  );
};

export default DeviceName;
