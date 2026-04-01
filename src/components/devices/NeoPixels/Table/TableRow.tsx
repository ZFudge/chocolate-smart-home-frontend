import cx from 'clsx';
import { BsBrightnessHigh, BsFillPaletteFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { IoSparklesOutline, IoSparklesSharp, IoSpeedometerOutline } from 'react-icons/io5';
import { Checkbox, Table, Text } from '@mantine/core';
import { DeviceName, DeviceSettings, LastSeen, ToggleButton } from '@/components';
import { DeviceTags } from '@/components/common/Tables';
import { DeviceObject } from '@/interfaces';
import { boolToOnOff, getBorderColor, getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { NeoPixelObject } from '../interfaces';
import useNeoPixelStore from '../useNeoPixelStore';
import Palette from './Palette';
import PIRConfig from './PIRConfig';
import PopoverSlider from './PopoverSlider';
import classes from '../NeoPixel.module.css';

interface TableRowProps {
  device: NeoPixelObject;
}

const TableRow = ({ device }: TableRowProps) => {
  const { color } = useAppStore();
  const { selectedDevices, toggleDevice } = useNeoPixelStore();
  const selected = selectedDevices.includes(device.mqtt_id);

  return (
    <Table.Tr
      className={cx({ [classes.rowSelected]: selected })}
      data-testid={`${device.mqtt_id}-tr`}
      style={{ backgroundColor: selected ? getBorderColor(color) : 'transparent', height: '5rem' }}
    >
      <Table.Td>
        <Checkbox
          checked={selected}
          onChange={() => device.mqtt_id !== undefined && toggleDevice(device.mqtt_id)}
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
          device={device}
          settingName="on"
          label={<Text>Power is {boolToOnOff(device.on)}</Text>}
          Icon={FaPowerOff}
        />
      </Table.Td>
      <Table.Td>
        <Palette device={device} />
      </Table.Td>
      <Table.Td>
        <ToggleButton
          device={device}
          settingName="scheduled_palette_rotation"
          label={<Text>Palette Rotation {device.scheduled ? '' : 'not'} scheduled</Text>}
          Icon={BsFillPaletteFill}
        />
      </Table.Td>
      <Table.Td>
        <ToggleButton
          device={device}
          settingName="twinkle"
          label={<Text>Twinkle is {boolToOnOff(device.twinkle)}</Text>}
          Icon={device.twinkle ? IoSparklesSharp : IoSparklesOutline}
        />
      </Table.Td>
      <Table.Td>
        <ToggleButton
          device={device}
          settingName="transform"
          label={<Text>Transform is {boolToOnOff(device.transform)}</Text>}
          Icon={GiTransform}
        />
      </Table.Td>
      <Table.Td ta="left">
        <PopoverSlider
          device={device}
          label={<Text>Adjust Brightness</Text>}
          name="brightness"
          Icon={BsBrightnessHigh}
        />
      </Table.Td>
      <Table.Td>
        <PopoverSlider
          device={device}
          label={<Text>Adjust Speed</Text>}
          name="ms"
          Icon={IoSpeedometerOutline}
        />
      </Table.Td>
      <Table.Td>
        <PIRConfig device={device as NeoPixelObject} />
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
