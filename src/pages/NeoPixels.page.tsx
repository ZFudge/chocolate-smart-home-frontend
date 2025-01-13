import { useEffect } from 'react';
import NeoPixelTable from '@/components/NeoPixels/NeoPixelTable';
import useWebsocket from '@/useWebsocket';

export function NeoPixelsPage() {
  const onWebSocketMessage = (msgEvent: MessageEvent) => {
    const data = JSON.parse(msgEvent.data);
    console.log('onWSMessage', msgEvent, data);
  };
  const { connect } = useWebsocket(onWebSocketMessage);

  useEffect(connect, []);

  return (
    <>
      <NeoPixelTable neoPixelData={[]} />
    </>
  );
}
