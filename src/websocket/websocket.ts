interface WebSocketEventMap {
  onmessage: (ev: MessageEvent) => void | null;
  onclose: (this: WebSocket, ev: CloseEvent) => any;
}

const DOMAIN = 'localhost';

export const getNewWebSocket = ({ onmessage, onclose }: WebSocketEventMap) => {
  const ws = new WebSocket(`ws://${DOMAIN}:8000/ws`);
  if (onmessage) {
    ws.onmessage = onmessage;
  }
  if (onclose) {
    ws.onclose = onclose;
  }
  ws.onerror = console.log;
  return ws;
};
