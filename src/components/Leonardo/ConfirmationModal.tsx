import { Badge, Button, Flex, FocusTrap, Modal, Space, Stack, Text } from "@mantine/core";
import { Group } from "@mantine/core";
import { LeonardoCommand } from "./types";
import { DeviceObject } from "@/interfaces";
import { getColor } from "./utils";

const Title = ({ command, device }: { command: LeonardoCommand | undefined, device: DeviceObject | undefined }) => {
  if (!command || !device) return null;
  return (
    <Flex>
      <Text ta="center">Confirm</Text>
      <Space w="md" />
      <Badge color={getColor(command)} size="lg">{command}</Badge>
      <Space w="md" />
      <Text ta="center" >for</Text>
      <Space w="md" />
      <Text ta="center" fw={700}>{device?.name}</Text>
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
  const handleSubmit = () => {
    console.log(`Sending "${command}" to "${device?.name}"`);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title command={command} device={device} />}
      withCloseButton={false}
      centered
      // className={cx(classes['confirmation-modal'])}
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