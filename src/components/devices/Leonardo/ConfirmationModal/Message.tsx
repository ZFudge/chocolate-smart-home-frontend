import { Badge, Flex, Text } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { LeonardoCommand } from '../types';
import { getColor } from '../utils';

const Message = ({
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
    <Flex gap="md" align="center" justify="center" w="auto" wrap="wrap">
      <Text ta="center">Send</Text>
      <Badge color={getColor(command)} size="xl" variant="filled">
        {command}
      </Badge>
      <Text ta="center">command to</Text>
      <Text ta="center" fw={700}>
        {device?.name}?
      </Text>
    </Flex>
  );
};

export default Message;
