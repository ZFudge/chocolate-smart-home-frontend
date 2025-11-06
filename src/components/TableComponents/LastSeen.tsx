import { TooltipWrapper } from '..';
import { HiStatusOffline, HiStatusOnline } from 'react-icons/hi';
import { DeviceObject } from '@/interfaces';
import appClasses from '../../App.module.css';
import classes from './Table.module.css';

interface LastSeenProps {
  device: DeviceObject;
}

const LastSeen = ({ device }: LastSeenProps) => {
  const Icon = device.online ? HiStatusOnline : HiStatusOffline;
  const colorClass = device.online ? 'online' : 'offline';
  return (
    <TooltipWrapper
      key={`last-seen-${device.mqtt_id}-${device.last_seen}`}
      label={`last seen ${device.last_seen}`}
    >
      <Icon
        className={`${classes[colorClass]} ${appClasses['middle-center']}`}
        style={{ borderRadius: '50%', padding: '1px' }}
      />
    </TooltipWrapper>
  );
};

export default LastSeen;
