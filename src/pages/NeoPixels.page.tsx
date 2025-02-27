import { useEffect } from 'react';
import NeoPixelTable from '@/components/NeoPixels/Table/NeoPixelTable';
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
      <NeoPixelTable neoPixelData={neoPixelData} />
    </WebSocketContext.Provider>
  );
}
