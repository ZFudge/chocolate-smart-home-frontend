import { Table } from '@mantine/core';
import { SyncDeviceDataButton, ValueFilter } from '@/components';
import { TagsFilterButton } from '@/components/common/Tables';
import { DeviceObject } from '@/interfaces';

const Header = ({ leonardoDevices }: { leonardoDevices: DeviceObject[] }) => {
  return (
    <Table.Tr style={{ height: '5rem' }}>
      <Table.Th>
        <SyncDeviceDataButton />
      </Table.Th>
      <Table.Th>
        <TagsFilterButton devices={leonardoDevices} />
      </Table.Th>
      <Table.Th>
        <ValueFilter />
      </Table.Th>
      <Table.Th />
      <Table.Th />
      <Table.Th />
      <Table.Th />
      <Table.Th />
    </Table.Tr>
  );
};

export default Header;
