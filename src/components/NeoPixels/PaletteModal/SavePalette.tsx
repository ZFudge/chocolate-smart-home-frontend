import { Button, Popover, Space, TextInput } from '@mantine/core';
import { useField } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { usePaletteFormContext } from './PaletteForm';
import { FaRegSave } from 'react-icons/fa';
import { useClickOutside, useDisclosure } from '@mantine/hooks';

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
    }).then((resp) => {
      if (!resp.ok) {
        console.error(resp.statusText);
        notifications.show({
          title: 'Error',
          message: 'Failed to save palette preset',
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
    <Popover opened={opened}>
      <Popover.Target>
        <Button data-testid="save" onClick={open}>
          <FaRegSave/>
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={ref}>
        <TextInput {...nameField.getInputProps()} />
        <Space h="md" />
        <Button onClick={handleSavePalettePreset}>Save</Button>
      </Popover.Dropdown>
    </Popover>
  );
};

export default SavePalette;
