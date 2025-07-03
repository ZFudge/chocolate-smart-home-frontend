import cx from 'clsx';
import { Button, ColorSwatch, Flex } from '@mantine/core';
import TooltipWrapper from '@/components/TooltipWrapper';
import { NeoPixelObject } from '../interfaces';
import classes from '../NeoPixel.module.css';

interface PaletteProps {
  devices: NeoPixelObject[];
  openPaletteModal: () => void;
  label: string;
}

const Palette = ({ devices, openPaletteModal, label }: PaletteProps) => {
  if (!devices || !devices.length) {
    return null;
  }
  const multiple = devices.length > 1;
  const mqttIdLabel = multiple ? 'selected' : devices[0].mqtt_id;

  return (
    <TooltipWrapper label={label}>
      <Button
        variant="transparent"
        data-testid={`${mqttIdLabel}-palette-button`}
        className={cx(classes['neo-pixel-table-palette-status'])}
        onClick={openPaletteModal}
      >
        <Flex wrap="wrap" direction="column">
          {devices[0].palette
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
