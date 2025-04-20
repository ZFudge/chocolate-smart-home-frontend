import { Checkbox, Table } from "@mantine/core";
import { BsBrightnessHigh } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { GiTransform } from "react-icons/gi";
import { IoSparklesSharp, IoSpeedometerOutline } from "react-icons/io5";

import classes from '../../NeoPixel.module.css';
import { NeoPixelObject } from "../../interfaces";
import HeaderColumnToggler from "./HeaderColumnToggler";
import PopoverSlider from "../PopoverSlider";
import TooltipWrapper from "../TooltipWrapper";

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
        label="left to turn all selected devices off, right to turn them on"
        Icon={FaPowerOff}
        selection={selection}
        neoPixelData={neoPixelData}
        trSettingsClass={trSettingsClass}
      />
      <Table.Th key="palette" />
      <HeaderColumnToggler
        settingName="twinkle"
        label="left to turn off all selected devices' twinkle setting, right to turn on"
        Icon={IoSparklesSharp}
        selection={selection}
        neoPixelData={neoPixelData}
        trSettingsClass={trSettingsClass}
      />
      <HeaderColumnToggler
        settingName="transform"
        label="left to turn off all selected devices' transform setting, right to turn on"
        Icon={GiTransform}
        selection={selection}
        neoPixelData={neoPixelData}
        trSettingsClass={trSettingsClass}
      />
      <Table.Th key="ms" className={trSettingsClass}>
        <TooltipWrapper label="ms setting on all selected devices">
          <PopoverSlider
            name="ms"
            device={selection}
            Icon={IoSpeedometerOutline}
          />
        </TooltipWrapper>
      </Table.Th>
      <Table.Th key="brightness" className={trSettingsClass}>
        <TooltipWrapper label="brightness setting on all selected devices">
          <PopoverSlider
            name="brightness"
            device={selection}
            Icon={BsBrightnessHigh}
          />
        </TooltipWrapper>
      </Table.Th>
      <Table.Th key="tags" />
    </Table.Tr>
  );
};

export default Header;
