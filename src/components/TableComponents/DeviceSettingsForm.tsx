import { Button, Space, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { DeviceObject } from '@/interfaces';

const DeviceSettingsForm = ({ device, close }: { device: DeviceObject; close: () => void }) => {
  const form = useForm({
    name: 'device-settings-form',
    mode: 'uncontrolled',
    initialValues: {
      name: device.name,
    },
    validateInputOnChange: true,
    validate: {
      name: (value) => {
        if (value.length < 3) {
          return 'Name must be at least 3 characters long';
        }
        if (value.length > 30) {
          return 'Name must be less than 30 characters long';
        }
        if (value === device.name) {
          return 'Name must be different from the current name';
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
    const response = await fetch(`/api/device/${device.mqtt_id}/name`, {
      method: 'POST',
      body: JSON.stringify({ name: values.name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      notifications.show({
        color: 'red',
        title: 'Failed to change device name',
        message: `Failed to change device name from "${device.name}" to "${values.name}"`,
      });
      return;
    }
    const data = await response.json();
    console.log(data);
    notifications.show({
      title: 'Device name changed',
      message: `Device name was changed from "${device.name}" to "${values.name}"`,
    });
    close();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput label="Name" {...form.getInputProps('name')} />
      <Space h="md" />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default DeviceSettingsForm;
