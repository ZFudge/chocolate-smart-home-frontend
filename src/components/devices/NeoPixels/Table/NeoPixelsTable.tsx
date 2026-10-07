import { ScrollArea, Table } from '@mantine/core';
import { filterDevicesByTags } from '@/lib/utils';
import { useDevicesStore } from '@/stores';
import { NeoPixelObject } from '../interfaces';
import DynamicPaletteModal from '../PaletteModal/DynamicPaletteModal';
import useNeoPixelStore from '../useNeoPixelStore';
import Header from './Header';
import TableRow from './TableRow';
import { filterByValue } from './utils';
import classes from '../NeoPixel.module.css';

const NeoPixelsTable = () => {
  const { filteredTagIds, filteredValue } = useDevicesStore();
  const { neoPixelDevices } = useNeoPixelStore();
  const neoPixelDevicesArray = Object.values(neoPixelDevices);

  const filteredDevicesByTags = filterDevicesByTags(
    neoPixelDevicesArray,
    filteredTagIds
  ) as NeoPixelObject[];
  const filterByValueFn = (device: NeoPixelObject) => filterByValue(filteredValue, device);
  const filteredDevices: NeoPixelObject[] = filteredDevicesByTags.filter(filterByValueFn);

  return (
    <ScrollArea>
      <Table withTableBorder className={classes['mantine-Table-table']}>
        <Table.Thead>
          <Header />
        </Table.Thead>
        <Table.Tbody>
          {filteredDevices.map((device, index) => (
            <TableRow key={`${device.mqtt_id}-${index}-tr`} device={device} />
          ))}
        </Table.Tbody>
      </Table>
      <DynamicPaletteModal />
    </ScrollArea>
  );
};

export default NeoPixelsTable;
