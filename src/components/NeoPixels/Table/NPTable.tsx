import { useState } from 'react';
import { ScrollArea, Table } from '@mantine/core';
import { getFilteredDeviceIds } from '@/lib/utils';
import useTagsStore from '@/useTagsStore';
import { NeoPixelObject } from '../interfaces';
import PaletteModal from '../PaletteModal';
import Header from './Header';
import TableRow from './TableRow';
import classes from '../NeoPixel.module.css';

interface NPTableProps {
  devices: NeoPixelObject[];
  onClick?: () => void;
}

const filterByValue = (filteredValue: string, device: NeoPixelObject) => {
  return (
    device.name.includes(filteredValue) ||
    device.ms.toString().includes(filteredValue) ||
    device.brightness.toString().includes(filteredValue) ||
    Number(device.on).toString().includes(filteredValue) ||
    Number(device.online).toString().includes(filteredValue) ||
    device.last_seen?.includes(filteredValue) ||
    Number(device.twinkle).toString().includes(filteredValue) ||
    Number(device.transform).toString().includes(filteredValue) ||
    device.timeout?.toString().includes(filteredValue)
  );
};

const NPTable = ({ devices }: NPTableProps) => {
  const [selection, setSelection] = useState<number[]>([]);
  const [filteredTagIds, setFilteredTagIds] = useState<number[]>([]);
  const [filteredValue, setFilteredValue] = useState<string>('');
  const [editPaletteDevice, setEditPaletteDevice] = useState<NeoPixelObject[] | null>(null);
  const { tags } = useTagsStore();
  const filteredDeviceIds = getFilteredDeviceIds(devices, tags, filteredTagIds);

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
      <Table withTableBorder className={classes['mantine-Table-table']}>
        <Table.Thead>
          <Header
            toggleAll={toggleAll}
            selection={selection}
            filteredTagIds={filteredTagIds}
            setFilteredTagIds={setFilteredTagIds}
            filteredValue={filteredValue}
            setFilteredValue={setFilteredValue}
            devices={devices}
            openPaletteModal={() =>
              setEditPaletteDevice(
                selection.map(
                  (id) => devices.find((device) => device.mqtt_id === id) as NeoPixelObject
                )
              )
            }
          />
        </Table.Thead>
        <Table.Tbody>
          {Object.values(devices)
            .filter((device: NeoPixelObject) => filteredDeviceIds.includes(device.mqtt_id))
            .filter((device: NeoPixelObject) => filterByValue(filteredValue, device))
            .map((device: NeoPixelObject, index: number) => (
              <TableRow
                key={`${device.mqtt_id}-${index}-tr`}
                selected={device.mqtt_id !== undefined && selection.includes(device.mqtt_id)}
                openPaletteModal={() => setEditPaletteDevice([device])}
                device={device}
                toggleRow={toggleRow}
              />
            ))}
        </Table.Tbody>
      </Table>
      {editPaletteDevice && editPaletteDevice.length > 0 && (
        <PaletteModal devices={editPaletteDevice} close={() => setEditPaletteDevice(null)} />
      )}
    </ScrollArea>
  );
};

export default NPTable;
