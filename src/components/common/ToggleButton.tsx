import { useContext, useEffect, useState } from 'react';
import { ActionIcon, Tooltip } from '@mantine/core';
import classes from '@/App.module.css';
import { ICON_SIZE, OFF_COLOR, ON_COLOR } from '@/constants';
import { IndexableObj } from '@/interfaces';
import { PostData, postUpdate } from '@/lib/api';
import { WebSocketContext } from '@/ws';

interface ToggleButtonProps {
  device: IndexableObj;
  indexableObject?: IndexableObj;
  Icon: React.ElementType;
  label: React.ReactNode;
  settingName: string;
}

const ToggleButton = ({ device, indexableObject, Icon, label, settingName }: ToggleButtonProps) => {
  const websocket = useContext(WebSocketContext);
  const [loading, setLoading] = useState(false);

  const getValue = () =>
    indexableObject
      ? indexableObject[settingName.toLowerCase()]
      : device[settingName.toLowerCase()];
  useEffect(() => setLoading(false), [getValue()]);

  const handleToggle = (resendCurrentValue = false) => {
    setLoading(true);
    const data = {
      device_type_name: device.device_type_name,
      mqtt_id: device.mqtt_id,
      name: settingName.toLowerCase(),
      value: resendCurrentValue ? getValue() : !getValue(),
    } as PostData;
    if (websocket) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
    }
  };

  let mouseDown: boolean = false;
  let mouseDownHeldPastThreshold: boolean = false;
  return (
    <Tooltip label={label}>
      <ActionIcon
        variant="outline"
        radius="xl"
        size="xl"
        onMouseDown={() => {
          mouseDown = true;
          setTimeout(() => {
            if (!mouseDown) {
              return;
            }
            // Resend the current value to the controller.
            // This is useful when a controller's current state is not being published,
            // but the controller is still connected to the network and is receiving messages. */
            handleToggle(true);
            mouseDownHeldPastThreshold = true;
          }, 2000);
        }}
        onMouseUp={() => {
          if (!mouseDownHeldPastThreshold) {
            handleToggle();
          }
          mouseDownHeldPastThreshold = false;
          mouseDown = false;
        }}
        color={getValue() ? ON_COLOR : OFF_COLOR}
        data-testid={`${device.mqtt_id}-${settingName.toLowerCase()}-toggle-button`}
        loading={loading}
        className={`${classes['fade-in']} ${classes['color-transition']} ${classes['theme-match']}`}
      >
        <Icon size={ICON_SIZE} />
      </ActionIcon>
    </Tooltip>
  );
};

export default ToggleButton;
