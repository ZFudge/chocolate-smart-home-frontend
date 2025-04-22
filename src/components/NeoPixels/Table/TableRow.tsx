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
import { ToggleButton } from '@/components';
import { boolToOnOff } from '@/lib/utils';
import { NeoPixelObject } from '../interfaces';
import Palette from './Palette';
import PopoverSlider from './PopoverSlider';
import SplitTableCell from './SplitTableCell';

interface TableRowProps {
  device: NeoPixelObject;
  selected: boolean;
  toggleRow: (mqtt_id: number) => void;
  openPaletteModal: () => void;
}

const TableRow = ({
  device,
  selected,
  toggleRow,
  openPaletteModal,
}: TableRowProps) => {
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
        <ToggleButton
          device={device}
          settingName="on"
          label={`power is ${boolToOnOff(device.online)}`}
          Icon={FaPowerOff}
        />,
        <Palette
          device={device}
          openPaletteModal={openPaletteModal}
          label="Update Palette"
        />,
        <ToggleButton
          device={device}
          settingName="twinkle"
          label={`twinkle is ${boolToOnOff(device.twinkle)}`}
          Icon={device.twinkle ? IoSparklesSharp : IoSparklesOutline}
        />,
        <ToggleButton
          device={device}
          settingName="transform"
          label={`transform is ${boolToOnOff(device.transform)}`}
          Icon={GiTransform}
        />,
        <PopoverSlider
          label="adjust speed"
          name="ms"
          device={device}
          Icon={IoSpeedometerOutline}
        />,
        <PopoverSlider
          label="adjust brightness"
          name="brightness"
          device={device}
          Icon={BsBrightnessHigh}
        />,
        <SplitTableCell
          value={device.space}
          Icon={IoLocationOutline}
        />,
      ].map((tableCell, i) => (
        <Table.Td
          key={`td-${i}-${device.mqtt_id}`}
          className={classes.tableCell}
        >
          {tableCell}
        </Table.Td>
      ))}
    </Table.Tr>
  );
};

export default TableRow;
