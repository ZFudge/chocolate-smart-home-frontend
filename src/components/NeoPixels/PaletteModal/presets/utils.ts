import { notifications } from '@mantine/notifications';
import { PalettePresetData } from '../../interfaces';

export const getPresets = async (setPresets: (presets: PalettePresetData[]) => void) => {
  const resp = await fetch('/api/neo_pixel/palettes/').then((resp) => {
    if (!resp.ok) {
      console.error(resp.statusText);
      notifications.show({
        title: 'Error',
        message: 'Failed to fetch palette presets',
        color: 'red',
      });
      return [];
    }
    return resp.json();
  });
  const data = await resp;
  setPresets(data as unknown as PalettePresetData[]);
};
