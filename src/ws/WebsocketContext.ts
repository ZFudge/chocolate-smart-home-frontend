import { createContext } from 'react';

type WebSocketContextType = {
  connect: (onmessage: (msgEvent: MessageEvent) => void, retries: number) => void;
  online: boolean;
  websocket: React.RefObject<WebSocket | null>;
};

const WebSocketContext = createContext<WebSocketContextType>({
  connect: () => {},
  online: false,
  websocket: { current: null },
});

export default WebSocketContext;
