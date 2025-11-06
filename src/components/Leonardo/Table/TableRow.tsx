
import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi';
import { Table } from '@mantine/core';
import { TagsCell, TooltipWrapper } from '@/components';
import DeviceName from '@/components/DeviceName';
import DeviceSettings from '@/components/TableComponents/DeviceSettings';
import { DeviceObject } from '@/interfaces';
import appClasses from '../../../App.module.css';
import classes from '../Leonardo.module.css';
import LeoButton from './LeoButton';
import { LeonardoCommandObject } from '../interfaces';
import { MOVE, LOCK, UNLOCK, TALON } from '../constants';

interface TableRowProps {
  device: DeviceObject;
  setLeonardoCommand: (leonardoCommand: LeonardoCommandObject) => void;
}

const TableRow = ({ device, setLeonardoCommand }: TableRowProps) => {
  const Icon = device.online ? HiStatusOnline : HiStatusOffline;

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
        <TooltipWrapper label={`last seen ${device.last_seen}`}>
          <Icon
            className={appClasses['middle-center']}
            style={{ color: device.online ? 'gray' : 'red' }}
          />
        </TooltipWrapper>
      </Table.Td>
      <Table.Td className={classes.tableCell}
        style={{ maxWidth: '10em', }}
      >
        <DeviceName device={device} />
      </Table.Td>
      <Table.Td className={classes.tableButtonCell}>
        <LeoButton command={MOVE} device={device} setLeonardoCommand={setLeonardoCommand} />
      </Table.Td>
      <Table.Td className={classes.tableButtonCell}>
        <LeoButton command={LOCK} device={device} setLeonardoCommand={setLeonardoCommand} />
      </Table.Td>
      <Table.Td className={classes.tableButtonCell}>
        <LeoButton command={UNLOCK} device={device} setLeonardoCommand={setLeonardoCommand} />
      </Table.Td>
      <Table.Td className={classes.tableButtonCell}>
        <LeoButton command={TALON} device={device} setLeonardoCommand={setLeonardoCommand} />
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
