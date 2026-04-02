import { BsTags, BsTagsFill } from 'react-icons/bs';
import { HiTag } from 'react-icons/hi';
import { Checkbox, CloseButton, Container, Divider, Flex, Text } from '@mantine/core';
import { ICON_SIZE } from '@/constants';
import { Tag } from '@/interfaces';
import { getDividerColor, getTextInputStyles } from '@/lib/utils';
import { useAppStore, useDevicesStore } from '@/stores';

const TagsFilter = ({ close, usedTagIds }: { close: () => void; usedTagIds: number[] }) => {
  const { tags, filteredTagIds, setFilteredTagIds } = useDevicesStore();
  const { color } = useAppStore();

  const clearAllTags = () => setFilteredTagIds([]);

  tags.sort((a, _) => (usedTagIds.includes(a.id) ? -1 : 1));

  return (
    <Container p="xs">
      <Flex direction="column" gap="md">
        <Flex justify="space-between" gap="md">
          <Flex align="center" gap="xs">
            {filteredTagIds.length > 0 ? (
              <BsTagsFill color={color} size={ICON_SIZE} />
            ) : (
              <BsTags color={color} size={ICON_SIZE} />
            )}
            Filter by tag
          </Flex>
          <CloseButton onClick={close} />
        </Flex>
        <Divider my="xs" color={getDividerColor(color)} />
        {tags.length ? (
          <Flex direction="column" gap="md">
            <Checkbox
              indeterminate={filteredTagIds.length === 0}
              label="Deselect All"
              checked={filteredTagIds.length === 0}
              onChange={clearAllTags}
              color={color}
              styles={getTextInputStyles(color)}
            />
            <Checkbox.Group
              value={filteredTagIds.map(String)}
              onChange={(values) => setFilteredTagIds(values.map(Number))}
              color={color}
            >
              <Flex direction="column" gap="md">
                {tags.map((tag: Tag) => (
                  <Checkbox
                    key={`tag-checkbox-${tag.id}`}
                    label={tag.name}
                    value={tag.id.toString()}
                    color={color}
                    styles={getTextInputStyles(color)}
                    disabled={!usedTagIds.includes(tag.id)}
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
