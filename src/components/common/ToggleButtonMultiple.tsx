import { useContext, useEffect, useState } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { ICON_SIZE, OFF_COLOR, ON_COLOR } from '@/constants';
import { IndexableObj } from '@/interfaces';
import { postUpdate } from '@/lib/api';
import { WebSocketContext } from '@/ws';

interface ToggleButtonMultipleProps {
  devices: IndexableObj[];
  indexableObject?: IndexableObj;
  settingName: string;
  label: React.ReactNode;
  Icon: React.ElementType;
  deviceTypeName: string;
}

const ToggleButtonMultiple = ({
  devices,
  indexableObject,
  settingName,
  label,
  Icon,
  deviceTypeName,
}: ToggleButtonMultipleProps) => {
  const websocket = useContext(WebSocketContext);
  const [isLoading, setIsLoading] = useState(false);

  const getValue = () =>
    indexableObject
      ? indexableObject[settingName.toLowerCase()]
      : devices[0][settingName.toLowerCase()];

  useEffect(() => setIsLoading(false), [getValue()]);

  if (!devices || !devices.length) {
    return null;
  }

  useEffect(() => setIsLoading(false), [getValue()]);

  const handleToggle = () => {
    const data = {
      mqtt_id: devices.map((d: IndexableObj) => d.mqtt_id),
      name: settingName,
      device_type_name: deviceTypeName,
      value: !getValue(),
    };
    if (websocket) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
    }
    setIsLoading(true);
  };

  return (
    <Tooltip label={label}>
      <ActionIcon
        variant="outline"
        radius="md"
        size="xl"
        onClick={handleToggle}
        color={getValue() ? ON_COLOR : OFF_COLOR}
        data-testid={`multiple-devices-${settingName.toLowerCase()}-toggle-button`}
        loading={isLoading}
        className={`${classes['fade-in']} ${classes['color-transition']} ${classes['theme-match']}`}
      >
        <Icon size={ICON_SIZE} />
      </ActionIcon>
    </Tooltip>
  );
};

export default ToggleButtonMultiple;
