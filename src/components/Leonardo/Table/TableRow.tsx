import { Table } from '@mantine/core';
import { DeviceName, DeviceSettings, LastSeen, TagsCell } from '@/components';
import { DeviceObject } from '@/interfaces';
import { LOCK, MOVE, TALON, UNLOCK } from '../constants';
import { LeonardoCommandObject } from '../interfaces';
import { LeonardoCommand } from '../types';
import LeoButton from './LeoButton';
import classes from '../Leonardo.module.css';

interface TableRowProps {
  device: DeviceObject;
  setLeonardoCommand: (leonardoCommand: LeonardoCommandObject) => void;
}

const TableRow = ({ device, setLeonardoCommand }: TableRowProps) => {
  return (
    <Table.Tr
      data-testid={`${device.mqtt_id}-tr`}
      style={{
        height: '5rem',
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
      <Table.Td className={classes.tableCell} style={{ maxWidth: '10em' }}>
        <DeviceName device={device} />
      </Table.Td>
      {[MOVE, LOCK, UNLOCK, TALON].map((command) => (
        <Table.Td key={`command-${device.mqtt_id}-${command}`} className={classes.tableButtonCell}>
          <LeoButton
            command={command as LeonardoCommand}
            device={device}
            setLeonardoCommand={setLeonardoCommand}
          />
        </Table.Td>
      ))}
    </Table.Tr>
  );
};

export default TableRow;
