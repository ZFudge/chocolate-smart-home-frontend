import { Table } from '@mantine/core';
import { TagsCell } from '@/components';
import DeviceName from '@/components/DeviceName';
import DeviceSettings from '@/components/TableComponents/DeviceSettings';
import { DeviceObject } from '@/interfaces';
import classes from '../Leonardo.module.css';
import LeoButton from './LeoButton';
import { LeonardoCommandObject } from '../interfaces';
import { LeonardoCommand } from '../types';
import { MOVE, LOCK, UNLOCK, TALON } from '../constants';
import LastSeen from '@/components/TableComponents/LastSeen';

interface TableRowProps {
  device: DeviceObject;
  setLeonardoCommand: (leonardoCommand: LeonardoCommandObject) => void;
}

const TableRow = ({ device, setLeonardoCommand }: TableRowProps) => {
  return (
    <Table.Tr
      data-testid={`${device.mqtt_id}-tr`}
      style={{
        minHeight: '5em',
      }}
    >
      <Table.Td className={classes.tableCell}>
        <DeviceSettings device={device} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <TagsCell device={device} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <LastSeen device={device} />
      </Table.Td>
      <Table.Td className={classes.tableCell}
        style={{ maxWidth: '10em', }}
      >
        <DeviceName device={device} />
      </Table.Td>
      {[MOVE, LOCK, UNLOCK, TALON].map((command) => (
        <Table.Td 
          key={`command-${device.mqtt_id}-${command}`}
          className={classes.tableButtonCell}
        >
          <LeoButton
            command={command as LeonardoCommand}
            device={device} setLeonardoCommand={setLeonardoCommand}
          />
        </Table.Td>
      ))}
    </Table.Tr>
  );
};

export default TableRow;
