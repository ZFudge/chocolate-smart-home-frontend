import { notifications } from '@mantine/notifications';
import { DeviceObject } from '@/interfaces';

export const notifySyncRequestStarted = () =>
  notifications.show({
    color: 'green',
    title: 'Device data synchronization started',
    message: 'Request for synchronization was successfully broadcasted to client devices.',
  });

export const notifySyncRequestFailed = () =>
  notifications.show({
    color: 'red',
    title: 'Failed to synchronize device data',
    message: 'An error occurred while broadcasting the synchronization request.',
  });

export const notifyTagsSaveFailed = (device: DeviceObject) =>
  notifications.show({
    color: 'red',
    title: 'Failed to save tags',
    message: `Failed to save tags for ${device.name}`,
  });

export const notifyTagsSaved = (device: DeviceObject) =>
  notifications.show({
    color: 'green',
    title: 'Tags saved',
    message: `Tags for ${device.name} were saved successfully`,
  });

export const notifyDeviceNameChanged = (device: DeviceObject, value: string) =>
  notifications.show({
    title: 'Device name changed',
    message: `Device name was changed from "${device.name}" to "${value}"`,
  });

export const notifyDeviceNameChangeFailed = (device: DeviceObject, value: string) =>
  notifications.show({
    color: 'red',
    title: 'Failed to change device name',
    message: `Failed to change device name from "${device.name}" to "${value}"`,
  });

export const notifyTagCreationFailed = (tagName: string) =>
  notifications.show({
    color: 'red',
    title: 'Tag creation failed',
    message: `Tag "${tagName}" was not created`,
  });

export const notifyTagCreated = (tagName: string) =>
  notifications.show({
    color: 'green',
    title: 'Tag created',
    message: `Tag "${tagName}" was created successfully`,
  });

export const notifyTagUpdated = (tagName: string) =>
  notifications.show({
    color: 'green',
    title: 'Tag updated',
    message: `Tag "${tagName}" was updated successfully`,
  });

export const notifyTagUpdateFailed = (tagName: string) =>
  notifications.show({
    color: 'red',
    title: 'Tag update failed',
    message: `Tag "${tagName}" was not updated`,
  });

export const notifyDeviceTypeNameMissing = () =>
  notifications.show({
    color: 'red',
    title: 'Device type name missing',
    message: 'Device type name is missing',
  });
