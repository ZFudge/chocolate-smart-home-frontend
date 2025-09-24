import { useState } from 'react';
import { Flex, ScrollArea, Table } from '@mantine/core';
import { DeviceIdsByTagId, Tag } from '@/interfaces';
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

const NPTable = ({ devices }: NPTableProps) => {
  const [selection, setSelection] = useState<number[]>([]);
  const [filteredTagIds, setFilteredTagIds] = useState<number[]>([]);
  const [editPaletteDevice, setEditPaletteDevice] = useState<NeoPixelObject[] | null>(null);
  const { tags } = useTagsStore();

  const deviceIdsByTagId = tags.reduce((acc: DeviceIdsByTagId, tag: Tag) => {
    const deviceIds = devices
      .filter((device: NeoPixelObject) =>
        device.tags?.some((deviceTag: Tag) => deviceTag.id === tag.id)
      )
      .map((device) => device.mqtt_id);
    acc[tag.id] = deviceIds;
    return acc;
  }, {});

  const filteredDeviceIds: number[] = filteredTagIds.length
    ? Array.from(
        new Set(
          filteredTagIds.reduce(
            (acc: number[], id: number) => [...acc, ...deviceIdsByTagId[id]],
            []
          )
        )
      )
    : devices.map((device) => device.mqtt_id);

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
            <Header
              toggleAll={toggleAll}
              selection={selection}
              filteredTagIds={filteredTagIds}
              setFilteredTagIds={setFilteredTagIds}
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
