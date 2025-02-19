import { useContext } from 'react';
import { Button } from '@mantine/core';
import { postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';

function ToggleButton({
  device,
  lookupName,
  children,
}: {
  device: { [key: string]: any };
  lookupName: string;
  children?: React.ReactNode;
}) {
  const websocket = useContext(WebSocketContext);

  const toggleSetting = () => {
    const newValue = !device[lookupName];
    const data = {
      mqtt_id: [device.mqtt_id],
      name: lookupName,
      device_type_name: device.device_type_name,
      value: newValue,
    };
    if (websocket) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
    }
  };

  return (
    <Button
      onClick={toggleSetting}
      color={device[lookupName] ? 'teal' : 'gray'}
      variant="outline"
      size="xs"
      radius="lg"
      data-testid={`${device.mqtt_id}-${lookupName}-toggle`}
    >
      {children}
    </Button>
  );
}

export default ToggleButton;
