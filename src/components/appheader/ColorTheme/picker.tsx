import type { KeyboardEventHandler } from 'react';
import { ColorPicker } from '@mantine/core';
import { APP_COLOR_OPTIONS as OPTIONS } from '@/constants';
import { useAppStore } from '@/stores';

const ColorThemePicker = () => {
  const { color, setColor } = useAppStore();

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        setColor(
          OPTIONS[(OPTIONS.indexOf(color) >= 0 ? OPTIONS.indexOf(color) : OPTIONS.length) - 1]
        );
        break;
      case 'ArrowRight':
        event.preventDefault();
        setColor(OPTIONS[OPTIONS.indexOf(color) + 1]);
        break;
      default:
        break;
    }
  };

  return (
    <ColorPicker
      format="hex"
      swatches={OPTIONS}
      value={color}
      onChange={(value) => setColor(value)}
      data-testid="app-color-theme-picker-input"
      onKeyDown={onKeyDown}
    />
  );
};

export default ColorThemePicker;
