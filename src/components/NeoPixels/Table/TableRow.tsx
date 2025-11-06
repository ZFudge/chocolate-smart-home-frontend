import cx from 'clsx';
import { BsBrightnessHigh, BsFillPaletteFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { IoSparklesOutline, IoSparklesSharp, IoSpeedometerOutline } from 'react-icons/io5';
import { Checkbox, Table } from '@mantine/core';
import { TagsCell, ToggleButton } from '@/components';
import DeviceName from '@/components/DeviceName';
import DeviceSettings from '@/components/TableComponents/DeviceSettings';
import { DeviceObject } from '@/interfaces';
import { boolToOnOff } from '@/lib/utils';
import { NeoPixelObject } from '../interfaces';
import Palette from './Palette';
import PopoverPIRConfig from './PopoverPIRConfig';
import PopoverSlider from './PopoverSlider';
import classes from '../NeoPixel.module.css';
import LastSeen from '@/components/TableComponents/LastSeen';

interface TableRowProps {
  device: NeoPixelObject;
  selected: boolean;
  toggleRow: (mqtt_id: number) => void;
  openPaletteModal: () => void;
}

const TableRow = ({ device, selected, toggleRow, openPaletteModal }: TableRowProps) => {
  return (
    <Table.Tr
      className={cx({ [classes.rowSelected]: selected })}
      data-testid={`${device.mqtt_id}-tr`}
    >
      <Table.Td className={classes.tableCell}>
        <Checkbox
          checked={selected}
          onChange={() => device.mqtt_id !== undefined && toggleRow(device.mqtt_id)}
          data-testid={`${device.mqtt_id}-checkbox`}
        />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <DeviceSettings device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <TagsCell device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <LastSeen device={device} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <DeviceName device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <ToggleButton
          devices={[device]}
          deviceTypeName="neo_pixel"
          settingName="on"
          label={`power is ${boolToOnOff(device.on)}`}
          Icon={FaPowerOff}
        />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <Palette devices={[device]} openPaletteModal={openPaletteModal} label="Update Palette" />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <ToggleButton
          devices={[device]}
          deviceTypeName="neo_pixel"
          settingName="scheduled_palette_rotation"
          label={`palette rotation ${device.scheduled ? '' : 'not'} scheduled`}
          Icon={BsFillPaletteFill}
        />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <ToggleButton
          devices={[device]}
          deviceTypeName="neo_pixel"
          settingName="twinkle"
          label={`twinkle is ${boolToOnOff(device.twinkle)}`}
          Icon={device.twinkle ? IoSparklesSharp : IoSparklesOutline}
        />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <ToggleButton
          devices={[device]}
          deviceTypeName="neo_pixel"
          settingName="transform"
          label={`transform is ${boolToOnOff(device.transform)}`}
          Icon={GiTransform}
        />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <PopoverSlider
          devices={[device]}
          deviceTypeName="neo_pixel"
          label="adjust brightness"
          name="brightness"
          Icon={BsBrightnessHigh}
        />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <PopoverSlider
          devices={[device]}
          deviceTypeName="neo_pixel"
          label="adjust speed"
          name="ms"
          Icon={IoSpeedometerOutline}
        />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <PopoverPIRConfig devices={[device]} />
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
