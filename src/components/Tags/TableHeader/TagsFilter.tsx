import { HiTag } from 'react-icons/hi';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { Checkbox, CloseButton, Container, Divider, Flex, Space, Text } from '@mantine/core';
import { Tag } from '@/interfaces';
import { useAppStore, useTagsStore } from '@/stores';

interface TagsFilterProps {
  filteredTagIds: number[];
  setFilteredTagIds: (filteredTagIds: number[]) => void;
  close: () => void;
}

const TagsFilter = ({ filteredTagIds, setFilteredTagIds, close }: TagsFilterProps) => {
  const { tags } = useTagsStore();
  const { color } = useAppStore();
  const clearAllTags = () => setFilteredTagIds([]);

  return (
    <Container p="xs">
      <Flex direction="column" gap="md">
        <Flex justify="space-between" gap="md">
          <Flex align="center">
            <MdOutlineFilterAlt color={color} />
            <Space w="xs" />
            Filter by tag
          </Flex>
          <CloseButton onClick={close} />
        </Flex>
        <Divider my="sm" color={color} />
        {tags.length ? (
          <Flex direction="column" gap="md">
            <Checkbox
              indeterminate={filteredTagIds.length === 0}
              label="Deselect All"
              checked={filteredTagIds.length === 0}
              onChange={clearAllTags}
              color={color}
              styles={{
                input: {
                  border: `0.5px solid ${color}`,
                },
              }}
            />
            <Checkbox.Group
              value={filteredTagIds.map(String)}
              onChange={(values) => setFilteredTagIds(values.map(Number))}
              key={`tags-checkbox-group-${tags.length}`}
              color={color}
            >
              <Flex direction="column" gap="md">
                {tags.map((tag: Tag) => (
                  <Checkbox
                    key={`tag-checkbox-${tag.id}`}
                    label={tag.name}
                    value={tag.id.toString()}
                    color={color}
                    styles={{
                      input: {
                        border: `0.5px solid ${color}`,
                      },
                    }}
                  />
                ))}
              </Flex>
            </Checkbox.Group>
          </Flex>
        ) : (
          <Text>
            No tags found. To get started, create a new tag using the <HiTag /> button in the header
            at the top of this page.
          </Text>
        )}
      </Flex>
    </Container>
  );
};

export default TagsFilter;
