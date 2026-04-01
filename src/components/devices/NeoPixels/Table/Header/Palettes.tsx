import cx from 'clsx';
import { ActionIcon, Tooltip } from '@mantine/core';
import Palette3x3 from '../../Palette3x3';
import useNeoPixelStore from '../../useNeoPixelStore';
import classes from '../../NeoPixel.module.css';

const Palettes = () => {
  const { neoPixelDevices, selectedDevices, setSelectedPaletteDevices } = useNeoPixelStore();
  if (selectedDevices.length < 2) {
    return null;
  }
  const devices = selectedDevices.map((mqtt_id) => neoPixelDevices[mqtt_id]);

  return (
    <Tooltip label="Update Palette">
      <ActionIcon
        variant="transparent"
        size="xl"
        data-testid="header-palette-button"
        className={cx(classes['neo-pixel-table-palette-status'])}
        onClick={() => setSelectedPaletteDevices(selectedDevices)}
      >
        <Palette3x3 palette={devices[0].palette} mqttIdLabel="selected" />
      </ActionIcon>
    </Tooltip>
  );
};

export default Palettes;
