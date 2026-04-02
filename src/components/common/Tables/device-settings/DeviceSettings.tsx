import { type KeyboardEventHandler } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';
import { ActionIcon, Popover, Tooltip } from '@mantine/core';
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
    <Popover withArrow trapFocus position="bottom" shadow="md" opened={opened}>
      <Popover.Target>
        <Tooltip label="Device Settings">
          <ActionIcon
            variant="transparent"
            color={color}
            onClick={open}
            size="xl"
            data-testid={`${device.mqtt_id}-device-settings-button`}
            className={classes['theme-match']}
          >
            <IoSettingsSharp color={color} size={ICON_SIZE} />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <DeviceSettingsForm device={device} close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default DeviceSettings;
