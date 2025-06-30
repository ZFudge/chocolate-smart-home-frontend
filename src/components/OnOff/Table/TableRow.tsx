import cx from 'clsx';
import { FaPowerOff } from 'react-icons/fa';
import { Checkbox, Table } from '@mantine/core';
import { ToggleButton } from '@/components';
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
        {device.name}
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
      <Table.Td className={classes.tableCell}>
        sched
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
