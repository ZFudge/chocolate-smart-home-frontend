import { Badge, Table, Text } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { useDevicesStore } from '@/stores';
import { getTimeDifference } from './utils';

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

export default OfflineDisplay;
