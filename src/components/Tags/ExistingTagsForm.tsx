import { Button, MultiSelect } from '@mantine/core';
import { Device, Tag } from "@/interfaces";
import useTagsStore from "@/useTagsStore";
import { useState } from 'react';


const ExistingTagsForm = ({ device }: { device: Device }) => {
  const [tagsChanged, setTagsChanged] = useState<boolean>(false);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>(device.tags?.map((tag) => tags[tag].id) || []);
  const { tags } = useTagsStore();
  const currentTagIds = device.tags?.map((tag) => tags[tag].id) || [];
  console.log(tags);

  const handleEditTags = (selectedTagsIdStrings: string[]) => {
    console.log(selectedTagsIdStrings);
    const selectedTagsIdNumbers = selectedTagsIdStrings.map((tagIdString) => parseInt(tagIdString));
    const changed = (
      currentTagIds.length !== selectedTagsIdNumbers.length ||
      !currentTagIds.every((id) => selectedTagsIdNumbers.includes(id))
    );
    console.log('selectedTagIds', selectedTagIds, 'selectedTagsIdNumbers', selectedTagsIdNumbers, 'changed', changed);
    setTagsChanged(changed);
    setSelectedTagIds(selectedTagsIdNumbers);
  };

  const handleSaveTags = () => {
    console.log('save tags', device.tags, selectedTagIds);
  };

  return (
    <div>
      <MultiSelect
        value={selectedTagIds.map((id) => id.toString())}
        onChange={handleEditTags}
        data={Object.values(tags).map((tag) => ({value: tag.id.toString(), label: tag.name}))}
        // label="Tags"
        placeholder="Select Tags"
        // searchable
        // clearable
      />
      <Button disabled={!tagsChanged} onClick={handleSaveTags}>Save</Button>
    </div>
  );
};

export default ExistingTagsForm;
