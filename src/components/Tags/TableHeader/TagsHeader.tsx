import { type KeyboardEventHandler } from 'react';
import { BsTags, BsTagsFill } from 'react-icons/bs'; // FaTags } from 'react-icons/fa';
import { Button, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import TagsFilter from './TagsFilter';

interface TagsHeaderProps {
  filteredTagIds: number[];
  setFilteredTagIds: (filteredTagIds: number[]) => void;
}

const TagsHeader = ({ filteredTagIds, setFilteredTagIds }: TagsHeaderProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const { color } = useAppStore();

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
      width={300}
      opened={opened}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Tooltip label="Edit Tags">
          <Button
            m="auto"
            variant="transparent"
            style={{ padding: '0.125rem' }}
            onClick={open}
            className={`${classes['cursor-pointer']} ${classes['middle-center']}`}
            data-testid="devices-tags-header-button"
          >
            {filteredTagIds.length > 0 ? (
              <BsTagsFill color={color} size={ICON_SIZE} />
            ) : (
              <BsTags color={color} size={ICON_SIZE} />
            )}
          </Button>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown} autoFocus>
        <TagsFilter
          filteredTagIds={filteredTagIds}
          setFilteredTagIds={setFilteredTagIds}
          close={close}
        />
      </Popover.Dropdown>
    </Popover>
  );
};

export default TagsHeader;
