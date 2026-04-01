import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ActionIcon, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { ICON_SIZE, OFF_COLOR, ON_COLOR } from '@/constants';
import { IndexableObj } from '@/interfaces';
import { postUpdate } from '@/lib/api';
import { WebSocketContext } from '@/ws';

interface ToggleButtonMultipleProps {
  devices: IndexableObj[];
  settingName: string;
  label: React.ReactNode;
  Icon: React.ElementType;
  deviceTypeName?: string;
}

const ToggleButtonMultiple = ({
  devices,
  settingName,
  label,
  Icon,
  deviceTypeName,
}: ToggleButtonMultipleProps) => {
  const websocket = useContext(WebSocketContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!devices || !devices.length) {
    return null;
  }

  const multiple: boolean = devices.length > 1;

  let dynamicDeviceTypeName: string | undefined = deviceTypeName;
  if (!deviceTypeName) {
    const location = useLocation();
    dynamicDeviceTypeName = location.pathname.split('/').pop() || '';
  }
  let initialValue: boolean | undefined;

  useEffect(() => setIsLoading(false), [devices]);

  let color: string = ON_COLOR;
  let dataTestId: string;
  if (multiple) {
    initialValue = devices.every((d: IndexableObj) => d[settingName]);
    if (initialValue) {
      color = OFF_COLOR;
    } else {
      color = ON_COLOR;
    }
    dataTestId = `all-${settingName}-toggle`;
  } else {
    color = (devices[0] as IndexableObj)[settingName] ? ON_COLOR : OFF_COLOR;
    dataTestId = `${(devices[0] as IndexableObj).mqtt_id}-${settingName}-toggle`;
    initialValue = (devices[0] as IndexableObj)[settingName];
  }

  const handleToggle = () => {
    if (!dynamicDeviceTypeName) {
      alert('No device type name'); // eslint-disable-line no-alert
      return;
    }
    let newValue: boolean;

    const mqttIds: number[] = devices.map((d: IndexableObj) => d.mqtt_id);
    const uniqueValues = Array.from(new Set(devices.map((d: IndexableObj) => d[settingName])));
    const singleValue = uniqueValues.length === 1;
    if (singleValue) {
      newValue = !uniqueValues[0];
    } else {
      newValue = true;
      if (uniqueValues.includes(true)) {
        newValue = false;
      }
    }

    const data = {
      mqtt_id: mqttIds,
      name: settingName,
      device_type_name: dynamicDeviceTypeName,
      value: newValue,
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
        size="xl"
        onClick={handleToggle}
        color={color}
        variant="outline"
        radius="md"
        data-testid={dataTestId}
        loading={isLoading}
        className={`${classes['fade-in']} ${classes['color-transition']} ${classes['theme-match']}`}
      >
        <Icon size={ICON_SIZE} />
      </ActionIcon>
    </Tooltip>
  );
};

export default ToggleButtonMultiple;
