import cx from 'clsx';
import { ActionIcon, Tooltip } from '@mantine/core';
import { NeoPixelObject } from '../interfaces';
import Palette3x3 from '../Palette3x3';
import useNeoPixelStore from '../useNeoPixelStore';
import classes from '../NeoPixel.module.css';

const Palette = ({ device }: { device: NeoPixelObject }) => {
  const { setSelectedPaletteDevices } = useNeoPixelStore();

  return (
    <Tooltip label="Update Palette">
      <ActionIcon
        variant="transparent"
        size="xl"
        data-testid={`${device.mqtt_id}-palette-button`}
        className={cx(classes['neo-pixel-table-palette-status'])}
        onClick={() => setSelectedPaletteDevices(device.mqtt_id)}
      >
        <Palette3x3 palette={device.palette} mqttIdLabel={device.mqtt_id.toString()} />
      </ActionIcon>
    </Tooltip>
  );
};

export default Palette;
