import { HiTag } from 'react-icons/hi';
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
          variant="transparent"
          onClick={open}
          className={`${classes['cursor-pointer']} ${classes['middle-center']}`}
          data-testid="devices-tags-header-button"
        >
          <HiTag />
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={ref}>
        <TagsFilter filteredTagIds={filteredTagIds} setFilteredTagIds={setFilteredTagIds} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default TagsHeader;
