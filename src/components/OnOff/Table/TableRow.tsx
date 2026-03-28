import { FaPowerOff } from 'react-icons/fa';
import { Checkbox, Table } from '@mantine/core';
import { DeviceName, DeviceSettings, LastSeen, TagsCell, ToggleButton } from '@/components';
import { DeviceObject } from '@/interfaces';
import { boolToOnOff, getBorderColor, getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { OnOffObject } from '../interfaces';
import classes from '../OnOff.module.css';

interface TableRowProps {
  device: OnOffObject;
  selected: boolean;
  toggleRow: (mqtt_id: number) => void;
}

const TableRow = ({ device, selected, toggleRow }: TableRowProps) => {
  const { color } = useAppStore();

  return (
    <Table.Tr
      data-testid={`${device.mqtt_id}-tr`}
      style={{
        backgroundColor: selected ? getBorderColor(color) : 'transparent',
        height: '4.5rem',
      }}
    >
      <Table.Td className={classes.tableCell}>
        <Checkbox
          checked={selected}
          onChange={() => device.mqtt_id !== undefined && toggleRow(device.mqtt_id)}
          data-testid={`${device.mqtt_id}-checkbox`}
          color={color}
          styles={getTextInputStyles(color)}
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
