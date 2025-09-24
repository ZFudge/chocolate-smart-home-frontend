import { HiTag } from 'react-icons/hi';
import { Button, Flex, MultiSelect, Space, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { Device } from '@/interfaces';
import useTagsStore from '@/useTagsStore';

const DeviceTagsForm = ({ device, close }: { device: Device; close: () => void }) => {
  const { tags } = useTagsStore();
  const currentTagIds = device.tags?.map((tag) => tag.id) || [];

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
      notifications.show({
        color: 'red',
        title: 'Failed to save tags',
        message: `Failed to save tags for ${device.name}`,
      });
      return;
    }
    const data = await response.json();
    console.log('data', data);
    notifications.show({
      title: 'Tags saved',
      message: `Tags for ${device.name} were saved successfully`,
    });
    close();
  };

  return (
    <>
      {tags.length ? (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <MultiSelect
            data={Object.values(tags).map((tag) => ({ value: tag.id.toString(), label: tag.name }))}
            key={form.key('tags')}
            label={
              <>
                <Text>Edit tags for {device.name}</Text>
                <Space h="md" />
              </>
            }
            {...form.getInputProps('tags')}
          />
          <Space h="md" />
          <Flex gap="md" justify="space-between">
            <Button type="submit">Save</Button>
            <Button type="submit" variant="default" onClick={close}>
              Cancel
            </Button>
          </Flex>
        </form>
      ) : (
        <Text>
          No tags found. To get started, create a new tag using the <HiTag /> button in the header
          at the top of this page.
        </Text>
      )}
    </>
  );
};

export default DeviceTagsForm;
