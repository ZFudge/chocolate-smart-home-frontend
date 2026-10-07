import { useContext, type KeyboardEventHandler } from 'react';
import { Button, Flex, FocusTrap, Modal } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { PostData, postUpdate } from '@/lib/api';
import { useAppStore } from '@/stores';
import { WebSocketContext } from '@/ws';
import { LeonardoCommandObject } from '../interfaces';
import { notifyLeonardoCommandSent } from '../notifications';
import { LeonardoCommand } from '../types';
import Message from './Message';

interface ConfirmationModalProps {
  onClose: () => void;
  leoCommand: LeonardoCommandObject | null;
}

const ConfirmationModal = ({ onClose, leoCommand }: ConfirmationModalProps) => {
  const websocket = useContext(WebSocketContext);
  const { color } = useAppStore();

  if (!leoCommand) {
    return null;
  }
  const { command, device } = leoCommand;

  const handleSubmit = () => {
    const data: PostData = {
      mqtt_id: device.mqtt_id,
      name: 'command',
      device_type_name: device.device_type_name,
      value: command as LeonardoCommand,
    };

    if (websocket) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
    }
    onClose();
    notifyLeonardoCommandSent(command as LeonardoCommand, device as DeviceObject);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        onClose();
        break;
      case 'Enter':
        event.preventDefault();
        handleSubmit();
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      opened={!!leoCommand}
      onClose={onClose}
      withCloseButton={false}
      centered
      data-testid="leonardo-command-confirmation-modal"
      size="md"
      styles={{
        header: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2em 2em 0 2em',
        },
        body: {
          padding: '2em',
        },
      }}
      onKeyDown={onKeyDown}
    >
      <FocusTrap.InitialFocus />
      <Flex direction="column" gap="xl">
        <Message command={command} device={device} />
        <Flex justify="space-between" gap="md">
          <Button
            onClick={handleSubmit}
            color={color}
            data-testid="command-confirmation-modal-submit-button"
          >
            Send
          </Button>
          <Button
            variant="default"
            onClick={onClose}
            data-testid="command-confirmation-modal-cancel-button"
          >
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ConfirmationModal;
