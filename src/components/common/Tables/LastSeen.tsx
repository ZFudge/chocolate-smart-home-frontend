import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi';
import { ActionIcon, Tooltip } from '@mantine/core';
import appClasses from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { DeviceObject } from '@/interfaces';
import { getLastSeenDate } from '@/lib/utils';
import classes from './Table.module.css';

const LastSeen = ({ device }: { device: DeviceObject }) => {
  const Icon = device.online ? HiStatusOnline : HiStatusOffline;
  const colorClass = device.online ? 'online' : 'offline';

  const lastSeen = getLastSeenDate(device.last_seen);

  return (
    <Tooltip label={lastSeen}>
      <ActionIcon
        variant="transparent"
        className={appClasses['theme-match']}
        style={{ cursor: 'default' }}
        size="xl"
        data-testid={`${device.mqtt_id}-last-seen-button`}
      >
        <Icon
          className={classes[colorClass]}
          style={{ borderRadius: '50%', padding: '1px' }}
          size={ICON_SIZE}
        />
      </ActionIcon>
    </Tooltip>
  );
};

export default LastSeen;
