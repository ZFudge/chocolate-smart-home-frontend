import { notifications } from '@mantine/notifications';
import { DeviceObject } from '@/interfaces';
import { LeonardoCommand } from './types';

export const notifyLeonardoCommandSent = (command: LeonardoCommand, device: DeviceObject) =>
  notifications.show({
    color: 'green',
    title: 'Command sent',
    message: `Leonardo command "${command}" sent to "${device.name}" successfully`,
  });
