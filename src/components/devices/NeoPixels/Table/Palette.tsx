import cx from 'clsx';
import { ActionIcon, Tooltip } from '@mantine/core';
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
    <Tooltip label={label}>
      <ActionIcon
        variant="transparent"
        size="xl"
        data-testid={`${mqttIdLabel}-palette-button`}
        className={cx(classes['neo-pixel-table-palette-status'])}
        onClick={openPaletteModal}
      >
        <Palette3x3 palette={devices[0].palette} mqttIdLabel={mqttIdLabel} />
      </ActionIcon>
    </Tooltip>
  );
};

export default Palette;
