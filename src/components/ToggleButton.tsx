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
  device: { [key: string]: any } | object[];
  settingName: string;
  children?: React.ReactNode;
  label?: string;
  Icon?: React.ElementType;
  deviceTypeName?: string;
}

const ToggleButton = ({
  device,
  settingName,
  children,
  label,
  Icon,
  deviceTypeName,
}: ToggleButtonProps) => {
  const websocket = useContext(WebSocketContext);
  const multiple: boolean = Array.isArray(device);
  if (!deviceTypeName) {
    const location = useLocation();
    deviceTypeName = location.pathname.split('/').pop() || '';
  }
  let initialValue: boolean | undefined;

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setIsLoading(false), [device]);

  let color: string = ON_COLOR;
  let dataTestId: string;
  if (multiple) {
    initialValue = device.every((d: IndexableObj) => d[settingName]);
    if (initialValue) {
      color = OFF_COLOR;
    } else {
      color = ON_COLOR;
    }
    dataTestId = `all-${settingName}-toggle`;
  } else {
    color = (device as IndexableObj)[settingName] ? ON_COLOR : OFF_COLOR;
    dataTestId = `${(device as IndexableObj).mqtt_id}-${settingName}-toggle`;
    initialValue = (device as IndexableObj)[settingName];
  }

  const handleToggle = () => {
    if (!deviceTypeName) {
      alert('No device type name');
      return;
    }
    let mqttIds: number | number[];
    let newValue: boolean;

    if (Array.isArray(device)) {
      mqttIds = device.map((d: IndexableObj) => d.mqtt_id);
      const uniqueValues = Array.from(
        new Set(
          device.map((d: IndexableObj) => d[settingName])
        )
      );
      const singleValue = uniqueValues.length === 1;
      if (singleValue) {
        newValue = !uniqueValues[0];
      } else {
        if (uniqueValues.includes(true)) {
          newValue = false;
        } else {
          newValue = true;
        }
      }
    } else {
      mqttIds = device.mqtt_id;
      newValue = !device[settingName];
    }

    const data = {
      mqtt_id: mqttIds,
      name: settingName,
      device_type_name: deviceTypeName,
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
        className={classes['fade-in'] + ' ' + classes['color-transition']}
      >
        {isLoading ?
          <Loader size="0.75rem" /> :
          (Icon && <Icon />)
        }
        {children}
      </Button>
    </TooltipWrapper>
  );
};

export default ToggleButton;
