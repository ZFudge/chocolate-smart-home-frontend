import { useContext } from 'react';
import { Button } from '@mantine/core';

import { postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';
import { IndexableObj } from './NeoPixels/interfaces';
import TooltipWrapper from './TooltipWrapper';
import classes from './NeoPixels/NeoPixel.module.css';

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

  let color: string = 'teal';
  let dataTestId: string;
  if (multiple) {
    const allTrue = device.every((d: IndexableObj) => d[settingName]);
    const allFalse = device.every((d: IndexableObj) => !d[settingName]);
    if (allTrue) {
      color = 'red';
    } else if (allFalse) {
      color = 'teal';
    }
    dataTestId = `all-${settingName}-toggle`;
  } else {
    color = (device as IndexableObj)[settingName] ? 'teal' : 'gray';
    dataTestId = `${(device as IndexableObj).mqtt_id}-${settingName}-toggle`;
  }

  const toggleSetting = () => {
    let mqttIds: number | number[];
    let newValue: boolean;
    let deviceTypeName: string;

    if (Array.isArray(device)) {
      deviceTypeName = device[0].device_type_name;
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
      deviceTypeName = device.device_type_name;
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
        className={classes['fade-in']}
      >
        {Icon && <Icon />}
        {children}
      </Button>
    </TooltipWrapper>
  );
};

export default ToggleButton;
