import { BsBrightnessHigh, BsFillPaletteFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { IoSparklesSharp, IoSpeedometerOutline } from 'react-icons/io5';
import { Checkbox, Table } from '@mantine/core';
import appClasses from '@/App.module.css';
import { SyncDeviceDataButton, ValueFilter } from '@/components';
import { TagsFilterButton } from '@/components/common/Tables';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore, useDevicesStore } from '@/stores';
import Palette from '../Palette';
import PopoverPIRConfig from '../PIRConfig';
import PopoverSlider from '../PopoverSlider';
import HeaderColumnToggler from './HeaderColumnToggler';
import classes from '../../NeoPixel.module.css';

interface HeaderProps {
  toggleAll: () => void;
  openPaletteModal: () => void;
  selection: number[];
}

const Header = ({ selection, toggleAll, openPaletteModal }: HeaderProps) => {
  const { color } = useAppStore();
  const { neoPixelDevices } = useDevicesStore();
  const neoPixelDevicesArray = Object.values(neoPixelDevices);

  const trSettingsClass = `${selection.length < 2 ? appClasses.hidden : appClasses.visible} ${classes['visibility-transition']}`;
  const selectedDevices = neoPixelDevicesArray.filter((device) =>
    selection.includes(device.mqtt_id)
  );

  return (
    <Table.Tr style={{ height: '5rem' }}>
      <Table.Th w={40} ta="center">
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === neoPixelDevicesArray.length}
          indeterminate={selection.length > 0 && selection.length !== neoPixelDevicesArray.length}
          data-testid="toggle-all-checkbox"
          color={color}
          styles={getTextInputStyles(color)}
        />
      </Table.Th>
      <Table.Th ta="center">
        <SyncDeviceDataButton />
      </Table.Th>
      <Table.Th key="tags" ta="center">
        <TagsFilterButton />
      </Table.Th>
      <Table.Th key="last-seen" ta="center">
        <ValueFilter />
      </Table.Th>
      <Table.Th />
      <HeaderColumnToggler
        settingName="on"
        Icon={FaPowerOff}
        selection={selection}
        devices={selectedDevices}
        trSettingsClass={trSettingsClass}
      />
      <Table.Th key="palette-header" ta="center">
        <Palette devices={selectedDevices} openPaletteModal={openPaletteModal} label="palette" />
      </Table.Th>
      <HeaderColumnToggler
        settingName="scheduled_palette_rotation"
        Icon={BsFillPaletteFill}
        selection={selection}
        devices={selectedDevices}
        trSettingsClass={trSettingsClass}
      />
      <HeaderColumnToggler
        settingName="twinkle"
        Icon={IoSparklesSharp}
        selection={selection}
        devices={selectedDevices}
        trSettingsClass={trSettingsClass}
      />
      <HeaderColumnToggler
        settingName="transform"
        Icon={GiTransform}
        selection={selection}
        devices={selectedDevices}
        trSettingsClass={trSettingsClass}
      />
      <Table.Th key="brightness" className={trSettingsClass} w={75}>
        <PopoverSlider
          devices={selectedDevices}
          deviceTypeName="neo_pixel"
          label="adjust brightness"
          name="brightness"
          Icon={BsBrightnessHigh}
        />
      </Table.Th>
      <Table.Th key="ms" w={75} ta="center">
        <PopoverSlider
          devices={selectedDevices}
          deviceTypeName="neo_pixel"
          label="adjust speed"
          name="ms"
          Icon={IoSpeedometerOutline}
        />
      </Table.Th>
      <Table.Th>
        <PopoverPIRConfig devices={selectedDevices} />
      </Table.Th>
    </Table.Tr>
  );
};

export default Header;
