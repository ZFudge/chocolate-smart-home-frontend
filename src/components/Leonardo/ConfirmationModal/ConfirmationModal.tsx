import { useContext } from 'react';
import { Button, Flex, FocusTrap, Modal } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { PostData, postUpdate } from '@/lib/api';
import { useAppStore } from '@/stores';
import { WebSocketContext } from '@/ws';
import { LeonardoCommand } from '../types';
import Message from './Message';

interface ConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  command: LeonardoCommand | undefined;
  device: DeviceObject | undefined;
}

const ConfirmationModal = ({ opened, onClose, command, device }: ConfirmationModalProps) => {
  const websocket = useContext(WebSocketContext);
  const { color } = useAppStore();

  const handleSubmit = () => {
    if (!device?.mqtt_id) {
      return;
    }
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
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      data-testid="confirmation-modal"
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
    >
      <FocusTrap.InitialFocus />
      <Flex direction="column" gap="xl">
        <Message command={command} device={device} />
        <Flex justify="space-between" gap="md">
          <Button onClick={handleSubmit} color={color} data-testid="submit">
            Send
          </Button>
          <Button variant="default" onClick={onClose} data-testid="close">
            Cancel
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default ConfirmationModal;
