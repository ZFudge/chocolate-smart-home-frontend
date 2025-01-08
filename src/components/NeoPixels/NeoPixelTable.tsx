import { useState } from 'react';
import cx from 'clsx';
import { IconType } from 'react-icons';
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
import { JSX } from 'react/jsx-runtime';
import {
  Button,
  Checkbox,
  ColorSwatch,
  Flex,
  Popover,
  ScrollArea,
  Table,
  Text,
  Tooltip,
  TooltipProps,
} from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import ToggleButton from '@/components/ToggleButton';
import EditPaletteModal from './EditPaletteModal';
import { IndexableObj, NeoPixelObject } from './interfaces';
import SliderForm from './SliderForm';
import classes from './NeoPixel.module.css';

function Palette({
  device,
  openPaletteModal,
}: {
  device: NeoPixelObject;
  openPaletteModal: () => void;
}) {
  return (
    <Button
      variant="transparent"
      data-testid={`${device.id}-palette-button`}
      className={cx(classes['neo-pixel-table-palette-status'])}
      onClick={openPaletteModal}
    >
      <Flex wrap="wrap" direction="column">
        {device.palette
          .map((color, i) => (
            <ColorSwatch color={color} size="10" key={`${i}-${color}-${device.id}`} />
          ))
          .reduce((arr: React.ReactNode[][], v, i) => {
            const rowIndex = Math.floor(i / 3);
            if (!Array.isArray(arr[rowIndex])) {
              arr[rowIndex] = [];
            }
            arr[rowIndex].push(v);
            return arr;
          }, [])
          .map((row, i) => (
            <Flex key={`${device.id}-${i}-pallete-span`}>{row}</Flex>
          ))}
      </Flex>
    </Button>
  );
}

function SplitTableCell({
  children,
  Icon,
  value,
}: {
  children?: React.ReactNode;
  Icon: IconType;
  value: string | number;
}) {
  return (
    <Flex columnGap={5} justify="flex-end" align="center" direction="row-reverse">
      {value && <Text ta="right">{value}</Text>}
      <Icon />
      {children}
    </Flex>
  );
}

function PopoverSlider(
  props: JSX.IntrinsicAttributes & {
    children?: React.ReactNode;
    Icon: IconType;
    device: IndexableObj;
    name: string;
  }
) {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button
          onClick={open}
          variant="transparent"
          className={cx(classes['split-button'])}
          data-testid={`${props.device.id}-${props.name}-slider-button`}
        >
          <SplitTableCell {...props} value={props.device[props.name]} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={ref}>
        <SliderForm name={props.name} device={props.device} close={close} Icon={props.Icon} />
      </Popover.Dropdown>
    </Popover>
  );
}

const CustomComponentTooltipWrapper = (props: TooltipProps) => {
  /* Wraps custom components in nested span tag to prevent ref error
  https://mantine.dev/core/tooltip/#tooltip-children */
  return (
    <Tooltip {...props}>
      <span>{props.children}</span>
    </Tooltip>
  );
};

const NeoPixelTableRow = ({
  device,
  selected,
  toggleRow,
  openPaletteModal,
}: {
  device: NeoPixelObject;
  selected: boolean;
  toggleRow: (id: number) => void;
  openPaletteModal: () => void;
}) => {
  return (
    <Table.Tr className={cx({ [classes.rowSelected]: selected })} data-testid={`${device.id}-tr`}>
      {[
        <Checkbox
          checked={selected}
          onChange={() => toggleRow(device.id)}
          data-testid={`${device.id}-checkbox`}
        />,
        <SplitTableCell
          value={device.name}
          Icon={device.online ? HiStatusOnline : HiStatusOffline}
        />,
        <CustomComponentTooltipWrapper label="Toggle Power">
          <ToggleButton device={device} lookupName="on">
            <FaPowerOff />
          </ToggleButton>
        </CustomComponentTooltipWrapper>,
        <CustomComponentTooltipWrapper label="Update Palette">
          <Palette device={device} openPaletteModal={openPaletteModal} />
        </CustomComponentTooltipWrapper>,
        <CustomComponentTooltipWrapper label="Toggle Twinkle">
          <ToggleButton device={device} lookupName="twinkle">
            {device.twinkle ? <IoSparklesSharp /> : <IoSparklesOutline />}
          </ToggleButton>
        </CustomComponentTooltipWrapper>,
        <CustomComponentTooltipWrapper label="Toggle Transform">
          <ToggleButton device={device} lookupName="transform">
            {device.transform ? <GiTransform /> : <GiTransform />}
          </ToggleButton>
        </CustomComponentTooltipWrapper>,
        <CustomComponentTooltipWrapper label="Set Milliseconds">
          <PopoverSlider name="ms" device={device} Icon={IoSpeedometerOutline} />
        </CustomComponentTooltipWrapper>,
        <CustomComponentTooltipWrapper label="Set Brightness">
          <PopoverSlider name="brightness" device={device} Icon={BsBrightnessHigh} />
        </CustomComponentTooltipWrapper>,
        <SplitTableCell value={device.space} Icon={IoLocationOutline} />,
      ].map((tableCell, i) => (
        <Table.Td key={`td-${i}-${device.id}`}>{tableCell}</Table.Td>
      ))}
    </Table.Tr>
  );
};

export interface NeoPixelTableProps {
  /** Device data */
  neoPixelData: NeoPixelObject[];
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary component for Neo Pixel user interaction */
export default function NeoPixelTable({ neoPixelData }: NeoPixelTableProps) {
  const [selection, setSelection] = useState<number[]>([]);
  const [editPaletteDevice, setEditPaletteDevice] = useState<NeoPixelObject | null>(null);

  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  return (
    <ScrollArea>
      <Flex className={classes.flexTable}>
        <Table withTableBorder className={classes['mantine-Table-table']}>
          <Table.Tbody>
            {neoPixelData.map((device: NeoPixelObject, i) => (
              <NeoPixelTableRow
                key={`${device.id}-${i}-tr`}
                selected={selection.includes(device.id)}
                openPaletteModal={() => setEditPaletteDevice(device)}
                {...{ device, toggleRow }}
              />
            ))}
          </Table.Tbody>
        </Table>
        {editPaletteDevice && (
          <EditPaletteModal
            presetOptions={[]}
            device={editPaletteDevice}
            close={() => setEditPaletteDevice(null)}
          />
        )}
      </Flex>
    </ScrollArea>
  );
}
