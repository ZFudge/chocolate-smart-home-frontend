import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader, Slider } from '@mantine/core';
import appClasses from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { PostData, postUpdate } from '@/lib/api';
import { useAppStore } from '@/stores';
import { WebSocketContext } from '@/ws';

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
  const { color } = useAppStore();

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

  const dynamicLabel = `Set ALL ${label === 'on' ? 'power' : label}`;

  return isLoading ? (
    <div
      className={appClasses['fade-in']}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Loader size="1rem" />
    </div>
  ) : (
    <Slider
      m="auto"
      disabled={isLoading}
      min={0}
      max={1}
      step={0.5}
      defaultValue={0.5}
      marks={marks}
      thumbSize={ICON_SIZE}
      color={color}
      styles={{
        thumb: { borderWidth: 2, padding: 3 },
        markLabel: { display: 'none' },
      }}
      thumbChildren={<Icon />}
      onChangeEnd={handleChange}
      className={appClasses['fade-in']}
      showLabelOnHover
      label={(value) => {
        const label =
          value === 0 ? `${dynamicLabel} OFF` : value === 0.5 ? null : `${dynamicLabel} ON`;
        if (!label) {
          return null;
        }
        return (
          <div className={appClasses['slider-label-container']}>
            <span className={appClasses['slider-label']}>{label}</span>
          </div>
        );
      }}
    />
  );
};

export default IndeterminateButton;
