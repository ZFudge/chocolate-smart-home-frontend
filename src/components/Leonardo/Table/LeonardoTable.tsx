import { useState } from 'react';
import { Flex, ScrollArea, Table } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { getFilteredDeviceIds } from '@/lib/utils';
import { useDevicesStore } from '@/stores';
import ConfirmationModal from '../ConfirmationModal';
import { LeonardoCommand } from '../types';
import Header from './Header';
import TableRow from './TableRow';
import classes from '../Leonardo.module.css';

interface LeonardoCommandObject {
  command: LeonardoCommand;
  device: DeviceObject;
}

interface LeonardoTableProps {
  devices: DeviceObject[];
  onClick?: () => void;
}

const filterByValue = (filteredValue: string, device: DeviceObject) =>
  !filteredValue ||
  device.name.includes(filteredValue) ||
  Number(device.reboots).toString().includes(filteredValue);

const LeonardoTable = ({ devices }: LeonardoTableProps) => {
  const [leonardoCommand, setLeonardoCommand] = useState<LeonardoCommandObject | null>(null);
  const { tags, filteredTagIds, filteredValue } = useDevicesStore();

  const filteredDeviceIds = getFilteredDeviceIds(devices, tags, filteredTagIds);
  const filteredDevices: DeviceObject[] = Object.values(devices).filter(
    (device) => filteredDeviceIds.includes(device.mqtt_id) && filterByValue(filteredValue, device)
  );

  return (
    <>
      <ScrollArea>
        <Flex>
          <Table withTableBorder className={classes['mantine-Table-table']}>
            <Table.Thead>
              <Header />
            </Table.Thead>
            <Table.Tbody>
              {filteredDevices.map((device, index) => (
                <TableRow
                  key={`${device.mqtt_id}-${index}-tr`}
                  device={device}
                  setLeonardoCommand={setLeonardoCommand}
                />
              ))}
            </Table.Tbody>
          </Table>
        </Flex>
      </ScrollArea>
      <ConfirmationModal
        opened={!!leonardoCommand}
        onClose={() => setLeonardoCommand(null)}
        command={leonardoCommand?.command}
        device={leonardoCommand?.device}
      />
    </>
  );
};

export default LeonardoTable;
