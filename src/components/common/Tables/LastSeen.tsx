import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi';
import { ActionIcon, Tooltip } from '@mantine/core';
import appClasses from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { DeviceObject } from '@/interfaces';
import classes from './Table.module.css';

interface LastSeenProps {
  device: DeviceObject;
}

const LastSeen = ({ device }: LastSeenProps) => {
  const Icon = device.online ? HiStatusOnline : HiStatusOffline;
  const colorClass = device.online ? 'online' : 'offline';

  return (
    <Tooltip label={`last seen ${device.last_seen}`}>
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
