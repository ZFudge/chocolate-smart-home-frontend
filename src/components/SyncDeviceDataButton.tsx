import { FaSyncAlt } from 'react-icons/fa';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import TooltipWrapper from './TooltipWrapper';

const SyncDeviceDataButton = () => {
  const onClick = async () => {
    const response = await fetch('/api/device/broadcast_request_devices_state/', {
      method: 'HEAD',
    });
    if (!response.ok) {
      console.error(response.statusText);
      notifications.show({
        color: 'red',
        title: 'Failed to synchronize device data',
        message: 'An error occurred while broadcasting the synchronization request.',
      });
      return;
    }
    notifications.show({
      color: 'green',
      title: 'Device data synchronization started',
      message: 'Request for synchronization was successfully broadcasted to client devices.',
    });
  };

  return (
    <TooltipWrapper label="Synchronize device data">
      <Button
        m="auto"
        variant="transparent"
        style={{ padding: '0.125rem' }}
        className={classes['cursor-pointer']}
        data-testid="devices-sync-data-button"
        color="gray"
        onClick={onClick}
      >
        <FaSyncAlt size={ICON_SIZE} />
      </Button>
    </TooltipWrapper>
  );
};

export default SyncDeviceDataButton;
