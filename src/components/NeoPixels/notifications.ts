import { notifications } from '@mantine/notifications';

export const notifyPalettePresetSaved = (name: string, detail: React.ReactNode) =>
  notifications.show({
    color: 'green',
    title: `Palette preset "${name}" saved successfully`,
    message: detail,
  });

export const notifyPalettePresetSaveFailed = (detail: string) =>
  notifications.show({
    color: 'red',
    title: 'Failed to save palette preset',
    message: detail,
  });
