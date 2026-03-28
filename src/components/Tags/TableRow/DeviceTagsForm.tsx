import { HiTag } from 'react-icons/hi';
import { Button, Container, Divider, Flex, MultiSelect, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DeviceObject } from '@/interfaces';
import { notifyTagsSaved, notifyTagsSaveFailed } from '@/lib/notifications';
import { getDividerColor, getTextInputStyles } from '@/lib/utils';
import { useAppStore, useDevicesStore } from '@/stores';

const DeviceTagsForm = ({ device, close }: { device: DeviceObject; close: () => void }) => {
  const { tags } = useDevicesStore();
  const currentTagIds = device.tags?.map((tag) => tag.id) || [];
  const { color } = useAppStore();

  const form = useForm({
    name: 'device-tags-form',
    mode: 'uncontrolled',
    initialValues: {
      tags: currentTagIds.map((id) => id.toString()),
    },
    onValuesChange: (values) => {
      console.log('values', values);
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const tagsIds = values.tags.map((tagIdString) => parseInt(tagIdString, 10));
    const response = await fetch(`/api/device/${device.mqtt_id}/tags`, {
      method: 'PUT',
      body: JSON.stringify({
        ids: tagsIds.length ? tagsIds : null,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      form.setFieldError('tags', 'Failed to save tags');
      notifyTagsSaveFailed(device);
      return;
    }
    notifyTagsSaved(device);
    close();
  };

  return (
    <Container p="xs">
      {tags.length ? (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Flex direction="column" gap="md">
            <Flex direction="row" gap="xs" align="center">
              <HiTag color={color} />
              <Text fw={500} ta="end">
                {device.name}
              </Text>
            </Flex>
            <Divider color={getDividerColor(color)} />
            <MultiSelect
              autoFocus
              label="Tags"
              data={tags.map((tag) => ({
                value: tag.id.toString(),
                label: tag.name,
              }))}
              key={form.key('tags')}
              {...form.getInputProps('tags')}
              comboboxProps={{ withinPortal: false }}
              styles={getTextInputStyles(color)}
            />
            <Flex gap="md" justify="space-between">
              <Button type="submit" color={color}>
                Save
              </Button>
              <Button variant="default" onClick={close}>
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      ) : (
        <Text>
          No tags found. To get started, create a new tag using the <HiTag /> button in the header
          at the top of this page.
        </Text>
      )}
    </Container>
  );
};

export default DeviceTagsForm;
