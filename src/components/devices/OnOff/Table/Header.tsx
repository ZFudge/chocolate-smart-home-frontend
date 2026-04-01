import { Table } from '@mantine/core';
import { SyncDeviceDataButton, ValueFilter } from '@/components';
import { TagsFilterButton } from '@/components/common/Tables';

const Header = () => {
  return (
    <Table.Tr style={{ height: '5rem' }}>
      <Table.Th>
        <SyncDeviceDataButton />
      </Table.Th>
      <Table.Th key="tags">
        <TagsFilterButton />
      </Table.Th>
      <Table.Th>
        <ValueFilter />
      </Table.Th>
    </Table.Tr>
  );
};

export default Header;
