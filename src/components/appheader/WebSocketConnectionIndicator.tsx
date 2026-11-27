import { useContext } from 'react';
import { AiOutlineIssuesClose } from 'react-icons/ai';
import { FaArrowDownUpAcrossLine } from 'react-icons/fa6';
import { LuArrowDownUp } from 'react-icons/lu';
import { ActionIcon, Loader, Tooltip } from '@mantine/core';
import { ICON_SIZE } from '@/constants';
import { WebSocketContext } from '@/ws';

const WebSocketConnectionIndicator = () => {
  const websocket = useContext(WebSocketContext);

  return (
    <Tooltip
      label={`Websocket ${
        websocket?.readyState === websocket?.CONNECTING
          ? 'Connecting...'
          : websocket?.readyState === websocket?.OPEN
            ? 'Connected'
            : 'Disconnected'
      }`}
    >
      <ActionIcon variant="transparent" size="xl">
        {websocket?.readyState === websocket?.CONNECTING ? (
          <Loader />
        ) : websocket?.readyState === websocket?.OPEN ? (
          <LuArrowDownUp color="limegreen" size={ICON_SIZE} />
        ) : websocket?.readyState === websocket?.CLOSED ? (
          <FaArrowDownUpAcrossLine color="red" size={ICON_SIZE} />
        ) : (
          <AiOutlineIssuesClose color="red" size={ICON_SIZE} />
        )}
      </ActionIcon>
    </Tooltip>
  );
};

export default WebSocketConnectionIndicator;
