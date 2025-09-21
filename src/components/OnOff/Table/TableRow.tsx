import cx from 'clsx';
import { FaPowerOff } from 'react-icons/fa';
import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi';
import { Checkbox, Table } from '@mantine/core';
import { TagsCell, ToggleButton, TooltipWrapper } from '@/components';
import DeviceName from '@/components/DeviceName';
import { Device } from '@/interfaces';
import { boolToOnOff } from '@/lib/utils';
import { OnOffObject } from '../interfaces';
import classes from '../OnOff.module.css';

interface TableRowProps {
  device: OnOffObject;
  selected: boolean;
  toggleRow: (mqtt_id: number) => void;
}

const TableRow = ({ device, selected, toggleRow }: TableRowProps) => {
  const Icon = device.online ? HiStatusOnline : HiStatusOffline;

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
        <TagsCell device={device as unknown as Device} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <TooltipWrapper label={`last seen ${device.last_seen}`}>
          <Icon style={{ color: device.online ? 'gray' : 'red' }} />
        </TooltipWrapper>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <DeviceName device={device as unknown as Device} />
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
      <Table.Td className={classes.tableCell}>sched</Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
