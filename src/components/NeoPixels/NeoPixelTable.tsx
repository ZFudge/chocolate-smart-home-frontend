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
import { ColorSwatch, Flex, ScrollArea, Table, Text } from '@mantine/core';
import { ToggleButton } from '@/components/ToggleButton';
import NeoPixelObject from './NeoPixelObject';
import classes from './NeoPixel.module.css';

type FlexDirection = 'row-reverse' | undefined;

function Palette({ device }: { device: NeoPixelObject }) {
  return (
    <Flex wrap="wrap" direction="column">
      {device.palette
        .map((color, i) => (
          <ColorSwatch color={color} size="10" key={`${i}-${device.id}-${color}`} />
        ))
        .reduce((arr: React.ReactNode[][], v, i) => {
          const rowIndex = Math.floor(i / 3);
          if (!Array.isArray(arr[rowIndex])) {
            arr[rowIndex] = [];
          }
          arr[rowIndex].push(v);
          return arr;
        }, [])
        .map((c, i) => (
          <Flex key={`${i}-${device.id}-pallete-span`}>{c}</Flex>
        ))}
    </Flex>
  );
}

function SplitTableCell({
  children,
  direction,
  Icon,
  text,
}: {
  children?: React.ReactNode;
  direction?: FlexDirection | undefined;
  Icon: IconType;
  text: string | number;
}) {
  return (
    <Flex columnGap={5} justify="flex-end" align="center" direction={direction}>
      {text && <Text ta="right">{text}</Text>}
      <Icon />
      {children}
    </Flex>
  );
}

const NeoPixelTableRow = ({
  device,
  selected,
  toggleRow,
}: {
  device: NeoPixelObject;
  selected: boolean;
  toggleRow: (id: number) => void;
}) => {
  return (
    <Table.Tr
      className={cx({ [classes.rowSelected]: selected })}
      onClick={() => toggleRow(device.id)}
      data-testid={`${device.id}-tr`}
    >
      {[
        <SplitTableCell
          direction="row-reverse"
          text={device.name}
          Icon={device.online ? HiStatusOnline : HiStatusOffline}
        />,
        <ToggleButton device={device} lookupName="on">
          <FaPowerOff />
        </ToggleButton>,
        <Palette device={device} />,
        <ToggleButton device={device} lookupName="twinkle">
          {device.twinkle ? <IoSparklesSharp /> : <IoSparklesOutline />}
        </ToggleButton>,
        <ToggleButton device={device} lookupName="transform">
          {device.transform ? <GiTransform /> : <GiTransform />}
        </ToggleButton>,
        <SplitTableCell text={device.ms} Icon={IoSpeedometerOutline} />,
        <SplitTableCell text={device.brightness} Icon={BsBrightnessHigh} />,
        <SplitTableCell text={device.space} Icon={IoLocationOutline} />,
      ].map((c, i) => (
        <Table.Td key={`${i}`}>{c}</Table.Td>
      ))}
    </Table.Tr>
  );
};

export default function NeoPixelTable({ data }: { data: NeoPixelObject[] }) {
  const [selection, setSelection] = useState<number[]>([]);
  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  // const toggleAll = () =>
  //   setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  return (
    <ScrollArea>
      <Flex className={classes.flexTable}>
        <Table withTableBorder className={classes['mantine-Table-table']}>
          <Table.Tbody>
            {data.map((device: NeoPixelObject, i) => (
              <NeoPixelTableRow
                key={`${i}-tr-${device.id}`}
                selected={selection.includes(device.id)}
                {...{ device, toggleRow }}
              />
            ))}
          </Table.Tbody>
        </Table>
      </Flex>
    </ScrollArea>
  );
}
