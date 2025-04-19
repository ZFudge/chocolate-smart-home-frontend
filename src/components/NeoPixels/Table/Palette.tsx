import cx from 'clsx';
import { Button, ColorSwatch, Flex } from '@mantine/core';

import classes from '../NeoPixel.module.css';
import { NeoPixelObject } from '../interfaces';

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
      data-testid={`${device.mqtt_id}-palette-button`}
      className={cx(classes['neo-pixel-table-palette-status'])}
      onClick={openPaletteModal}
    >
      <Flex wrap="wrap" direction="column">
        {device.palette
          .map((color, i) => (
            <ColorSwatch color={color} size="10" key={`${i}-${color}-${device.mqtt_id}`} />
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
            <Flex key={`${device.mqtt_id}-${i}-pallete-span`}>{row}</Flex>
          ))}
      </Flex>
    </Button>
  );
}

export default Palette;
