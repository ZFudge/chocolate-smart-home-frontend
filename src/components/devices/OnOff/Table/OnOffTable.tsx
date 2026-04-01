import { Table } from '@mantine/core';
import { filterDevicesByTags } from '@/lib/utils';
import { useDevicesStore } from '@/stores';
import { OnOffObject } from '../interfaces';
import useOnOffStore from '../useOnOffStore';
import { filterByValue } from '../utils';
import Header from './Header';
import TableRow from './TableRow';
import classes from '../OnOff.module.css';

const OnOffTable = () => {
  const { filteredTagIds, filteredValue } = useDevicesStore();
  const { onOffDevices } = useOnOffStore();

  const onOffDevicesArray = Object.values(onOffDevices);
  const filteredDevicesByTags = filterDevicesByTags(
    onOffDevicesArray,
    filteredTagIds
  ) as OnOffObject[];
  const filterByValueFn = (device: OnOffObject) => filterByValue(filteredValue, device);
  const filteredDevices: OnOffObject[] = filteredDevicesByTags.filter(filterByValueFn);

  return (
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
  );
};

export default OnOffTable;
