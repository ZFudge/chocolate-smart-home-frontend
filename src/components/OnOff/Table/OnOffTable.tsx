import { useState } from 'react';
import { Flex, ScrollArea, Table } from '@mantine/core';
import { OnOffObject } from '../interfaces';
import Header from './Header';
import TableRow from './TableRow';
import classes from '../OnOff.module.css';

interface OnOffTableProps {
  devices: OnOffObject[];
  onClick?: () => void;
}

const OnOffTable = ({ devices }: OnOffTableProps) => {
  const [selection, setSelection] = useState<number[]>([]);

  const toggleAll = () =>
    setSelection((current) =>
      current.length === devices.length ? [] : devices.map((device) => device.mqtt_id)
    );

  const toggleRow = (mqtt_id: number) =>
    setSelection((current) =>
      current.includes(mqtt_id) ? current.filter((item) => item !== mqtt_id) : [...current, mqtt_id]
    );

  return (
    <ScrollArea>
      <Flex className={classes.flexTable}>
        <Table withTableBorder className={classes['mantine-Table-table']}>
          <Table.Thead>
            <Header toggleAll={toggleAll} selection={selection} devices={devices} />
          </Table.Thead>
          <Table.Tbody>
            {Object.values(devices).map((device: OnOffObject, index: number) => (
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
