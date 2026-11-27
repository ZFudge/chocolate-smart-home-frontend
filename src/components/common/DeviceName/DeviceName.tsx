import { Badge, Container, Table, Text, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { DeviceObject } from '@/interfaces';
import OfflineDisplay from './OfflineDisplay';

const DeviceName = ({ device }: { device: DeviceObject }) => {
  const label = (
    <Table withRowBorders={false}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <Text ta="right" fw={500} size="sm">
              MQTT ID:
            </Text>
          </Table.Th>
          <Table.Th>
            <Badge color="gray" size="lg">
              {device.mqtt_id}
            </Badge>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {(!device.online || device.fetchedFromDb) && <OfflineDisplay device={device} />}
      </Table.Tbody>
    </Table>
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
          c={device.online === false || device.fetchedFromDb ? 'dimmed' : ''}
        >
          {device.name}
        </Text>
      </Container>
    </Tooltip>
  );
};

export default DeviceName;
