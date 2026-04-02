import { BsFillPaletteFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { IoIosTime } from 'react-icons/io';
import { IoSparklesOutline, IoSparklesSharp } from 'react-icons/io5';
import { MdSunny } from 'react-icons/md';
import { Checkbox, Flex, Table, Text } from '@mantine/core';
import { DeviceName, DeviceSettings, LastSeen, ToggleButton } from '@/components';
import { DeviceTags } from '@/components/common/Tables';
import { ICON_SIZE } from '@/constants';
import { DeviceObject } from '@/interfaces';
import { boolToOnOff, getBorderColor, getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { NeoPixelObject } from '../interfaces';
import useNeoPixelStore from '../useNeoPixelStore';
import Palette from './Palette';
import PIRConfig from './pir/PIRConfig';
import PopoverSlider from './PopoverSlider';
import classes from '../NeoPixel.module.css';

const TableRow = ({ device }: { device: NeoPixelObject }) => {
  const { color } = useAppStore();
  const { selectedDevices, toggleDevice } = useNeoPixelStore();
  const selected = selectedDevices.includes(device.mqtt_id);

  return (
    <Table.Tr
      data-testid={`${device.mqtt_id}-tr`}
      style={{ backgroundColor: selected ? getBorderColor(color) : 'transparent', height: '5rem' }}
    >
      <Table.Td>
        <Checkbox
          checked={selected}
          onChange={() => device.mqtt_id !== undefined && toggleDevice(device.mqtt_id)}
          data-testid={`${device.mqtt_id}-tr-checkbox`}
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
          settingName="On"
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
          settingName="Twinkle"
          label={<Text>Twinkle is {boolToOnOff(device.twinkle)}</Text>}
          Icon={device.twinkle ? IoSparklesSharp : IoSparklesOutline}
        />
      </Table.Td>
      <Table.Td>
        <ToggleButton
          device={device}
          settingName="Transform"
          label={<Text>Transform is {boolToOnOff(device.transform)}</Text>}
          Icon={GiTransform}
        />
      </Table.Td>
      <Table.Td ta="center">
        <PopoverSlider device={device} name="Brightness" Icon={MdSunny} />
      </Table.Td>
      <Table.Td ta="center">
        <PopoverSlider device={device} name="MS" Icon={IoIosTime} />
      </Table.Td>
      <Table.Td>
        <PIRConfig device={device as NeoPixelObject} />
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
