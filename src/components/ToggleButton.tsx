
import { Button } from '@mantine/core';

export interface IndexableObj {
  [key: string]: any;
}

const toggleSetting = ({ device, lookupName }: { device: IndexableObj; lookupName: string }) => {
  const url = `/neopixel/${device.id}/`;
  const postData = {
    [lookupName]: !device[lookupName],
  };
  console.log(url, postData, device, lookupName, device[lookupName]);
};

export function ToggleButton({
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
    >
      {children}
    </Button>
  );
}
