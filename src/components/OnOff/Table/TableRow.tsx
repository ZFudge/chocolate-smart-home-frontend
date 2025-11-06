import cx from 'clsx';
import { FaPowerOff } from 'react-icons/fa';
import { Checkbox, Table } from '@mantine/core';
import { TagsCell, ToggleButton } from '@/components';
import DeviceName from '@/components/DeviceName';
import DeviceSettings from '@/components/TableComponents/DeviceSettings';
import LastSeen from '@/components/TableComponents/LastSeen';
import { DeviceObject } from '@/interfaces';
import { boolToOnOff } from '@/lib/utils';
import { OnOffObject } from '../interfaces';
import classes from '../OnOff.module.css';

interface TableRowProps {
  device: OnOffObject;
  selected: boolean;
  toggleRow: (mqtt_id: number) => void;
}

const TableRow = ({ device, selected, toggleRow }: TableRowProps) => {
  return (
    <Table.Tr
      className={cx({ [classes.rowSelected]: selected })}
      data-testid={`${device.mqtt_id}-tr`}
    >
      <Table.Td className={classes.tableCell}>
        <Checkbox
          checked={selected}
          onChange={() => device.mqtt_id !== undefined && toggleRow(device.mqtt_id)}
          data-testid={`${device.mqtt_id}-checkbox`}
        />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <DeviceSettings device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <TagsCell device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <LastSeen device={device} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <DeviceName device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <ToggleButton
          devices={[device]}
          deviceTypeName="on_off"
          settingName="on"
          label={`power is ${boolToOnOff(device.on)}`}
          Icon={FaPowerOff}
        />
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
