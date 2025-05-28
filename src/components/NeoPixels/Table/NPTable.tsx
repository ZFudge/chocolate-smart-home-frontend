import { useState } from 'react';
import { Flex, ScrollArea, Table } from '@mantine/core';

import classes from '../NeoPixel.module.css';

import PaletteModal from '../PaletteModal';
import { NeoPixelObject } from '../interfaces';
import Header from './Header';
import TableRow from './TableRow';


interface NPTableProps {
  devices: NeoPixelObject[];
  onClick?: () => void;
}


const NPTable = ({ devices }: NPTableProps) => {
  const [selection, setSelection] = useState<number[]>([]);
  const [editPaletteDevice, setEditPaletteDevice] = useState<NeoPixelObject | NeoPixelObject[] | null>(null);

  const toggleAll = () =>
    setSelection((current) =>
      current.length === devices.length
        ? []
        : devices.map(device => device.mqtt_id)
    );

  const toggleRow = (mqtt_id: number) =>
    setSelection((current) =>
      current.includes(mqtt_id) ?
        current.filter((item) => item !== mqtt_id) :
        [...current, mqtt_id]
    );

  return (
    <ScrollArea>
      <Flex className={classes.flexTable}>
        <Table withTableBorder className={classes['mantine-Table-table']}>
          <Table.Thead>
            <Header
              toggleAll={toggleAll}
              selection={selection}
              devices={devices}
              openPaletteModal={() => setEditPaletteDevice(selection.map(id => devices.find(device => device.mqtt_id === id) as NeoPixelObject))}
            />
          </Table.Thead>
          <Table.Tbody>
            {Object.values(devices).map((device: NeoPixelObject, index: number) => (
              <TableRow
                key={`${device.mqtt_id}-${index}-tr`}
                selected={device.mqtt_id !== undefined && selection.includes(device.mqtt_id)}
                openPaletteModal={() => setEditPaletteDevice(device)}
                device={device}
                toggleRow={toggleRow}
              />
            ))}
          </Table.Tbody>
        </Table>
        <PaletteModal
          presetOptions={[]}
          devices={editPaletteDevice}
          close={() => setEditPaletteDevice(null)}
        />
      </Flex>
    </ScrollArea>
  );
};

export default NPTable;
