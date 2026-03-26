import { IoSettingsSharp } from 'react-icons/io5';
import { Button, Container, Divider, Flex, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { DeviceObject } from '@/interfaces';
import { useAppStore } from '@/stores';

const DeviceSettingsForm = ({ device, close }: { device: DeviceObject; close: () => void }) => {
  const { color } = useAppStore();

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
    <Container p="xs">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="row" gap="xs" align="center">
          <IoSettingsSharp color={color} />
          <Text fw={500} ta="left">
            Device Settings
          </Text>
        </Flex>
        <Divider my="md" color={color} />
        <Flex direction="column" gap="md">
          <TextInput
            label="Name"
            {...form.getInputProps('name')}
            styles={{ input: { border: `0.5px solid ${color}` } }}
          />
          <Flex justify="space-between">
            <Button type="submit" color={color}>
              Save
            </Button>
            <Button onClick={close} variant="default">
              Cancel
            </Button>
          </Flex>
        </Flex>
      </form>
    </Container>
  );
};

export default DeviceSettingsForm;
