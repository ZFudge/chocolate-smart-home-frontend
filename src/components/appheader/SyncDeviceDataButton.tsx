import { FaSyncAlt } from 'react-icons/fa';
import { ActionIcon, Tooltip } from '@mantine/core';
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
    <Tooltip label="Sync Device Data">
      <ActionIcon
        variant="transparent"
        data-testid="sync-data-button"
        color="gray"
        size="xl"
        onClick={onClick}
      >
        <FaSyncAlt size={ICON_SIZE} />
      </ActionIcon>
    </Tooltip>
  );
};

export default SyncDeviceDataButton;
