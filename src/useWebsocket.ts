import { useState } from 'react';

const RETRY_TIMEOUT = 3000;
const RETRY_COUNT = 3;
const WEBSOCKET_URL = "/ws";

const useWebsocket = () => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const connect = (onmessage: (msgEvent: MessageEvent) => void, retries = RETRY_COUNT) => {
    console.log(
      `attempting websocket connection on ${WEBSOCKET_URL}. ${retries} retries remaining...`
    );

    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onmessage = onmessage;
    ws.onerror = console.error;

    /**
     * This is a workaround that allows retries to be reset if a connection is successful,
     * in a way that avoids issues referencing stale state variables in the setTimeout closure
     * and is also type-safe.
     */
    let retriesReset = 0;

    ws.onopen = () => {
      console.log(`opened websocket connection on ${WEBSOCKET_URL}`);
      setWebsocket(ws);
      retriesReset = RETRY_COUNT;
    };

    ws.onclose = (ev: CloseEvent) => {
      console.log('websocket closed', ev);
      if (retries) {
        // Retry connection.
        window.setTimeout(
          () => connect(onmessage, Math.max(retries - 1, retriesReset)),
          RETRY_TIMEOUT
        );
      }
    };
  };

  return {
    connect,
    websocket,
  };
};

export default useWebsocket;
