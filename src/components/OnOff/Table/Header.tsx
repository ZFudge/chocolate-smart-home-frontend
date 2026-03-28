import { Checkbox, Table } from '@mantine/core';
import { SyncDeviceDataButton, TagsHeader, ValueFilterButton } from '@/components';
import { getBorderColor } from '@/lib/utils';
import { useAppStore, useDevicesStore } from '@/stores';

interface HeaderProps {
  selection: number[];
  toggleAll: () => void;
}

const Header = ({ selection, toggleAll }: HeaderProps) => {
  const { color } = useAppStore();
  const { onOffDevices } = useDevicesStore();
  const onOffDevicesArray = Object.values(onOffDevices);

  return (
    <Table.Tr style={{ height: '5rem' }}>
      <Table.Th>
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === onOffDevicesArray.length}
          indeterminate={selection.length > 0 && selection.length !== onOffDevicesArray.length}
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
        <TagsHeader />
      </Table.Th>
      <Table.Th>
        <ValueFilterButton />
      </Table.Th>
    </Table.Tr>
  );
};

export default Header;
