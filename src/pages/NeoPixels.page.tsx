import { useEffect } from 'react';
import NeoPixelTable from '@/components/NeoPixels/NeoPixelTable';
import useWebsocket from '@/websocket/useWebsocket';

export function NeoPixelsPage() {
  const onWebSocketMessage = (msgEvent: MessageEvent) => {
    const data = JSON.parse(msgEvent.data);
    console.log('onWSMessage', msgEvent, data);
  };
  const { setFreshWebSocket } = useWebsocket(onWebSocketMessage);

  useEffect(setFreshWebSocket, []);

  return (
    <>
      <NeoPixelTable neoPixelData={[]} />
    </>
  );
}
