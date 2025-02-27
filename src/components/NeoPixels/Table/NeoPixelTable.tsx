import { useState } from 'react';
import { Checkbox, Flex, ScrollArea, Table } from '@mantine/core';
import EditPaletteModal from '../EditPaletteModal';
import { NeoPixelObject } from '../interfaces';
import Empty from './Empty';
import NeoPixelTableRow from './NeoPixelTableRow';
import classes from '../NeoPixel.module.css';

interface NeoPixelTableProps {
  /** Device data */
  neoPixelData: { [key: string]: NeoPixelObject };
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary component for Neo Pixel user interaction */
function NeoPixelTable({ neoPixelData }: NeoPixelTableProps) {
  const [selection, setSelection] = useState<number[]>([]);
  const [editPaletteDevice, setEditPaletteDevice] = useState<NeoPixelObject | null>(null);

  const toggleAll = () =>
    setSelection((current) =>
      current.length === Object.keys(neoPixelData).length
        ? []
        : Object.keys(neoPixelData).map(Number)
    );

  const toggleRow = (mqtt_id: number) =>
    setSelection((current) =>
      current.includes(mqtt_id) ? current.filter((item) => item !== mqtt_id) : [...current, mqtt_id]
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
                <Table.Tr>
                  <Table.Th w={40}>
                    <Checkbox
                      onChange={toggleAll}
                      checked={selection.length === Object.keys(neoPixelData).length}
                      indeterminate={
                        selection.length > 0 &&
                        selection.length !== Object.keys(neoPixelData).length
                      }
                    />
                  </Table.Th>
                  <Table.Th />
                  <Table.Th />
                  <Table.Th />
                  <Table.Th />
                  <Table.Th />
                  <Table.Th />
                  <Table.Th />
                  <Table.Th />
                </Table.Tr>
              </Table.Tbody>
              <Table.Tbody>
                {Object.values(neoPixelData).map((device: NeoPixelObject, i) => (
                  <NeoPixelTableRow
                    key={`${device.mqtt_id}-${i}-tr`}
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
}

export default NeoPixelTable;
