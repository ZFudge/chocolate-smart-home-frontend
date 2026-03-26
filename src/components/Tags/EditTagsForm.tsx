import { Button, Flex, Select, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Tag } from '@/interfaces';
import { useAppStore, useTagsStore } from '@/stores';

const MIN_TAG_LENGTH = 3;

const EditTagsForm = ({ close }: { close: () => void }) => {
  const { tags, addTagsData } = useTagsStore();
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
        // form.setFocus('name');
      }
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
    const response = await fetch(`/api/tags/${values.id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: values.name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      notifications.show({
        color: 'red',
        title: 'Tag update failed',
        message: `Tag name "${tags.find((tag) => tag.id === values.id)?.name}" was not changed to "${values.name}"`,
      });
      return;
    }
    const data = await response.json();
    const modifiedTags = Object.values(tags).map((tag) =>
      tag.id === data.id ? (data as Tag) : tag
    );
    notifications.show({
      title: 'Tag updated',
      message: `Tag name "${tags.find((tag) => tag.id === data.id)?.name}" was successfully changed to "${values.name}"`,
    });
    addTagsData(modifiedTags);
    close();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Flex direction="column" gap="md">
        <Select
          key={form.key('id')}
          label="Existing Tags"
          placeholder="Choose tag"
          data={Object.values(tags).map((tag) => ({ value: tag.id.toString(), label: tag.name }))}
          {...form.getInputProps('id')}
          comboboxProps={{ withinPortal: false }}
        />
        <TextInput
          placeholder="Edit Tag Name"
          label="Edit Tag Name"
          key={form.key('name')}
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
