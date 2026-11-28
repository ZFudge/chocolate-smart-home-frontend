import { useContext } from 'react';
import { AiOutlineIssuesClose } from 'react-icons/ai';
import { FaArrowDownUpAcrossLine } from 'react-icons/fa6';
import { LuArrowDownUp } from 'react-icons/lu';
import { ActionIcon, Loader, Tooltip } from '@mantine/core';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import { WebSocketContext } from '@/ws';

const WebSocketConnectionIndicator = () => {
  const { color } = useAppStore();
  const { online, websocket } = useContext(WebSocketContext);

  return (
    <Tooltip
      label={`Websocket ${
        websocket?.current?.readyState === websocket?.current?.CONNECTING
          ? 'Connecting...'
          : websocket?.current?.readyState === websocket?.current?.OPEN
            ? 'Connected'
            : 'Disconnected'
      }`}
    >
      <ActionIcon variant="transparent" size="xl">
        {online ? (
          <LuArrowDownUp color={color} size={ICON_SIZE} />
        ) : websocket?.current?.readyState === websocket?.current?.CONNECTING ? (
          <Loader color={color} size={ICON_SIZE} />
        ) : websocket?.current?.readyState === websocket?.current?.CLOSED ? (
          <FaArrowDownUpAcrossLine color="red" size={ICON_SIZE} />
        ) : (
          <AiOutlineIssuesClose color="red" size={ICON_SIZE} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default WebSocketConnectionIndicator;
