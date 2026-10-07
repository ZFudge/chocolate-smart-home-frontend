import { useState } from 'react';
import { Table } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { filterDevicesByTags } from '@/lib/utils';
import { useDevicesStore } from '@/stores';
import ConfirmationModal from '../ConfirmationModal';
import { LEONARDO } from '../constants';
import { LeonardoCommandObject } from '../interfaces';
import { filterByValue } from '../utils';
import Header from './Header';
import TableRow from './TableRow';
import classes from '../Leonardo.module.css';

const LeonardoTable = () => {
  const { filteredTagIds, filteredValue, devices } = useDevicesStore();
  const [leonardoCommand, setLeonardoCommand] = useState<LeonardoCommandObject | null>(null);

  const closeConfirmationModal = () => setLeonardoCommand(null);

  const leonardoDevices = Object.values(devices).filter(
    (device: DeviceObject) => device.device_type_name === LEONARDO
  );
  const filteredDevicesByTags = filterDevicesByTags(
    leonardoDevices,
    filteredTagIds
  ) as DeviceObject[];
  const filterByValueFn = (device: DeviceObject) => filterByValue(filteredValue, device);
  const filteredDevices: DeviceObject[] = filteredDevicesByTags.filter(filterByValueFn);

  return (
    <>
      <Table withTableBorder className={classes['mantine-Table-table']}>
        <Table.Thead>
          <Header leonardoDevices={leonardoDevices} />
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
      <ConfirmationModal onClose={closeConfirmationModal} leoCommand={leonardoCommand} />
    </>
  );
};

export default LeonardoTable;
