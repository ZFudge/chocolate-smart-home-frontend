import { Table } from '@mantine/core';
import { SyncDeviceDataButton, TagsHeader, ValueFilterButton } from '@/components';

const Header = () => {
  return (
    <Table.Tr style={{ height: '5rem' }}>
      <Table.Th>
        <SyncDeviceDataButton />
      </Table.Th>
      <Table.Th key="tags">
        <TagsHeader />
      </Table.Th>
      <Table.Th>
        <ValueFilterButton />
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
