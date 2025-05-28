import cx from 'clsx';
import { Button, ColorSwatch, Flex } from '@mantine/core';

import classes from '../NeoPixel.module.css';
import { NeoPixelObject } from '../interfaces';
import TooltipWrapper from '@/components/TooltipWrapper';

interface PaletteProps {
  device: NeoPixelObject | NeoPixelObject[];
  openPaletteModal: () => void;
  label: string;
}

const Palette = ({
  device,
  openPaletteModal,
  label,
}: PaletteProps) => {
  if (!device || (Array.isArray(device) && !device.length)) return <></>;
  const multiple = Array.isArray(device);
  const mqttIdLabel = multiple ? 'selected' : device.mqtt_id;

  return (
    <TooltipWrapper label={label}>
      <Button
        variant="transparent"
        data-testid={`${mqttIdLabel}-palette-button`}
        className={cx(classes['neo-pixel-table-palette-status'])}
        onClick={openPaletteModal}
      >
        <Flex wrap="wrap" direction="column">
          {(multiple ? device[0].palette : device.palette)
            .map((color: string, i: number) => (
              <ColorSwatch color={color} size="10" key={`${i}-${color}-${mqttIdLabel}`} />
            ))
            .reduce((arr: React.ReactNode[][], v: React.ReactNode, i: number) => {
              const rowIndex = Math.floor(i / 3);
              if (!Array.isArray(arr[rowIndex])) {
                arr[rowIndex] = [];
              }
              arr[rowIndex].push(v);
              return arr;
            }, [])
            .map((row: React.ReactNode, i: number) => (
              <Flex key={`${mqttIdLabel}-${i}-pallete-span`}>{row}</Flex>
            ))}
        </Flex>
      </Button>
    </TooltipWrapper>
  );
};

export default Palette;
