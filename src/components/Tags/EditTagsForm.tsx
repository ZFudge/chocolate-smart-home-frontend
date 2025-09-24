import { Button, TextInput, Loader, Space, Flex, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import useTagsStore from "@/useTagsStore";
import { useState } from 'react';
import { Tag } from '@/interfaces';

const MIN_TAG_LENGTH = 3;

const EditTagsForm = ({ close }: { close: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { tags, addTagsData } = useTagsStore();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: null,
      name: '',
    },
    onValuesChange: (values, valuesBefore) => {
      if (values.id !== valuesBefore.id) {
        const name = tags.find((tag) => tag.id.toString() === values.id)?.name || ''
        form.setFieldValue('name', name);
        // form.setFocus('name');
      }
    },
    validateInputOnChange: true,
    validate: {
      name: (value) => {
        if (value.length < MIN_TAG_LENGTH) {
          return 'Tag must be at least 3 characters long';
        }
        if (Object.values(tags).map((tag) => tag.name).includes(value)) {
          return 'Tag already exists';
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const response = await fetch(`/api/tags/${values.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: values.name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    const data = await response.json();
    const modifiedTags = Object.values(tags).map((tag) => tag.id === data.id ? data as Tag : tag);
    addTagsData(modifiedTags);
    close();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Select
        key={form.key('id')}
        label="Existing Tags"
        placeholder="Pick tag"
        data={Object.values(tags).map((tag) => ({value: tag.id.toString(), label: tag.name}))}
        {...form.getInputProps('id')}
      />
      <Space h="md" />
      <TextInput
        label="Edit Tag Name"
        key={form.key('name')}
        {...form.getInputProps('name')}    
      />
      <Space h="md" />
      <Flex gap="md" justify="space-between">
        <Button
          disabled={!form.isValid()}
          type="submit"
        >
          Save
          {loading && <Loader size="0.75rem" />}
        </Button>
        <Button variant="default" onClick={close}>Cancel</Button>
      </Flex>
    </form>
  );
};

export default EditTagsForm;
