import { useState } from 'react';
import { Flex, ScrollArea, Table } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { filterDevicesByTags } from '@/lib/utils';
import { useDevicesStore } from '@/stores';
import ConfirmationModal from '../ConfirmationModal';
import { LeonardoCommandObject } from '../interfaces';
import Header from './Header';
import TableRow from './TableRow';
import classes from '../Leonardo.module.css';

const filterByValue = (filteredValue: string, device: DeviceObject) =>
  !filteredValue ||
  device.name.includes(filteredValue) ||
  Number(device.reboots).toString().includes(filteredValue);

const LeonardoTable = () => {
  const { filteredTagIds, filteredValue, leonardoDevices } = useDevicesStore();
  const [leonardoCommand, setLeonardoCommand] = useState<LeonardoCommandObject | null>(null);

  const filteredDevicesByTags = filterDevicesByTags(
    Object.values(leonardoDevices),
    filteredTagIds
  ) as DeviceObject[];
  const filterByValueFn = (device: DeviceObject) => filterByValue(filteredValue, device);
  const filteredDevices: DeviceObject[] = filteredDevicesByTags.filter(filterByValueFn);

  const closeConfirmationModal = () => setLeonardoCommand(null);

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
        onClose={closeConfirmationModal}
        command={leonardoCommand?.command}
        device={leonardoCommand?.device}
      />
    </>
  );
};

export default LeonardoTable;
