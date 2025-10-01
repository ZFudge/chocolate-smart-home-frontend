import cx from 'clsx';
import { Button, Flex } from '@mantine/core';
import TooltipWrapper from '@/components/TooltipWrapper';
import { NeoPixelObject } from '../interfaces';
import Palette3x3 from '../Palette3x3';
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
  const mqttIdLabel = multiple ? 'selected' : devices[0].mqtt_id.toString();

  return (
    <TooltipWrapper label={label}>
      <Button
        variant="transparent"
        data-testid={`${mqttIdLabel}-palette-button`}
        className={cx(classes['neo-pixel-table-palette-status'])}
        onClick={openPaletteModal}
      >
        <Flex wrap="wrap" direction="column">
          <Palette3x3 palette={devices[0].palette} mqttIdLabel={mqttIdLabel} />
        </Flex>
      </Button>
    </TooltipWrapper>
  );
};

export default Palette;
