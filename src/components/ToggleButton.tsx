import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Loader } from '@mantine/core';
import classes from '@/App.module.css';
import { postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';
import { IndexableObj } from './NeoPixels/interfaces';
import TooltipWrapper from './TooltipWrapper';

const OFF_COLOR = 'red';
const ON_COLOR = 'teal';

interface ToggleButtonProps {
  devices: IndexableObj[];
  settingName: string;
  children?: React.ReactNode;
  label?: string;
  Icon?: React.ElementType;
  deviceTypeName?: string;
}

const ToggleButton = ({
  devices,
  settingName,
  children,
  label,
  Icon,
  deviceTypeName,
}: ToggleButtonProps) => {
  if (!devices || !devices.length) {
    return null;
  }

  const websocket = useContext(WebSocketContext);
  const multiple: boolean = devices.length > 1;

  let dynamicDeviceTypeName: string | undefined = deviceTypeName;
  if (!deviceTypeName) {
    const location = useLocation();
    dynamicDeviceTypeName = location.pathname.split('/').pop() || '';
  }
  let initialValue: boolean | undefined;

  const [isLoading, setIsLoading] = useState(false);

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
    let mqttIds: number | number[];
    let newValue: boolean;

    if (multiple) {
      mqttIds = devices.map((d: IndexableObj) => d.mqtt_id);
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
    } else {
      mqttIds = devices[0].mqtt_id;
      newValue = !devices[0][settingName];
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
    <TooltipWrapper label={label}>
      <Button
        onClick={handleToggle}
        color={color}
        variant="outline"
        size="xs"
        radius="lg"
        data-testid={dataTestId}
        className={`${classes['fade-in']} ${classes['color-transition']}`}
      >
        {isLoading ? <Loader size="0.75rem" /> : Icon && <Icon />}
        {children}
      </Button>
    </TooltipWrapper>
  );
};

export default ToggleButton;
