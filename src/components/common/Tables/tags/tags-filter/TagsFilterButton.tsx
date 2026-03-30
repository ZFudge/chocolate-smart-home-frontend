import { type KeyboardEventHandler } from 'react';
import { BsTags, BsTagsFill } from 'react-icons/bs';
import { ActionIcon, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ICON_SIZE } from '@/constants';
import { useAppStore, useDevicesStore } from '@/stores';
import TagsFilter from './TagsFilter';

const TagsFilterButton = () => {
  const { color } = useAppStore();
  const { filteredTagIds, setFilteredTagIds } = useDevicesStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'x':
        if (!event.metaKey) {
          return;
        }
        event.preventDefault();
        setFilteredTagIds([]);
        break;
      default:
        break;
    }
  };

  return (
    <Popover
      withArrow
      trapFocus
      position="bottom"
      shadow="md"
      opened={opened}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Tooltip label="Edit Tags">
          <ActionIcon
            variant="transparent"
            color={color}
            onClick={open}
            size="xl"
            data-testid="devices-tags-header-button"
          >
            {filteredTagIds.length > 0 ? (
              <BsTagsFill color={color} size={ICON_SIZE} />
            ) : (
              <BsTags color={color} size={ICON_SIZE} />
            )}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown} autoFocus>
        <TagsFilter close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default TagsFilterButton;
