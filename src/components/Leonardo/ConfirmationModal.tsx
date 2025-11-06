import { useContext } from 'react';
import { Badge, Button, Flex, FocusTrap, Group, Modal, Space, Text } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { PostData, postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';
import { LeonardoCommand } from './types';
import { getColor } from './utils';

const Title = ({
  command,
  device,
}: {
  command: LeonardoCommand | undefined;
  device: DeviceObject | undefined;
}) => {
  if (!command || !device) {
    return null;
  }
  return (
    <Flex>
      <Text ta="center">Confirm</Text>
      <Space w="md" />
      <Badge color={getColor(command)} size="lg">
        {command}
      </Badge>
      <Space w="md" />
      <Text ta="center">for</Text>
      <Space w="md" />
      <Text ta="center" fw={700}>
        {device?.name}
      </Text>
    </Flex>
  );
};

interface ConfirmationModalProps {
  opened: boolean;
  onClose: () => void;
  command: LeonardoCommand | undefined;
  device: DeviceObject | undefined;
}

const ConfirmationModal = ({ opened, onClose, command, device }: ConfirmationModalProps) => {
  const websocket = useContext(WebSocketContext);
  console.log(device);
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
      title={<Title command={command} device={device} />}
      withCloseButton={false}
      centered
      data-testid="confirmation-modal"
    >
      <FocusTrap.InitialFocus />
      <Space h="md" />
      <Group justify="center" gap={75}>
        <Button onClick={handleSubmit} data-testid="submit">
          Submit
        </Button>
        <Button variant="default" onClick={onClose} data-testid="close">
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmationModal;
