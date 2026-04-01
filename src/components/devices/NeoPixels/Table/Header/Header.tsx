import { BsBrightnessHigh, BsFillPaletteFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { IoSparklesSharp, IoSpeedometerOutline } from 'react-icons/io5';
import { Checkbox, Table } from '@mantine/core';
import { SyncDeviceDataButton, ValueFilter } from '@/components';
import { TagsFilterButton } from '@/components/common/Tables';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import useNeoPixelStore from '../../useNeoPixelStore';
import HeaderColumnToggler from './HeaderColumnToggler';
import Palettes from './Palettes';
import PIRConfigs from './PIRConfigs';
import PopoverSliderMulti from './PopoverSliderMulti';

const Header = () => {
  const { color } = useAppStore();
  const { neoPixelDevices, selectedDevices, toggleAll } = useNeoPixelStore();
  const neoPixelDevicesArray = Object.values(neoPixelDevices);

  return (
    <Table.Tr style={{ height: '5rem' }}>
      <Table.Th w={40} ta="center">
        <Checkbox
          onChange={toggleAll}
          checked={selectedDevices.length === neoPixelDevicesArray.length}
          indeterminate={
            selectedDevices.length > 0 && selectedDevices.length !== neoPixelDevicesArray.length
          }
          data-testid="toggle-all-checkbox"
          color={color}
          styles={getTextInputStyles(color)}
        />
      </Table.Th>
      <Table.Th ta="center">
        <SyncDeviceDataButton />
      </Table.Th>
      <Table.Th ta="center">
        <TagsFilterButton />
      </Table.Th>
      <Table.Th ta="center">
        <ValueFilter />
      </Table.Th>
      <Table.Th />
      <HeaderColumnToggler Icon={FaPowerOff} settingName="on" />
      <Table.Th ta="center">
        <Palettes />
      </Table.Th>
      <HeaderColumnToggler Icon={BsFillPaletteFill} settingName="scheduled_palette_rotation" />
      <HeaderColumnToggler Icon={IoSparklesSharp} settingName="twinkle" />
      <HeaderColumnToggler Icon={GiTransform} settingName="transform" />
      <Table.Th w={75} ta="center">
        <PopoverSliderMulti name="brightness" Icon={BsBrightnessHigh} />
      </Table.Th>
      <Table.Th w={75} ta="center">
        <PopoverSliderMulti name="ms" Icon={IoSpeedometerOutline} />
      </Table.Th>
      <Table.Th ta="center">
        <PIRConfigs />
      </Table.Th>
    </Table.Tr>
  );
};

export default Header;
