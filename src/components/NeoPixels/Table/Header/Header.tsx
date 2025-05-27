  import { Checkbox, Table } from "@mantine/core";
import { BsBrightnessHigh } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { GiTransform } from "react-icons/gi";
import { IoSparklesSharp, IoSpeedometerOutline } from "react-icons/io5";

import classes from '@/App.module.css';
import { NeoPixelObject } from "../../interfaces";
import HeaderColumnToggler from "./HeaderColumnToggler";
import PopoverSlider from "../PopoverSlider";

interface HeaderProps {
  devices: NeoPixelObject[];
  selection: number[];
  toggleAll: () => void;
}

const Header = ({
  devices,
  selection,
  toggleAll,
}: HeaderProps) => {
  const trSettingsClass = (selection.length < 2 ? classes.hidden : classes.visible) + ' ' + classes['visibility-transition'];
  const selectedDevices = devices.filter((device) => selection.includes(device.mqtt_id));

  return (
    <Table.Tr style={{ height: '3.5rem' }}>
      <Table.Th w={40}>
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === devices.length}
          indeterminate={
            selection.length > 0 &&
              selection.length !== devices.length
          }
        />
      </Table.Th>
      <Table.Th key="tags" />
      <Table.Th key="device-names-header">
        Neo Pixels
      </Table.Th>
      <HeaderColumnToggler
        settingName="on"
        Icon={FaPowerOff}
        selection={selection}
        devices={selectedDevices}
        trSettingsClass={trSettingsClass}
      />
      <Table.Th key="palette-header" />
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
      <Table.Th key="ms" className={trSettingsClass} w={75}>
        <PopoverSlider
          device={selectedDevices}
          deviceTypeName="neo_pixel"
          label="adjust speed"
          name="ms"
          Icon={IoSpeedometerOutline}
        />
      </Table.Th>
      <Table.Th key="brightness" className={trSettingsClass} w={75}>
        <PopoverSlider
          device={selectedDevices}
          deviceTypeName="neo_pixel"
          label="adjust brightness"
          name="brightness"
          Icon={BsBrightnessHigh}
        />
      </Table.Th>
    </Table.Tr>
  );
};

export default Header;
