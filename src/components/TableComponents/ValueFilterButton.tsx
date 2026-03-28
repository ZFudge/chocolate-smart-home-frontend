import { type KeyboardEventHandler } from 'react';
import { MdFilterListAlt, MdOutlineFilterAlt } from 'react-icons/md';
import { Button, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { useAppStore, useDevicesStore } from '@/stores';
import ValueFilter from './ValueFilter';

const ValueFilterButton = () => {
  const { color } = useAppStore();
  const { filteredValue } = useDevicesStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

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
    <Popover
      withArrow
      position="bottom"
      shadow="md"
      width={300}
      opened={opened}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Tooltip label="Filter by Value">
          <Button
            m="auto"
            variant="transparent"
            style={{ padding: '0.125rem' }}
            onClick={open}
            className={`${classes['cursor-pointer']} ${classes['middle-center']}`}
            data-testid="devices-value-header-button"
          >
            {filteredValue.length > 0 ? (
              <MdFilterListAlt color={color} size={ICON_SIZE} />
            ) : (
              <MdOutlineFilterAlt color={color} size={ICON_SIZE} />
            )}
          </Button>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <ValueFilter close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default ValueFilterButton;
