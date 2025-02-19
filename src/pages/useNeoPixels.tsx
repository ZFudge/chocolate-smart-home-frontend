import { useState } from 'react';
import { NeoPixelObject } from '@/components/NeoPixels/interfaces';

export const DEVICE_TYPE_NAME = 'neo_pixel';

export function useNeoPixels() {
  const [neoPixelData, setNeoPixelData] = useState<{ [key: string]: NeoPixelObject }>({});

  const handleMessage = (msgEvent: MessageEvent,) => {
    const data = JSON.parse(msgEvent.data);
    console.log('handleMessage', data, 'neoPixelData', neoPixelData);
    if (data.device_type_name === DEVICE_TYPE_NAME) {
      setNeoPixelData(prevState => ({
        ...prevState,
        [data.mqtt_id]: data,
      }));
    }
  };

  return { neoPixelData, handleMessage };
}

export default useNeoPixels;
