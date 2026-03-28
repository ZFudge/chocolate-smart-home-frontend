import { type KeyboardEventHandler } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { Button, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { DeviceObject } from '@/interfaces';
import { useAppStore } from '@/stores';
import DeviceSettingsForm from './DeviceSettingsForm';

const DeviceSettings = ({ device }: { device: DeviceObject }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const { color } = useAppStore();

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
      default:
        break;
    }
  };

  return (
    <Popover withArrow trapFocus position="bottom" shadow="md" width={300} opened={opened}>
      <Popover.Target>
        <Button
          onClick={open}
          variant="transparent"
          p="0.125rem"
          className={`${classes['cursor-pointer']} ${classes['middle-center']} ${classes['theme-match']}`}
        >
          <IoSettingsSharp color={color} size={ICON_SIZE} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <DeviceSettingsForm device={device} close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default DeviceSettings;
