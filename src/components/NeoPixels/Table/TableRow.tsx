import cx from 'clsx';
import { BsBrightnessHigh, BsFillPaletteFill } from 'react-icons/bs';
import { FaPowerOff } from 'react-icons/fa';
import { GiTransform } from 'react-icons/gi';
import { IoSparklesOutline, IoSparklesSharp, IoSpeedometerOutline } from 'react-icons/io5';
import { Checkbox, Table } from '@mantine/core';
import { TagsCell, ToggleButton } from '@/components';
import DeviceName from '@/components/DeviceName';
import CellContainer from '@/components/TableComponents/CellContainer';
import DeviceSettings from '@/components/TableComponents/DeviceSettings';
import LastSeen from '@/components/TableComponents/LastSeen';
import { DeviceObject } from '@/interfaces';
import { boolToOnOff } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { NeoPixelObject } from '../interfaces';
import Palette from './Palette';
import PopoverPIRConfig from './PopoverPIRConfig';
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
      style={{ backgroundColor: selected ? `${color}99` : 'transparent', height: '5rem' }}
    >
      <Table.Td className={classes.tableCell}>
        <Checkbox
          checked={selected}
          onChange={() => device.mqtt_id !== undefined && toggleRow(device.mqtt_id)}
          data-testid={`${device.mqtt_id}-checkbox`}
          color={color}
          styles={{
            input: {
              border: `0.5px solid ${color}`,
            },
          }}
        />
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <DeviceSettings device={device as unknown as DeviceObject} />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <TagsCell device={device as unknown as DeviceObject} />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <LastSeen device={device} />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <DeviceName device={device as unknown as DeviceObject} />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <ToggleButton
            devices={[device]}
            deviceTypeName="neo_pixel"
            settingName="on"
            label={`power is ${boolToOnOff(device.on)}`}
            Icon={FaPowerOff}
          />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <Palette devices={[device]} openPaletteModal={openPaletteModal} label="Update Palette" />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <ToggleButton
            devices={[device]}
            deviceTypeName="neo_pixel"
            settingName="scheduled_palette_rotation"
            label={`palette rotation ${device.scheduled ? '' : 'not'} scheduled`}
            Icon={BsFillPaletteFill}
          />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <ToggleButton
            devices={[device]}
            deviceTypeName="neo_pixel"
            settingName="twinkle"
            label={`twinkle is ${boolToOnOff(device.twinkle)}`}
            Icon={device.twinkle ? IoSparklesSharp : IoSparklesOutline}
          />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <ToggleButton
            devices={[device]}
            deviceTypeName="neo_pixel"
            settingName="transform"
            label={`transform is ${boolToOnOff(device.transform)}`}
            Icon={GiTransform}
          />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <PopoverSlider
            devices={[device]}
            deviceTypeName="neo_pixel"
            label="adjust brightness"
            name="brightness"
            Icon={BsBrightnessHigh}
          />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <PopoverSlider
            devices={[device]}
            deviceTypeName="neo_pixel"
            label="adjust speed"
            name="ms"
            Icon={IoSpeedometerOutline}
          />
        </CellContainer>
      </Table.Td>
      <Table.Td className={classes.tableCell}>
        <CellContainer>
          <PopoverPIRConfig devices={[device]} />
        </CellContainer>
      </Table.Td>
    </Table.Tr>
  );
};

export default TableRow;
