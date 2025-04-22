import { useEffect } from 'react';

import NPTable from '@/components/NeoPixels/Table/';
import useWebsocket from '@/useWebsocket';
import WebSocketContext from '@/WebsocketContext';
import useNeoPixels from './useNeoPixels';

export function NeoPixelsPage() {
  const { handleMessage, neoPixelData } = useNeoPixels();
  const { connect, websocket } = useWebsocket();

  console.log('neoPixelData', neoPixelData);

  useEffect(() => {
    connect(handleMessage);
  }, []);

  return (
    <WebSocketContext.Provider value={websocket}>
      <NPTable neoPixelData={Object.values(neoPixelData)} />
    </WebSocketContext.Provider>
  );
}
