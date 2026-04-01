import { useContext, useEffect, useState } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { ICON_SIZE, OFF_COLOR, ON_COLOR } from '@/constants';
import { IndexableObj } from '@/interfaces';
import { PostData, postUpdate } from '@/lib/api';
import { WebSocketContext } from '@/ws';

interface ToggleButtonProps {
  device: IndexableObj;
  Icon: React.ElementType;
  label: React.ReactNode;
  settingName: string;
}

const ToggleButton = ({ device, Icon, label, settingName }: ToggleButtonProps) => {
  const websocket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => setLoading(false), [device[settingName]]);

  const handleToggle = () => {
    setLoading(true);
    const data = {
      device_type_name: device.device_type_name,
      mqtt_id: device.mqtt_id,
      name: settingName,
      value: !device[settingName],
    } as PostData;
    if (websocket) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
    }
  };

  return (
    <Tooltip label={label}>
      <ActionIcon
        variant="outline"
        radius="xl"
        size="xl"
        color={device[settingName] ? ON_COLOR : OFF_COLOR}
        loading={loading}
        onClick={handleToggle}
        data-testid={`${device.mqtt_id}-${settingName}-toggle-button`}
        className={`${classes['fade-in']} ${classes['color-transition']} ${classes['theme-match']}`}
      >
        <Icon size={ICON_SIZE} />
      </ActionIcon>
    </Tooltip>
  );
};

export default ToggleButton;
