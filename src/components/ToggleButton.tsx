import { Button } from '@mantine/core';
import { postUpdate } from '@/lib/api';
import { IndexableObj } from './NeoPixels/interfaces';

const toggleSetting = ({ device, lookupName }: { device: IndexableObj; lookupName: string }) => {
  const newValue = !device[lookupName];
  postUpdate({ id: device.id, value: newValue, name: lookupName });
};

function ToggleButton({
  device,
  lookupName,
  children,
}: {
  device: IndexableObj;
  lookupName: string;
  children?: React.ReactNode;
}) {
  return (
    <Button
      onClick={() => toggleSetting({ device, lookupName })}
      color={device[lookupName] ? 'teal' : 'gray'}
      variant="outline"
      size="xs"
      radius="lg"
      data-testid={`${device.id}-${lookupName}-toggle`}
    >
      {children}
    </Button>
  );
}

export default ToggleButton;
