import { Badge, Container, Table, Text, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { DeviceObject } from '@/interfaces';
import { useDevicesStore } from '@/stores';

const SECONDS_IN_A_DAY = 3600 * 24;

const getTimeDifference = (epochTime: string | null) => {
  if (!epochTime) {
    return '';
  }
  const then = new Date(epochTime);
  const now = new Date();

  let difference = (now.getTime() - then.getTime()) / 1000;
  let textualDifference = '';

  const days = Math.floor(difference / SECONDS_IN_A_DAY);
  if (days) {
    textualDifference += `${days}d `;
    difference %= difference % SECONDS_IN_A_DAY;
  }

  const hours = Math.floor(difference / 3600);
  if (hours) {
    textualDifference += `${hours}h `;
    difference %= difference % 3600;
  }

  const minutes = Math.floor(difference / 60);
  if (minutes) {
    textualDifference += `${minutes}min `;
    difference %= difference % 60;
  }

  const seconds = Math.floor(difference);
  if (seconds) {
    textualDifference += `${seconds}s`;
  } else {
    return '0s';
  }

  return textualDifference;
};

const DateDisplays = ({ date, label }: { date: string | null; label: string }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <Text ta="right" fw={500} size="sm">
          {label}:
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge color="gray" size="lg">
          {getTimeDifference(date)} ago
        </Badge>
      </Table.Td>
    </Table.Tr>
  );
};

const OfflineDisplay = ({ device }: { device: DeviceObject }) => {
  const { requestAllDeviceDataLastSent } = useDevicesStore();
  return (
    <>
      <DateDisplays date={device.last_seen} label="Last Heard From" />
      {device.last_update_sent && (
        <DateDisplays date={device.last_update_sent} label="Last Update Sent" />
      )}
      {requestAllDeviceDataLastSent && (
        <DateDisplays date={requestAllDeviceDataLastSent} label="Last Requested" />
      )}
    </>
  );
};

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
