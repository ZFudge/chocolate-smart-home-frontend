import { Checkbox, Table } from '@mantine/core';
import TagsHeader from '@/components/Tags/TableHeader/TagsHeader';
import { OnOffObject } from '../interfaces';

interface HeaderProps {
  devices: OnOffObject[];
  selection: number[];
  toggleAll: () => void;
  filteredTagIds: number[];
  setFilteredTagIds: (filteredTagIds: number[]) => void;
}

const Header = ({
  devices,
  selection,
  toggleAll,
  filteredTagIds,
  setFilteredTagIds,
}: HeaderProps) => {
  return (
    <>
      <Table.Tr style={{ height: '3rem' }}>
        <Table.Th w={40}>
          <Checkbox
            onChange={toggleAll}
            checked={selection.length === devices.length}
            indeterminate={selection.length > 0 && selection.length !== devices.length}
            data-testid="toggle-all-checkbox"
          />
        </Table.Th>
        <Table.Th key="tags">
          <TagsHeader filteredTagIds={filteredTagIds} setFilteredTagIds={setFilteredTagIds} />
        </Table.Th>
        <Table.Th w={30} />
        <Table.Th key="device-names-header">On / Off Devices</Table.Th>
      </Table.Tr>
    </>
  );
};

export default Header;
