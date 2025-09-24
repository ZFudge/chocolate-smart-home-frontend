import { BsBrightnessHigh, BsFillPaletteFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { IoSparklesSharp, IoSpeedometerOutline } from 'react-icons/io5';
import { Checkbox, Table } from '@mantine/core';
import classes from '@/App.module.css';
import { NeoPixelObject } from '../../interfaces';
import Palette from '../Palette';
import PopoverPIRConfig from '../PopoverPIRConfig';
import PopoverSlider from '../PopoverSlider';
import HeaderColumnToggler from './HeaderColumnToggler';

interface HeaderProps {
  devices: NeoPixelObject[];
  selection: number[];
  toggleAll: () => void;
  openPaletteModal: () => void;
}

const Header = ({ devices, selection, toggleAll, openPaletteModal }: HeaderProps) => {
  const trSettingsClass = `${selection.length < 2 ? classes.hidden : classes.visible} ${classes['visibility-transition']}`;
  const selectedDevices = devices.filter((device) => selection.includes(device.mqtt_id));

  return (
    <Table.Tr style={{ height: '3.5rem' }}>
      <Table.Th w={40}>
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === devices.length}
          indeterminate={selection.length > 0 && selection.length !== devices.length}
          data-testid="toggle-all-checkbox"
        />
      </Table.Th>
      <Table.Th key="tags" />
      <Table.Th key="last-seen" />
      <Table.Th key="device-names-header" style={{ minWidth: '100px' }}>Neo Pixels</Table.Th>
      <HeaderColumnToggler
        settingName="on"
        Icon={FaPowerOff}
        selection={selection}
        devices={selectedDevices}
        trSettingsClass={trSettingsClass}
      />
      <Table.Th key="palette-header">
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
      <Table.Th key="ms" className={trSettingsClass} w={75}>
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
