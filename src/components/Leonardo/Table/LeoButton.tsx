import { Button } from '@mantine/core';
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
      size="xs"
      radius="lg"
      onClick={() => setLeonardoCommand({ command, device })}
    >
      {command}
    </Button>
  );
};

export default LeoButton;
