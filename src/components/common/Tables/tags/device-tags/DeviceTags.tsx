import { type KeyboardEventHandler } from 'react';
import { HiOutlineTag, HiTag } from 'react-icons/hi';
import { ActionIcon, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { DeviceObject } from '@/interfaces';
import { useAppStore, useDevicesStore } from '@/stores';
import DeviceTagsForm from './DeviceTagsForm';

const DeviceTags = ({ device }: { device: DeviceObject }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const { tags } = useDevicesStore();
  const { color } = useAppStore();

  if (!device) {
    return null;
  }

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
        <Tooltip label="Edit Tags">
          <ActionIcon
            variant="transparent"
            onClick={open}
            size="xl"
            disabled={tags?.length === 0}
            data-testid={`${device.mqtt_id}-tags-button`}
            className={classes['theme-match']}
          >
            {device.tags?.length ? (
              <HiTag color={color} size={ICON_SIZE} />
            ) : (
              <HiOutlineTag color={color} size={ICON_SIZE} />
            )}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <DeviceTagsForm device={device} close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default DeviceTags;
