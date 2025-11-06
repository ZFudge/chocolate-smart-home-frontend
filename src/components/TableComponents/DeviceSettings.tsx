import { IoSettingsSharp } from 'react-icons/io5';
import { Button, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { DeviceObject } from '@/interfaces';
import DeviceSettingsForm from './DeviceSettingsForm';

const DeviceSettings = ({ device }: { device: DeviceObject }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  return (
    <Popover withArrow trapFocus position="bottom" shadow="md" width={300} opened={opened}>
      <Popover.Target>
        <Button
          onClick={open}
          variant="transparent"
          size="compact-xs"
          style={{ padding: '0.125rem' }}
          className={`${classes['cursor-pointer']} ${classes['middle-center']}`}
        >
          <IoSettingsSharp />
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={ref}>
        <DeviceSettingsForm device={device} close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default DeviceSettings;
