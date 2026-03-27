import { useState } from 'react';
import { ScrollArea, Table } from '@mantine/core';
import { filterDevicesByTags } from '@/lib/utils';
import { useDevicesStore } from '@/stores';
import { NeoPixelObject } from '../interfaces';
import PaletteModal from '../PaletteModal';
import Header from './Header';
import TableRow from './TableRow';
import { filterByValue } from './utils';
import classes from '../NeoPixel.module.css';

const NPTable = () => {
  const { filteredTagIds, filteredValue, neoPixelDevices } = useDevicesStore();
  const neoPixelDevicesArray = Object.values(neoPixelDevices);
  const [selection, setSelection] = useState<number[]>([]);
  const [editPaletteDevice, setEditPaletteDevice] = useState<NeoPixelObject[] | null>(null);

  const toggleAll = () =>
    setSelection((current) =>
      current.length === neoPixelDevicesArray.length
        ? []
        : neoPixelDevicesArray.map((device) => device.mqtt_id)
    );

  const toggleRow = (mqtt_id: number) =>
    setSelection((current) =>
      current.includes(mqtt_id) ? current.filter((item) => item !== mqtt_id) : [...current, mqtt_id]
    );

  const filteredDevicesByTags = filterDevicesByTags(
    neoPixelDevicesArray,
    filteredTagIds
  ) as NeoPixelObject[];
  const filterByValueFn = (device: NeoPixelObject) => filterByValue(filteredValue, device);
  const filteredDevices: NeoPixelObject[] = filteredDevicesByTags.filter(filterByValueFn);

  const closePaletteModal = () => setEditPaletteDevice(null);
  const openPaletteModalSelectedDevices = () =>
    setEditPaletteDevice(selection.map((mqtt_id) => neoPixelDevices[mqtt_id]));

  return (
    <ScrollArea>
      <Table withTableBorder className={classes['mantine-Table-table']}>
        <Table.Thead>
          <Header
            toggleAll={toggleAll}
            selection={selection}
            openPaletteModal={openPaletteModalSelectedDevices}
          />
        </Table.Thead>
        <Table.Tbody>
          {filteredDevices.map((device, index) => (
            <TableRow
              key={`${device.mqtt_id}-${index}-tr`}
              selected={selection.includes(device.mqtt_id)}
              openPaletteModal={() => setEditPaletteDevice([device])}
              device={device}
              toggleRow={toggleRow}
            />
          ))}
        </Table.Tbody>
      </Table>
      {editPaletteDevice && editPaletteDevice.length > 0 && (
        <PaletteModal devices={editPaletteDevice} close={closePaletteModal} />
      )}
    </ScrollArea>
  );
};

export default NPTable;
