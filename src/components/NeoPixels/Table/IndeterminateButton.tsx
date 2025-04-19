import { useContext } from 'react';
import { Slider } from '@mantine/core';

import { NeoPixelObject } from '../interfaces';
import { PostData, postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';


const IndeterminateButton = ({
  settingName,
  Icon,
  devices,
}: {
  settingName: string;
  Icon: React.ElementType;
  devices: NeoPixelObject[];
}) => {
  const websocket = useContext(WebSocketContext);

  const handleClick = (value: string) => {
    console.log(value);
    const sendData: PostData = {
      mqtt_id: devices.map((device) => device.mqtt_id),
      name: settingName,
      value,
      device_type_name: 'neo_pixel',
    };
    if (websocket) {
      websocket.send(JSON.stringify(sendData));
    } else {
      postUpdate(sendData);
    }
  };
  
  return (
    <>
      <Slider
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.5}
        thumbSize={26}
        styles={{ thumb: { borderWidth: 2, padding: 3 } }}
        thumbChildren={<Icon size={16} />}
      />
    </>
  );
};

export default IndeterminateButton;
