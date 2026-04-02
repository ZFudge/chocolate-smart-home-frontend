import { type KeyboardEventHandler } from 'react';
import { BsTags, BsTagsFill } from 'react-icons/bs';
import { TbTagsOff } from 'react-icons/tb';
import { ActionIcon, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ICON_SIZE } from '@/constants';
import { DeviceObject } from '@/interfaces';
import { useAppStore, useDevicesStore } from '@/stores';
import TagsFilter from './TagsFilter';

const TagsFilterButton = ({ devices }: { devices: DeviceObject[] }) => {
  const { color } = useAppStore();
  const { filteredTagIds, setFilteredTagIds, tags } = useDevicesStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const usedTagIds = tags
    .filter((tag) => devices.some((device) => device.tags?.includes(tag.id)))
    .map((tag) => tag.id);

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

  const label = usedTagIds.length === 0 ? 'No tags used' : 'Filter by tag';
  const IconComponent =
    usedTagIds.length === 0 ? TbTagsOff : filteredTagIds.length > 0 ? BsTagsFill : BsTags;

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
        <Tooltip label={label}>
          <ActionIcon
            variant="transparent"
            color={color}
            onClick={usedTagIds.length > 0 ? open : undefined}
            size="xl"
            data-testid="tags-filter-button"
          >
            <IconComponent color={color} size={ICON_SIZE} />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown} autoFocus>
        <TagsFilter close={close} usedTagIds={usedTagIds} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default TagsFilterButton;
