import { useState } from 'react';
import { Button, Flex, Loader, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MAX_TAG_LENGTH, MIN_TAG_LENGTH } from '@/constants';
import { Tag } from '@/interfaces';
import { notifyTagCreated, notifyTagCreationFailed } from '@/lib/notifications';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore, useDevicesStore } from '@/stores';

const CreateTagForm = ({ close }: { close: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addTagsData, tags } = useDevicesStore();
  const { color } = useAppStore();

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
          return `Tag must be at least ${MIN_TAG_LENGTH} characters long`;
        }
        if (value.length > MAX_TAG_LENGTH) {
          return `Tag must be less than ${MAX_TAG_LENGTH} characters long`;
        }
        if (tags.map((tag) => tag.name).includes(value)) {
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
      notifyTagCreationFailed(name);
      return;
    }
    const data = await response.json();
    addTagsData([...tags, data as Tag]);
    form.reset();
    notifyTagCreated(name);
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
          data-testid="new-tag-input"
          autoFocus
          styles={getTextInputStyles(color)}
        />
        <Space h="md" />
        <Flex gap="md" justify="space-between">
          <Button color={color} disabled={!form.isValid() || loading} type="submit">
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

export default CreateTagForm;
