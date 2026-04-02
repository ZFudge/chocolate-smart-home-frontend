import { BsFillPaletteFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { IoIosTime } from 'react-icons/io';
import { IoSparklesSharp } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';
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

const WIDTH = 75;

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
          data-testid="neo-pixel-header-toggle-all-checkbox"
          color={color}
          styles={getTextInputStyles(color)}
        />
      </Table.Th>
      <Table.Th ta="center">
        <SyncDeviceDataButton />
      </Table.Th>
      <Table.Th ta="center">
        <TagsFilterButton devices={neoPixelDevicesArray} />
      </Table.Th>
      <Table.Th ta="center">
        <ValueFilter />
      </Table.Th>
      <Table.Th />
      <Table.Th w={WIDTH} miw={WIDTH} ta="center">
        <HeaderColumnToggler Icon={FaPowerOff} settingName="On" />
      </Table.Th>
      <Table.Th ta="center">
        <Palettes />
      </Table.Th>
      <Table.Th w={WIDTH} miw={WIDTH} ta="center">
        <HeaderColumnToggler Icon={BsFillPaletteFill} settingName="scheduled_palette_rotation" />
      </Table.Th>
      <Table.Th w={WIDTH} miw={WIDTH} ta="center">
        <HeaderColumnToggler Icon={IoSparklesSharp} settingName="Twinkle" />
      </Table.Th>
      <Table.Th w={WIDTH} miw={WIDTH} ta="center">
        <HeaderColumnToggler Icon={GiTransform} settingName="Transform" />
      </Table.Th>
      <Table.Th w={WIDTH} miw={WIDTH} ta="center">
        <PopoverSliderMulti name="Brightness" Icon={MdSunny} />
      </Table.Th>
      <Table.Th w={WIDTH} miw={WIDTH} ta="center">
        <PopoverSliderMulti name="MS" Icon={IoIosTime} />
      </Table.Th>
      <Table.Th w={WIDTH} miw={WIDTH} ta="center">
        <PIRConfigs />
      </Table.Th>
    </Table.Tr>
  );
};

export default Header;
