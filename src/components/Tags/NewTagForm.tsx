import { useState } from 'react';
import { Button, Flex, Loader, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Tag } from '@/interfaces';
import useTagsStore from '@/useTagsStore';

const MIN_TAG_LENGTH = 3;

const NewTagForm = ({ close }: { close: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addTagsData, tags } = useTagsStore();

  const form = useForm({
    name: 'new-tag-form',
    mode: 'uncontrolled',
    initialValues: {
      name: '',
    },
    validateInputOnChange: true,
    validate: {
      name: (value) => {
        if (value.length < MIN_TAG_LENGTH) {
          return 'Tag must be at least 3 characters long';
        }
        if (
          Object.values(tags)
            .map((tag) => tag.name)
            .includes(value)
        ) {
          return 'Tag already exists';
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { name } = values;
    setLoading(true);
    const response = await fetch('/api/tags/', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    const data = await response.json();
    addTagsData([...Object.values(tags), data as Tag]);
    form.reset();
    close();
    setLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <div className="flex gap-2">
        <TextInput
          placeholder="New Tag Name"
          label="New Tag Name"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <Space h="md" />
        <Flex gap="md" justify="space-between">
          <Button disabled={!form.isValid() || loading} type="submit">
            Create
            {loading && <Loader size="0.75rem" />}
          </Button>
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
        </Flex>
      </div>
    </form>
  );
};

export default NewTagForm;
