import { Checkbox, Table } from "@mantine/core";
import { BsBrightnessHigh } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { GiTransform } from "react-icons/gi";
import { IoSparklesSharp, IoSpeedometerOutline } from "react-icons/io5";

import classes from '../../NeoPixel.module.css';
import { NeoPixelObject } from "../../interfaces";
import HeaderColumnToggler from "./HeaderColumnToggler";
import PopoverSlider from "../PopoverSlider";

interface HeaderProps {
  toggleAll: () => void;
  selection: number[];
  neoPixelData: NeoPixelObject[];
}

const Header = ({
  toggleAll,
  selection,
  neoPixelData,
}: HeaderProps) => {
  const trSettingsClass = (selection.length < 2 ? classes.hidden : classes.visible) + ' ' + classes['visibility-transition'];
  const selectedDevices = neoPixelData.filter((device) => selection.includes(device.mqtt_id));

  return (
    <Table.Tr>
      <Table.Th w={40}>
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === neoPixelData.length}
          indeterminate={
            selection.length > 0 &&
              selection.length !== neoPixelData.length
          }
        />
      </Table.Th>
      <Table.Th key="device-names-header" />
      <HeaderColumnToggler
        settingName="on"
        Icon={FaPowerOff}
        selection={selection}
        neoPixelData={neoPixelData}
        trSettingsClass={trSettingsClass}
      />
      <Table.Th key="palette-header" />
      <HeaderColumnToggler
        settingName="twinkle"
        Icon={IoSparklesSharp}
        selection={selection}
        neoPixelData={neoPixelData}
        trSettingsClass={trSettingsClass}
      />
      <HeaderColumnToggler
        settingName="transform"
        Icon={GiTransform}
        selection={selection}
        neoPixelData={neoPixelData}
        trSettingsClass={trSettingsClass}
      />
      <Table.Th key="ms" className={trSettingsClass}>
        <PopoverSlider
          label="adjust speed"
          name="ms"
          device={selectedDevices}
          Icon={IoSpeedometerOutline}
        />
      </Table.Th>
      <Table.Th key="brightness" className={trSettingsClass}>
        <PopoverSlider
          label="adjust brightness"
          name="brightness"
          device={selectedDevices}
          Icon={BsBrightnessHigh}
        />
      </Table.Th>
      <Table.Th key="tags" />
    </Table.Tr>
  );
};

export default Header;
