import { Button, Text } from '@mantine/core';
import { DeviceObject } from '@/interfaces';
import { LeonardoCommandObject } from '../interfaces';
import { LeonardoCommand } from '../types';
import { getColor } from '../utils';

interface LeoButtonProps {
  command: LeonardoCommand;
  device: DeviceObject;
  setLeonardoCommand: (command: LeonardoCommandObject) => void;
}

const LeoButton = ({ command, device, setLeonardoCommand }: LeoButtonProps) => {
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

export default LeoButton;
