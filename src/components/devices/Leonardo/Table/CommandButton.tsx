import { Button, Text } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { LeonardoCommandObject } from '../interfaces';
import { LeonardoCommand } from '../types';
import { getColor } from '../utils';

interface CommandButtonProps {
  command: LeonardoCommand;
  device: DeviceObject;
  setLeonardoCommand: (command: LeonardoCommandObject) => void;
}

const CommandButton = ({ command, device, setLeonardoCommand }: CommandButtonProps) => {
  return (
    <Button
      color={getColor(command)}
      variant="outline"
      radius="lg"
      onClick={() => setLeonardoCommand({ command, device })}
    >
      <Text fw={700}>{command}</Text>
    </Button>
  );
};

export default CommandButton;
