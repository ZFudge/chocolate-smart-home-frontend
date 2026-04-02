import { Table } from '@mantine/core';
import { SyncDeviceDataButton, ValueFilter } from '@/components';
import { TagsFilterButton } from '@/components/common/Tables';
import useOnOffStore from '../useOnOffStore';

const Header = () => {
  const { onOffDevices } = useOnOffStore();
  const onOffDevicesArray = Object.values(onOffDevices);

  return (
    <Table.Tr style={{ height: '5rem' }}>
      <Table.Th>
        <SyncDeviceDataButton />
      </Table.Th>
      <Table.Th key="tags">
        <TagsFilterButton devices={onOffDevicesArray} />
      </Table.Th>
      <Table.Th>
        <ValueFilter />
      </Table.Th>
    </Table.Tr>
  );
};

export default Header;
