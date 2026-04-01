import { notifications } from '@mantine/notifications';
import { PalettePresetData } from '../../interfaces';

export const getPresets = async (setPresets: (presets: PalettePresetData[]) => void) =>
  fetch('/api/neo_pixel/palettes/').then(async (resp) => {
    if (!resp.ok) {
      console.error(resp.statusText);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch palette presets',
        color: 'red',
      });
      return [];
    }
    const data = await resp.json();
    setPresets(data as unknown as PalettePresetData[]);
  });
