import { Button, MultiSelect } from '@mantine/core';
import { Device } from "@/interfaces";
import useTagsStore from "@/useTagsStore";
import { useForm } from '@mantine/form';


const ExistingTagsForm = ({ device, close }: { device: Device, close: () => void }) => {
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
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <MultiSelect
        data={Object.values(tags).map((tag) => ({value: tag.id.toString(), label: tag.name}))}
        searchable
        key={form.key('tags')}
        {...form.getInputProps('tags')}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default ExistingTagsForm;
