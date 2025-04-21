import { useContext, useState } from 'react';
import { Slider } from '@mantine/core';

import { PostData, postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';
import TooltipWrapper from '@/components/TooltipWrapper';


const IndeterminateButton = ({
  settingName,
  Icon,
  selection,
  label,
}: {
  settingName: string;
  Icon: React.ElementType;
  selection: number[];
  label: string;
}) => {
  const websocket = useContext(WebSocketContext);
  const [sent, setSent] = useState(false);

  const handleChange = (value: number) => {
    if (value === 0.5 || sent) {
      return;
    }
    setSent(true);
    const sendData: PostData = {
      device_type_name: 'neo_pixel',
      mqtt_id: selection,
      name: settingName,
      value,
    };
    console.log('sendData', sendData);
    if (websocket) {
      websocket.send(JSON.stringify(sendData));
    } else {
      postUpdate(sendData);
    }
  };

  const marks = [
    { value: 0, color: 'red' },
    { value: 0.5, },
    { value: 1, },
  ];
  
  return (
    <TooltipWrapper label={label}>
      <Slider
        disabled={sent}
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.5}
        marks={marks}
        thumbSize={20}
        styles={{ thumb: { borderWidth: 2, padding: 3 },  markLabel: { display: 'none' }  }}
        thumbChildren={
          <Icon
            size={16}
          />
        }
        onChangeEnd={handleChange}
      />
    </TooltipWrapper>
  );
};

export default IndeterminateButton;
