import { IoSettingsSharp } from 'react-icons/io5';
import { Button, Container, Divider, Flex, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ICON_SIZE, MAX_DEVICE_NAME_LENGTH, MIN_DEVICE_NAME_LENGTH } from '@/constants';
import { DeviceObject } from '@/interfaces';
import { notifyDeviceNameChanged, notifyDeviceNameChangeFailed } from '@/lib/notifications';
import { getDividerColor, getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';

const DeviceSettingsForm = ({ device, close }: { device: DeviceObject; close: () => void }) => {
  const { color } = useAppStore();

  const form = useForm({
    initialValues: {
      name: device.name,
    },
    validateInputOnChange: true,
    validate: {
      name: (value) => {
        if (value.length < MIN_DEVICE_NAME_LENGTH) {
          return `Name must be at least ${MIN_DEVICE_NAME_LENGTH} characters long`;
        }
        if (value.length > MAX_DEVICE_NAME_LENGTH) {
          return `Name must be less than ${MAX_DEVICE_NAME_LENGTH} characters long`;
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
      notifyDeviceNameChangeFailed(device, values.name);
      return;
    }
    const data = await response.json();
    console.log(data);
    notifyDeviceNameChanged(device, values.name);
    close();
  };

  return (
    <Container p="xs">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="row" gap="xs" align="center">
          <IoSettingsSharp color={color} size={ICON_SIZE} />
          <Text fw={500} ta="left">
            Device Settings
          </Text>
        </Flex>
        <Divider my="md" color={getDividerColor(color)} />
        <Flex direction="column" gap="md">
          <TextInput
            label="Name"
            styles={getTextInputStyles(color)}
            maxLength={MAX_DEVICE_NAME_LENGTH}
            {...form.getInputProps('name')}
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
