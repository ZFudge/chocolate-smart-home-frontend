import { Table } from '@mantine/core';
import { DeviceName, DeviceSettings, LastSeen } from '@/components';
import { DeviceTags } from '@/components/common/Tables';
import { DeviceObject } from '@/interfaces';
import { LOCK, MOVE, TALON, UNLOCK } from '../constants';
import { LeonardoCommandObject } from '../interfaces';
import { LeonardoCommand } from '../types';
import CommandButton from './CommandButton';

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
      <Table.Td>
        <DeviceSettings device={device} />
      </Table.Td>
      <Table.Td>
        <DeviceTags device={device} />
      </Table.Td>
      <Table.Td>
        <LastSeen device={device} />
      </Table.Td>
      <Table.Td style={{ maxWidth: '10em' }}>
        <DeviceName device={device} />
      </Table.Td>
      {[MOVE, LOCK, UNLOCK, TALON].map((command) => (
        <Table.Td key={`command-${device.mqtt_id}-${command}`}>
          <CommandButton
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
