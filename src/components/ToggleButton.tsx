import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Loader } from '@mantine/core';

import { postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';
import { IndexableObj } from './NeoPixels/interfaces';
import TooltipWrapper from './TooltipWrapper';
import classes from '@/App.module.css';

interface ToggleButtonProps {
  device: { [key: string]: any } | object[];
  settingName: string;
  children?: React.ReactNode;
  label?: string;
  Icon?: React.ElementType;
}

const ToggleButton = ({
  device,
  settingName,
  children,
  label,
  Icon,
}: ToggleButtonProps) => {
  const websocket = useContext(WebSocketContext);
  const multiple: boolean = Array.isArray(device);
  const location = useLocation();
  const deviceTypeName = location.pathname.split('/').pop() || '';
  let initialValue: boolean | undefined;

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setIsLoading(false), [device]);

  let color: string = 'teal';
  let dataTestId: string;
  if (multiple) {
    initialValue = device.every((d: IndexableObj) => d[settingName]);
    if (initialValue) {
      color = 'red';
    } else {
      color = 'teal';
    }
    dataTestId = `all-${settingName}-toggle`;
  } else {
    color = (device as IndexableObj)[settingName] ? 'teal' : 'gray';
    dataTestId = `${(device as IndexableObj).mqtt_id}-${settingName}-toggle`;
    initialValue = (device as IndexableObj)[settingName];
  }

  const toggleSetting = () => {
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
        onClick={toggleSetting}
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
