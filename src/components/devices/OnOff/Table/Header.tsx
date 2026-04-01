import { Checkbox, Table } from '@mantine/core';
import { SyncDeviceDataButton, ValueFilter } from '@/components';
import { TagsFilterButton } from '@/components/common/Tables';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import useOnOffStore from '../useOnOffStore';

const Header = () => {
  const { color } = useAppStore();
  const { onOffDevices, selectedDevices, toggleAll } = useOnOffStore();

  const allSelected =
    selectedDevices.length > 0 && selectedDevices.length === Object.values(onOffDevices).length;

  return (
    <Table.Tr style={{ height: '5rem' }}>
      <Table.Th>
        <Checkbox
          onChange={() => toggleAll()}
          checked={allSelected}
          indeterminate={!allSelected && selectedDevices.length > 0}
          data-testid="toggle-all-checkbox"
          color={color}
          styles={getTextInputStyles(color)}
        />
      </Table.Th>
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
