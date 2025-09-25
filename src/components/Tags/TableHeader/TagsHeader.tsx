import { FaTags } from 'react-icons/fa';
import { Button, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import TagsFilter from './TagsFilter';

interface TagsHeaderProps {
  filteredTagIds: number[];
  setFilteredTagIds: (filteredTagIds: number[]) => void;
}

const TagsHeader = ({ filteredTagIds, setFilteredTagIds }: TagsHeaderProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

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
        <Button
          size="compact-xs"
          variant="transparent"
          style={{ padding: '0.125rem' }}
          onClick={open}
          className={`${classes['cursor-pointer']} ${classes['middle-center']}`}
          data-testid="devices-tags-header-button"
        >
          <FaTags size={16} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={ref}>
        <TagsFilter filteredTagIds={filteredTagIds} setFilteredTagIds={setFilteredTagIds} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default TagsHeader;
