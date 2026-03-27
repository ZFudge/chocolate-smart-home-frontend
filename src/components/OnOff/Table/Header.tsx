import { Checkbox, Table } from '@mantine/core';
import SyncDeviceDataButton from '@/components/SyncDeviceDataButton';
import ValueFilterButton from '@/components/TableComponents/ValueFilterButton';
import TagsHeader from '@/components/Tags/TableHeader/TagsHeader';
import { getBorderColor } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { OnOffObject } from '../interfaces';

interface HeaderProps {
  devices: OnOffObject[];
  selection: number[];
  toggleAll: () => void;
  filteredTagIds: number[];
  setFilteredTagIds: (filteredTagIds: number[]) => void;
  filteredValue: string;
  setFilteredValue: (filteredValue: string) => void;
}

const Header = ({
  devices,
  selection,
  toggleAll,
  filteredTagIds,
  setFilteredTagIds,
  filteredValue,
  setFilteredValue,
}: HeaderProps) => {
  const { color } = useAppStore();

  return (
    <Table.Tr style={{ height: '5rem' }}>
      <Table.Th>
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === devices.length}
          indeterminate={selection.length > 0 && selection.length !== devices.length}
          data-testid="toggle-all-checkbox"
          color={color}
          styles={{
            input: {
              border: `0.5px solid ${getBorderColor(color)}`,
            },
          }}
        />
      </Table.Th>
      <Table.Th>
        <SyncDeviceDataButton />
      </Table.Th>
      <Table.Th key="tags">
        <TagsHeader filteredTagIds={filteredTagIds} setFilteredTagIds={setFilteredTagIds} />
      </Table.Th>
      <Table.Th>
        <ValueFilterButton filteredValue={filteredValue} setFilteredValue={setFilteredValue} />
      </Table.Th>
      <Table.Th key="device-names-header">On / Off Devices</Table.Th>
    </Table.Tr>
  );
};

export default Header;
