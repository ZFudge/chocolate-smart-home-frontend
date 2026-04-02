import { type KeyboardEventHandler } from 'react';
import { MdFilterListAlt, MdOutlineFilterAlt } from 'react-icons/md';
import { ActionIcon, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ICON_SIZE } from '@/constants';
import { useAppStore, useDevicesStore } from '@/stores';
import ValueFilterForm from './ValueFilterForm';

const ValueFilter = () => {
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
          <ActionIcon
            variant="transparent"
            color={color}
            onClick={open}
            size="xl"
            data-testid="value-filter-button"
          >
            {filteredValue.length > 0 ? (
              <MdFilterListAlt color={color} size={ICON_SIZE} />
            ) : (
              <MdOutlineFilterAlt color={color} size={ICON_SIZE} />
            )}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <ValueFilterForm close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default ValueFilter;
