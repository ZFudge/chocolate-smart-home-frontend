import { HiTag } from 'react-icons/hi';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { Checkbox, Divider, Space, Text } from '@mantine/core';
import classes from '@/App.module.css';
import { Tag } from '@/interfaces';
import useTagsStore from '@/useTagsStore';

interface TagsFilterProps {
  filteredTagIds: number[];
  setFilteredTagIds: (filteredTagIds: number[]) => void;
}

const TagsFilter = ({ filteredTagIds, setFilteredTagIds }: TagsFilterProps) => {
  const { tags } = useTagsStore();

  return (
    <>
      <Text className={classes['vertically-centered']}>
        <MdOutlineFilterAlt />
        <Space w="xs" />
        Filter by tag
      </Text>
      <Divider my="sm" />
      {tags.length ? (
        <Checkbox.Group
          value={filteredTagIds.map(String)}
          onChange={(values) => setFilteredTagIds(values.map(Number))}
          key={`tags-checkbox-group-${tags.length}`}
        >
          {tags.map((tag: Tag) => (
            <>
              <Checkbox key={`tag-checkbox-${tag.id}`} label={tag.name} value={tag.id.toString()} />
              <Space h="md" key={`tag-filter-${tag.id}-space`} />
            </>
          ))}
        </Checkbox.Group>
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
