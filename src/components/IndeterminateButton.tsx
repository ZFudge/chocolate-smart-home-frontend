import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader, Slider } from '@mantine/core';
import classes from '@/App.module.css';
import TooltipWrapper from '@/components/TooltipWrapper';
import { PostData, postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';

const IndeterminateButton = ({
  Icon,
  label,
  selection,
  settingName,
  deviceTypeName,
}: {
  Icon: React.ElementType;
  label: string;
  selection: number[];
  settingName: string;
  deviceTypeName?: string;
}) => {
  const websocket = useContext(WebSocketContext);

  let dynamicDeviceTypeName: string | undefined = deviceTypeName;
  if (!deviceTypeName) {
    const location = useLocation();
    dynamicDeviceTypeName = location.pathname.split('/').pop() || '';
  }
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setIsLoading(false), []);

  const handleChange = (value: number) => {
    if (!dynamicDeviceTypeName) {
      alert('No device type name'); // eslint-disable-line no-alert
      return;
    }
    if (value === 0.5 || isLoading) {
      return;
    }
    const sendData: PostData = {
      device_type_name: dynamicDeviceTypeName || '',
      mqtt_id: selection,
      name: settingName,
      value,
    };
    if (websocket) {
      websocket.send(JSON.stringify(sendData));
    } else {
      postUpdate(sendData);
    }
    setIsLoading(true);
  };

  const marks = [{ value: 0 }, { value: 0.5 }, { value: 1 }];

  return isLoading ? (
    <div
      className={classes['fade-in']}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Loader size="1rem" />
    </div>
  ) : (
    <TooltipWrapper label={label}>
      <Slider
        disabled={isLoading}
        min={0}
        max={1}
        defaultValue={0.5}
        step={0.5}
        marks={marks}
        thumbSize={20}
        styles={{ thumb: { borderWidth: 2, padding: 3 }, markLabel: { display: 'none' } }}
        thumbChildren={<Icon size={16} />}
        onChangeEnd={handleChange}
        className={classes['fade-in']}
      />
    </TooltipWrapper>
  );
};

export default IndeterminateButton;
