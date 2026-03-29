import { Text } from '@mantine/core';
import { NeoPixelObject } from '../interfaces';

const Header = ({ devices }: { devices: NeoPixelObject[] }) => {
  const multiple = devices && devices.length > 1;
  return (
    <Text>
      Palette Settings for{' '}
      <Text fw={700} span>
        {multiple ? 'multiple devices' : devices[0]?.name}
      </Text>{' '}
      device
    </Text>
  );
};

export default Header;
