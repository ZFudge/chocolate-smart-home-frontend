import { HiTag } from 'react-icons/hi';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { Button, Checkbox, Divider, Flex, Space, Text } from '@mantine/core';
import classes from '@/App.module.css';
import { Tag } from '@/interfaces';
import useTagsStore from '@/useTagsStore';

interface TagsFilterProps {
  filteredTagIds: number[];
  setFilteredTagIds: (filteredTagIds: number[]) => void;
  close: () => void;
}

const TagsFilter = ({ filteredTagIds, setFilteredTagIds, close }: TagsFilterProps) => {
  const { tags } = useTagsStore();

  return (
    <>
      <Flex justify="space-between">
        <span className={classes['vertically-centered']}>
          <MdOutlineFilterAlt />
          <Space w="xs" />
          Filter by tag
        </span>
        <Button onClick={close} variant="transparent">
          Close
        </Button>
      </Flex>
      <Divider my="sm" />
      {tags.length ? (
        <>
          <Checkbox
            indeterminate={filteredTagIds.length === 0}
            label="Deselect All"
            checked={filteredTagIds.length === 0}
            onChange={() => setFilteredTagIds([])}
          />
          <Space h="md" />
          <Checkbox.Group
            value={filteredTagIds.map(String)}
            onChange={(values) => setFilteredTagIds(values.map(Number))}
            key={`tags-checkbox-group-${tags.length}`}
          >
            {tags.map((tag: Tag) => (
              <span key={`tag-checkbox-${tag.id}-span`}>
                <Checkbox
                  key={`tag-checkbox-${tag.id}`}
                  label={tag.name}
                  value={tag.id.toString()}
                />
                <Space h="md" key={`tag-filter-${tag.id}-space`} />
              </span>
            ))}
          </Checkbox.Group>
        </>
      ) : (
        <Text>
          No tags found. To get started, create a new tag using the <HiTag /> button in the header
          at the top of this page.
        </Text>
      )}
    </>
  );
};

export default TagsFilter;
