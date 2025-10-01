import { FaRegSave } from 'react-icons/fa';
import { Button, Flex, Group, Popover, Space, TextInput, Title } from '@mantine/core';
import { useField } from '@mantine/form';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import Palette3x3 from '../Palette3x3';
import { usePaletteFormContext } from './PaletteForm';

const SavePalette = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const form = usePaletteFormContext();
  const nameField = useField({
    initialValue: '',
    mode: 'uncontrolled',
    validate: (value) => (value.trim().length < 2 ? 'Value is too short' : null),
  });

  const handleSavePalettePreset = async () => {
    await fetch('/api/neo_pixel/palettes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameField.getValue(),
        palette: Object.values(form.getValues()),
      }),
    }).then(async (resp) => {
      if (!resp.ok) {
        const data = await resp.json();
        console.error(resp.statusText, data);
        notifications.show({
          title: 'Failed to save palette preset',
          message: data.detail,
          color: 'red',
        });
        return [];
      }
      notifications.show({
        title: 'Palette preset saved',
        message: 'Palette preset was saved successfully',
        color: 'green',
      });
      close();
    });
  };

  return (
    <Popover opened={opened} position="top">
      <Popover.Target>
        <Button data-testid="save" onClick={open}>
          <FaRegSave />
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={ref}>
        <Flex gap="lg" align="center">
          <Title order={5}>Save New Palette</Title>
          <Palette3x3
            palette={Object.values(form.getValues()) as string[]}
            mqttIdLabel="selected"
          />
        </Flex>
        <Space h="md" />
        <TextInput label="Palette Name" {...nameField.getInputProps()} />
        <Space h="md" />
        <Group justify="space-between">
          <Button onClick={handleSavePalettePreset}>Save</Button>
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};

export default SavePalette;
