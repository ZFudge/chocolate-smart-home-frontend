import cx from 'clsx';
import { BsBrightnessHigh, BsFillPaletteFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { IoSparklesOutline, IoSparklesSharp, IoSpeedometerOutline } from 'react-icons/io5';
import { Checkbox, Table } from '@mantine/core';
import { DeviceName, DeviceSettings, LastSeen, ToggleButton } from '@/components';
import { DeviceTags } from '@/components/common/Tables';
import { DeviceObject } from '@/interfaces';
import { boolToOnOff, getBorderColor, getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { NeoPixelObject } from '../interfaces';
import Palette from './Palette';
import PIRConfig from './PIRConfig';
import PopoverSlider from './PopoverSlider';
import classes from '../NeoPixel.module.css';

interface TableRowProps {
  device: NeoPixelObject;
  selected: boolean;
  toggleRow: (mqtt_id: number) => void;
  openPaletteModal: () => void;
}

const TableRow = ({ device, selected, toggleRow, openPaletteModal }: TableRowProps) => {
  const { color } = useAppStore();

  return (
    <Table.Tr
      className={cx({ [classes.rowSelected]: selected })}
      data-testid={`${device.mqtt_id}-tr`}
      style={{ backgroundColor: selected ? getBorderColor(color) : 'transparent', height: '5rem' }}
    >
      <Table.Td>
        <Checkbox
          checked={selected}
          onChange={() => device.mqtt_id !== undefined && toggleRow(device.mqtt_id)}
          data-testid={`${device.mqtt_id}-checkbox`}
          color={color}
          styles={getTextInputStyles(color)}
        />
      </Table.Td>
      <Table.Td>
        <DeviceSettings device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td>
        <DeviceTags device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td>
        <LastSeen device={device} />
      </Table.Td>
      <Table.Td>
        <DeviceName device={device as unknown as DeviceObject} />
      </Table.Td>
      <Table.Td>
        <ToggleButton
          devices={[device]}
          deviceTypeName="neo_pixel"
          settingName="on"
          label={`power is ${boolToOnOff(device.on)}`}
          Icon={FaPowerOff}
        />
      </Table.Td>
      <Table.Td>
        <Palette devices={[device]} openPaletteModal={openPaletteModal} label="Update Palette" />
      </Table.Td>
      <Table.Td>
        <ToggleButton
          devices={[device]}
          deviceTypeName="neo_pixel"
          settingName="scheduled_palette_rotation"
          label={`palette rotation ${device.scheduled ? '' : 'not'} scheduled`}
          Icon={BsFillPaletteFill}
        />
      </Table.Td>
      <Table.Td>
        <ToggleButton
          devices={[device]}
          deviceTypeName="neo_pixel"
          settingName="twinkle"
          label={`twinkle is ${boolToOnOff(device.twinkle)}`}
          Icon={device.twinkle ? IoSparklesSharp : IoSparklesOutline}
        />
      </Table.Td>
      <Table.Td>
        <ToggleButton
          devices={[device]}
          deviceTypeName="neo_pixel"
          settingName="transform"
          label={`transform is ${boolToOnOff(device.transform)}`}
          Icon={GiTransform}
        />
      </Table.Td>
      <Table.Td ta="left">
        <PopoverSlider
          devices={[device]}
          deviceTypeName="neo_pixel"
          label="adjust brightness"
          name="brightness"
          Icon={BsBrightnessHigh}
        />
      </Table.Td>
      <Table.Td>
        <PopoverSlider
          devices={[device]}
          deviceTypeName="neo_pixel"
          label="adjust speed"
          name="ms"
          Icon={IoSpeedometerOutline}
        />
      </Table.Td>
      <Table.Td>
        <PIRConfig devices={[device]} />
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
