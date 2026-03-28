import { FaSyncAlt } from 'react-icons/fa';
import { Button, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { notifySyncRequestFailed, notifySyncRequestStarted } from '@/lib/notifications';

const SyncDeviceDataButton = () => {
  const onClick = async () => {
    const response = await fetch('/api/device/broadcast_request_devices_state/', {
      method: 'HEAD',
    });
    if (!response.ok) {
      console.error(response.statusText);
      notifySyncRequestFailed();
      return;
    }
    notifySyncRequestStarted();
  };

  return (
    <Tooltip label="Synchronize device data">
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
    </Tooltip>
  );
};

export default SyncDeviceDataButton;
