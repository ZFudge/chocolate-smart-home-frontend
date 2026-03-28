import { Button, Flex, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { MAX_TAG_LENGTH, MIN_TAG_LENGTH } from '@/constants';
import { Tag } from '@/interfaces';
import { notifyTagUpdated, notifyTagUpdateFailed } from '@/lib/notifications';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore, useDevicesStore } from '@/stores';

const EditTagsForm = ({ close }: { close: () => void }) => {
  const { tags, addTagsData } = useDevicesStore();
  const { color } = useAppStore();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: null,
      name: '',
    },
    onValuesChange: (values, valuesBefore) => {
      if (values.id !== valuesBefore.id) {
        const name = tags.find((tag) => tag.id.toString() === values.id)?.name || '';
        form.setFieldValue('name', name);
      }
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
    const response = await fetch(`/api/tags/${values.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: values.name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      notifyTagUpdateFailed(tags.find((tag) => tag.id === values.id)?.name || '');
      return;
    }
    const data = await response.json();
    const modifiedTags = tags.map((tag) => (tag.id === data.id ? (data as Tag) : tag));
    notifyTagUpdated(tags.find((tag) => tag.id === data.id)?.name || '');
    addTagsData(modifiedTags);
    close();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap="md">
        <Select
          label="Tags"
          placeholder="Choose tag"
          data={tags.map((tag) => ({ value: tag.id.toString(), label: tag.name }))}
          data-testid="edit-tag-select"
          comboboxProps={{ withinPortal: false }}
          styles={getTextInputStyles(color)}
          {...form.getInputProps('id')}
        />
        <TextInput
          autoFocus
          placeholder="Edit Tag Name"
          label="Edit Tag Name"
          data-testid="edit-tag-input"
          styles={getTextInputStyles(color)}
          {...form.getInputProps('name')}
        />
        <Flex gap="md" justify="space-between">
          <Button disabled={!form.isValid()} type="submit" color={color}>
            Save
          </Button>
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default EditTagsForm;
