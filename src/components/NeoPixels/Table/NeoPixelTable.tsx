import { useState } from 'react';
import { Flex, ScrollArea, Table } from '@mantine/core';

import classes from '../NeoPixel.module.css';

import EditPaletteModal from '../EditPaletteModal';
import { NeoPixelObject } from '../interfaces';
import Empty from './Empty';
import Header from './Header';
import TableRow from './TableRow';


interface NeoPixelTableProps {
  neoPixelData: NeoPixelObject[];
  onClick?: () => void;
}


const NeoPixelTable = ({ neoPixelData }: NeoPixelTableProps) => {
  const [selection, setSelection] = useState<number[]>([]);
  const [editPaletteDevice, setEditPaletteDevice] = useState<NeoPixelObject | null>(null);

  const toggleAll = () =>
    setSelection((current) =>
      current.length === neoPixelData.length
        ? []
        : neoPixelData.map((np) => np.mqtt_id)
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
        {!Object.keys(neoPixelData).length ? (
          <Empty />
        ) : (
          <>
            <Table withTableBorder className={classes['mantine-Table-table']}>
              <Table.Tbody>
                <Header
                  toggleAll={toggleAll}
                  selection={selection}
                  neoPixelData={neoPixelData}
                />
              </Table.Tbody>
              <Table.Tbody>
                {Object.values(neoPixelData).map((device: NeoPixelObject, index: number) => (
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
            {editPaletteDevice && (
              <EditPaletteModal
                presetOptions={[]}
                device={editPaletteDevice}
                close={() => setEditPaletteDevice(null)}
              />
            )}
          </>
        )}
      </Flex>
    </ScrollArea>
  );
};

export default NeoPixelTable;
