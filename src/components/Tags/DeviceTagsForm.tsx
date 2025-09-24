import { Button, MultiSelect, Space, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { HiTag } from 'react-icons/hi';
import { Device } from "@/interfaces";
import useTagsStore from "@/useTagsStore";


const DeviceTagsForm = ({ device, close }: { device: Device, close: () => void }) => {
  const { tags } = useTagsStore();
  const currentTagIds = device.tags?.map((tag) => tag.id) || [];

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      tags: currentTagIds.map((id) => id.toString()),
    },
    onValuesChange: (values) => {
      console.log('values', values);
    },
    validateInputOnChange: true,
    validate: {
      tags: (value) => {
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const tagsIds = values.tags.map((tagIdString) => parseInt(tagIdString));
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
      return;
    }
    const data = await response.json();
    console.log('data', data);
    close();
  };

  return (
    <>
      {tags.length ? (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <MultiSelect
            data={Object.values(tags).map((tag) => ({value: tag.id.toString(), label: tag.name}))}
            key={form.key('tags')}
            {...form.getInputProps('tags')}
          />
          <Space h="md" />
          <Button type="submit">Save</Button>
        </form>
      ) : (
        <Text>No tags found. To get started, create a new tag using the <HiTag /> button in the header at the top of this page.</Text>
      )}
    </>
  );
};

export default DeviceTagsForm;
