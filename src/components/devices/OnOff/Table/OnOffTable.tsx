import { useState } from 'react';
import { Flex, ScrollArea, Table } from '@mantine/core';
import { filterDevicesByTags } from '@/lib/utils';
import { useDevicesStore } from '@/stores';
import { OnOffObject } from '../interfaces';
import Header from './Header';
import TableRow from './TableRow';
import classes from '../OnOff.module.css';

const filterByValue = (filteredValue: string, device: OnOffObject) =>
  device.name.includes(filteredValue) || Number(device.on).toString().includes(filteredValue);

const OnOffTable = () => {
  const [selection, setSelection] = useState<number[]>([]);
  const { filteredTagIds, filteredValue, onOffDevices } = useDevicesStore();
  const onOffDevicesArray = Object.values(onOffDevices);

  const toggleAll = () =>
    setSelection((current) =>
      current.length === onOffDevicesArray.length
        ? []
        : onOffDevicesArray.map((device) => device.mqtt_id)
    );

  const toggleRow = (mqtt_id: number) =>
    setSelection((current) =>
      current.includes(mqtt_id) ? current.filter((item) => item !== mqtt_id) : [...current, mqtt_id]
    );

  const filteredDevicesByTags = filterDevicesByTags(
    onOffDevicesArray,
    filteredTagIds
  ) as OnOffObject[];
  const filterByValueFn = (device: OnOffObject) => filterByValue(filteredValue, device);
  const filteredDevices: OnOffObject[] = filteredDevicesByTags.filter(filterByValueFn);
  return (
    <ScrollArea>
      <Flex>
        <Table withTableBorder className={classes['mantine-Table-table']}>
          <Table.Thead>
            <Header toggleAll={toggleAll} selection={selection} />
          </Table.Thead>
          <Table.Tbody>
            {filteredDevices.map((device, index) => (
              <TableRow
                key={`${device.mqtt_id}-${index}-tr`}
                selected={device.mqtt_id !== undefined && selection.includes(device.mqtt_id)}
                device={device}
                toggleRow={toggleRow}
              />
            ))}
          </Table.Tbody>
        </Table>
      </Flex>
    </ScrollArea>
  );
};

export default OnOffTable;
