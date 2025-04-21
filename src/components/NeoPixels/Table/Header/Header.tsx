import { Checkbox, Table } from "@mantine/core";
import { BsBrightnessHigh } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { GiTransform } from "react-icons/gi";
import { IoSparklesSharp, IoSpeedometerOutline } from "react-icons/io5";

import TooltipWrapper from "@/components/TooltipWrapper";
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
      <Table.Th key="device-names" />
      <HeaderColumnToggler
        settingName="on"
        Icon={FaPowerOff}
        selection={selection}
        neoPixelData={neoPixelData}
        trSettingsClass={trSettingsClass}
      />
      <Table.Th key="palette" />
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
        <TooltipWrapper label="adjust speed">
          <PopoverSlider
            name="ms"
            device={selectedDevices}
            Icon={IoSpeedometerOutline}
          />
        </TooltipWrapper>
      </Table.Th>
      <Table.Th key="brightness" className={trSettingsClass}>
        <TooltipWrapper label="adjust brightness">
          <PopoverSlider
            name="brightness"
            device={selectedDevices}
            Icon={BsBrightnessHigh}
          />
        </TooltipWrapper>
      </Table.Th>
      <Table.Th key="tags" />
    </Table.Tr>
  );
};

export default Header;
