import { useState } from 'react';
import { getNewWebSocket } from './websocket';

const RETRY_TIMEOUT = 3000;

const useWebsocket = (onmessage: (msgEvent: MessageEvent) => void) => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const setFreshWebSocket = () =>
    setWebsocket(
      getNewWebSocket({
        onmessage,
        onclose: onWSClose,
      })
    );

  const tryReconnect = (retries = 3) => {
    console.log(`trying reconnect. ${retries} retries remaining...`);
    setFreshWebSocket();
    if (retries - 1) {
      setTimeout(() => {
        if (websocket?.readyState === WebSocket.CLOSED) {
          tryReconnect(retries - 1);
        }
      }, RETRY_TIMEOUT);
    }
  };

  const onWSClose = function (this: WebSocket, _ev: CloseEvent): any {
    console.log(`websocket disconnected. trying reconnect in ${RETRY_TIMEOUT / 1000} seconds.`);
    setTimeout(tryReconnect, RETRY_TIMEOUT);
  };

  return {
    setFreshWebSocket,
  };
};

export default useWebsocket;
