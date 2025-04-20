import cx from 'clsx';
import { Checkbox, Table } from '@mantine/core';
import { BsBrightnessHigh } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi';
import {
  IoLocationOutline,
  IoSparklesOutline,
  IoSparklesSharp,
  IoSpeedometerOutline,
} from 'react-icons/io5';

import classes from '../NeoPixel.module.css';
import ToggleButton from '@/components/ToggleButton';
import { boolToOnOff } from '@/lib/utils';
import { NeoPixelObject } from '../interfaces';
import Palette from './Palette';
import PopoverSlider from './PopoverSlider';
import SplitTableCell from './SplitTableCell';
import TooltipWrapper from './TooltipWrapper';

const TableRow = ({
  device,
  selected,
  toggleRow,
  openPaletteModal,
}: {
  device: NeoPixelObject;
  selected: boolean;
  toggleRow: (mqtt_id: number) => void;
  openPaletteModal: () => void;
}) => {
  return (
    <Table.Tr
      className={cx({ [classes.rowSelected]: selected })}
      data-testid={`${device.mqtt_id}-tr`}
    >
      {[
        <Checkbox
          checked={selected}
          onChange={() => device.mqtt_id !== undefined && toggleRow(device.mqtt_id)}
          data-testid={`${device.mqtt_id}-checkbox`}
        />,
        <SplitTableCell
          value={device.name}
          Icon={device.online ? HiStatusOnline : HiStatusOffline}
        />,
        <TooltipWrapper label={`Power ${boolToOnOff(!device.online)}`}>
          <ToggleButton device={device} settingName="on">
            <FaPowerOff />
          </ToggleButton>
        </TooltipWrapper>,
        <TooltipWrapper label="Update Palette">
          <Palette device={device} openPaletteModal={openPaletteModal} />
        </TooltipWrapper>,
        <TooltipWrapper label={`Twinkle ${boolToOnOff(!device.twinkle)}`}>
          <ToggleButton device={device} settingName="twinkle">
            {device.twinkle ? <IoSparklesSharp /> : <IoSparklesOutline />}
          </ToggleButton>
        </TooltipWrapper>,
        <TooltipWrapper label={`Transform ${boolToOnOff(!device.transform)}`}>
          <ToggleButton device={device} settingName="transform">
            {device.transform ? <GiTransform /> : <GiTransform />}
          </ToggleButton>
        </TooltipWrapper>,
        <TooltipWrapper label="Set Milliseconds">
          <PopoverSlider name="ms" device={device} Icon={IoSpeedometerOutline} />
        </TooltipWrapper>,
        <TooltipWrapper label="Set Brightness">
          <PopoverSlider name="brightness" device={device} Icon={BsBrightnessHigh} />
        </TooltipWrapper>,
        <SplitTableCell value={device.space} Icon={IoLocationOutline} />,
      ].map((tableCell, i) => (
        <Table.Td key={`td-${i}-${device.mqtt_id}`}>{tableCell}</Table.Td>
      ))}
    </Table.Tr>
  );
};

export default TableRow;
