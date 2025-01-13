import { useState } from 'react';

const RETRY_TIMEOUT = 3000;
const DOMAIN = 'localhost';
const WEBSOCKET_URL = `ws://${DOMAIN}:8000/ws`;

const useWebsocket = (onmessage: (msgEvent: MessageEvent) => void) => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const connect = (retries = 3) => {
    console.log(
      `attempting websocket connection on ${WEBSOCKET_URL}. ${retries} retries remaining...`
    );

    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onmessage = onmessage;
    ws.onerror = console.error;

    ws.onopen = () => {
      console.log(`opened websocket connection on ${WEBSOCKET_URL}`);
      setWebsocket(ws);
      retries = 3;
    };

    ws.onclose = (ev: CloseEvent) => {
      console.log('websocket closed', ev);
      if (retries) {
        window.setTimeout(() => connect(retries - 1), RETRY_TIMEOUT);
      }
    };
  };

  return {
    connect,
    websocket,
  };
};

export default useWebsocket;
