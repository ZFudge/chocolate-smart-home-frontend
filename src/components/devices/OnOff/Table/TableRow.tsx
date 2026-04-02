import React from 'react';
import { FaPowerOff } from 'react-icons/fa';
import { Table, Text } from '@mantine/core';
import { DeviceName, DeviceSettings, LastSeen, ToggleButton } from '@/components';
import { DeviceTags } from '@/components/common/Tables';
import { DeviceObject } from '@/interfaces';
import { boolToOnOff } from '@/lib/utils';
import { OnOffObject } from '../interfaces';
import classes from '../OnOff.module.css';

const TableRow = React.memo(({ device }: { device: OnOffObject }) => {
  return (
    <Table.Tr
      data-testid={`${device.mqtt_id}-tr`}
      style={{
        height: '4.5rem',
      }}
    >
      <Table.Td>
        <DeviceSettings device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td>
        <DeviceTags device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td>
        <LastSeen device={device} />
      </Table.Td>
      <Table.Td>
        <DeviceName device={device} />
      </Table.Td>
      <Table.Td w={75} miw={75} ta="left">
        <ToggleButton
          device={device}
          Icon={FaPowerOff}
          label={<Text>Power is {boolToOnOff(device.on)}</Text>}
          settingName="on"
        />
      </Table.Td>
    </Table.Tr>
  );
});

export default TableRow;
