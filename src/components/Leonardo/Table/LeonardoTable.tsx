import { useState } from 'react';
import { Flex, ScrollArea, Table } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { getFilteredDeviceIds } from '@/lib/utils';
import useTagsStore from '@/useTagsStore';
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

const filterByValue = (filteredValue: string, device: DeviceObject) => {
  return (
    !filteredValue ||
    device.name.includes(filteredValue) ||
    Number(device.reboots).toString().includes(filteredValue)
  );
};

const LeonardoTable = ({ devices }: LeonardoTableProps) => {
  const [filteredTagIds, setFilteredTagIds] = useState<number[]>([]);
  const [filteredValue, setFilteredValue] = useState<string>('');
  const [leonardoCommand, setLeonardoCommand] = useState<LeonardoCommandObject | null>(null);
  const { tags } = useTagsStore();

  const filteredDeviceIds = getFilteredDeviceIds(devices, tags, filteredTagIds);

  return (
    <>
      <ScrollArea>
        <Flex>
          <Table withTableBorder className={classes['mantine-Table-table']}>
            <Table.Thead>
              <Header
                filteredTagIds={filteredTagIds}
                setFilteredTagIds={setFilteredTagIds}
                filteredValue={filteredValue}
                setFilteredValue={setFilteredValue}
              />
            </Table.Thead>
            <Table.Tbody>
              {Object.values(devices)
                .filter((device: DeviceObject) => filteredDeviceIds.includes(device.mqtt_id))
                .filter((device: DeviceObject) => filterByValue(filteredValue, device))
                .map((device: DeviceObject, index: number) => (
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
