import { FaRegSave } from 'react-icons/fa';
import { Button, Flex, Group, Popover, TextInput, Title, Tooltip } from '@mantine/core';
import { useField } from '@mantine/form';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ICON_SIZE } from '@/constants';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { PalettePresetData } from '../interfaces';
import { notifyPalettePresetSaved, notifyPalettePresetSaveFailed } from '../notifications';
import Palette3x3 from '../Palette3x3';
import { usePaletteFormContext } from './PaletteForm';

const SavePalette = () => {
  const { color } = useAppStore();
  const [opened, { open, close: closePopover }] = useDisclosure(false);
  const ref = useClickOutside(() => closePopover());
  const form = usePaletteFormContext();
  const nameField = useField({
    initialValue: '',
    validate: (value) => (value.trim().length < 2 ? 'Value is too short' : null),
  });

  const handleSavePalettePreset = async () => {
    const palette = Object.values(form.getValues()) as string[];
    await fetch('/api/neo_pixel/palettes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nameField.getValue(),
        palette,
      }),
    }).then(async (resp) => {
      if (!resp.ok) {
        const data = await resp.json();
        console.error(resp.statusText, data);
        notifyPalettePresetSaveFailed(data.detail);
        return;
      }
      const data = (await resp.json()) as PalettePresetData;
      const detail = <Palette3x3 palette={data.palette} mqttIdLabel="selected" />;
      notifyPalettePresetSaved(data.name, detail);
      closePopover();
    });
  };

  return (
    <Popover opened={opened} position="top">
      <Popover.Target>
        <Tooltip label="Save Palette">
          <Button data-testid="open-save-palette-form-button" onClick={open} color={color}>
            <FaRegSave size={ICON_SIZE} />
          </Button>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref}>
        <Flex gap="md" direction="column" p="xs">
          <Flex gap="lg" align="center">
            <Title order={5}>Save New Palette</Title>
            <Palette3x3
              palette={Object.values(form.getValues()) as string[]}
              mqttIdLabel="selected"
            />
          </Flex>
          <TextInput
            autoFocus
            label="Palette Name"
            styles={getTextInputStyles(color)}
            {...nameField.getInputProps()}
          />
          <Group justify="space-between">
            <Button
              onClick={handleSavePalettePreset}
              color={color}
              data-testid="palette-preset-save-button"
            >
              Save
            </Button>
            <Button variant="default" onClick={close} data-testid="palette-preset-cancel-button">
              Cancel
            </Button>
          </Group>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default SavePalette;
