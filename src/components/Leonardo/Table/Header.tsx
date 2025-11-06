import { Table } from '@mantine/core';
import SyncDeviceDataButton from '@/components/SyncDeviceDataButton';
import ValueFilterButton from '@/components/TableComponents/ValueFilterButton';
import TagsHeader from '@/components/Tags/TableHeader/TagsHeader';
import { DeviceObject } from '@/interfaces';

interface HeaderProps {
  devices: DeviceObject[];
  filteredTagIds: number[];
  setFilteredTagIds: (filteredTagIds: number[]) => void;
  filteredValue: string;
  setFilteredValue: (filteredValue: string) => void;
}

const Header = ({
  devices,
  filteredTagIds,
  setFilteredTagIds,
  filteredValue,
  setFilteredValue,
}: HeaderProps) => {
  return (
    <Table.Tr style={{ height: '3rem' }}>
      <Table.Th w={40}>
        <SyncDeviceDataButton />
      </Table.Th>
      <Table.Th key="tags">
        <TagsHeader filteredTagIds={filteredTagIds} setFilteredTagIds={setFilteredTagIds} />
      </Table.Th>
      <Table.Th w={30}>
        <ValueFilterButton filteredValue={filteredValue} setFilteredValue={setFilteredValue} />
      </Table.Th>
      <Table.Th key="device-names-header">Leonardo Devices</Table.Th>
    </Table.Tr>
  );
};

export default Header;
