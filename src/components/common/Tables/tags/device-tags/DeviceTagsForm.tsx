import { useState, type KeyboardEventHandler } from 'react';
import { FaPlus } from 'react-icons/fa';
import { HiOutlineTag, HiTag } from 'react-icons/hi';
import {
  Button,
  CheckIcon,
  Combobox,
  Container,
  Divider,
  Flex,
  Group,
  Pill,
  PillsInput,
  Space,
  Text,
  useCombobox,
} from '@mantine/core';
import { useField } from '@mantine/form';
import { ColoredPill } from '@/components/common';
import { ICON_SIZE, MIN_TAG_LENGTH } from '@/constants';
import { DeviceObject } from '@/interfaces';
import { notifyTagsSaved, notifyTagsSaveFailed } from '@/lib/notifications';
import { createNewTag, getBorderColor, getDividerColor } from '@/lib/utils';
import { useAppStore, useDevicesStore } from '@/stores';

const DeviceTagsForm = ({ device, close }: { device: DeviceObject; close: () => void }) => {
  const { tags, addTagsData } = useDevicesStore();
  const { color } = useAppStore();
  const [search, setSearch] = useState('');

  const initialValue =
    device.tags?.map((tagId) => tags.find((tag) => tag.id === tagId)?.name ?? '') || [];
  const field = useField({
    initialValue,
  });

  const handleSubmit = async () => {
    const tagIds = field.getValue().map((item) => tags.find((tag) => tag.name === item)?.id);
    const response = await fetch(`/api/device/${device.mqtt_id}/tags`, {
      method: 'PUT',
      body: JSON.stringify({
        ids: tagIds,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      // field.setFieldError('tags', 'Failed to save tags');
      notifyTagsSaveFailed(device);
      return;
    }
    notifyTagsSaved(device);
    close();
  };

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const handleValueSelect = (val: string) => {
    const current = field.getValue();
    const newSelected = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    field.setValue(newSelected);
  };

  const handleValueRemove = (val: string) =>
    field.setValue(field.getValue().filter((v) => v !== val));

  const options = tags
    .map((tag) => tag.name)
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={field.getValue().includes(item)}>
        <Group gap="sm">
          {field.getValue().includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  const handleCreateTag = async () => {
    const tagData = await createNewTag(search);
    addTagsData([tagData]);
    handleValueSelect(tagData.name);
    setSearch('');
  };

  const submitDisabled =
    !field.isDirty() || initialValue.toString() === field.getValue().toString();

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = async (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Backspace' && search.length === 0 && field.getValue().length > 0) {
      event.preventDefault();
      const selected = field.getValue();
      handleValueRemove(selected[selected.length - 1]);
    } else if (event.key === 'Enter') {
      if (search) {
        if (search.length < MIN_TAG_LENGTH) {
          return;
        }
        for (let i = 0; i < tags.length; i++) {
          const tag = tags[i];
          if (tag.name === search) {
            handleValueSelect(search);
            setSearch('');
            return;
          }
        }
        await handleCreateTag();
      } else if (!submitDisabled) {
        handleSubmit();
      }
    }
  };

  return (
    <Container p="xs">
      {tags.length ? (
        <Flex direction="column" gap="md">
          <Flex direction="row" gap="xs" align="center">
            {field.getValue()?.length ? (
              <HiTag color={color} size={ICON_SIZE} />
            ) : (
              <HiOutlineTag color={color} size={ICON_SIZE} />
            )}
            <Text fw={500} ta="end">
              {device.name}
            </Text>
          </Flex>
          <Divider color={getDividerColor(color)} />
          <Combobox
            store={combobox}
            onOptionSubmit={handleValueSelect}
            withinPortal={false}
            position="top"
            styles={getBorderColor(color)}
          >
            <Combobox.DropdownTarget>
              <PillsInput onClick={() => combobox.openDropdown()}>
                <Pill.Group>
                  {field.getValue().map((item) => (
                    <ColoredPill key={item} item={item} onRemove={() => handleValueRemove(item)} />
                  ))}
                  <Combobox.EventsTarget>
                    <PillsInput.Field
                      autoFocus
                      data-testid="track-tags-form-input-field"
                      value={search}
                      onFocus={() => combobox.openDropdown()}
                      onBlur={() => combobox.closeDropdown()}
                      onChange={(event) => {
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                      }}
                      onKeyDown={onKeyDown}
                    />
                  </Combobox.EventsTarget>
                </Pill.Group>
              </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
              <Combobox.Options>
                {options.length > 0 ? (
                  options
                ) : search.length >= MIN_TAG_LENGTH ? (
                  <Combobox.Empty>
                    <Button
                      data-testid="track-tags-create-tag-button"
                      onClick={handleCreateTag}
                      color={color}
                    >
                      <FaPlus />
                      <Space w="xs" />
                      Create
                    </Button>
                  </Combobox.Empty>
                ) : (
                  <Combobox.Empty>
                    <Text>No tags found</Text>
                  </Combobox.Empty>
                )}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>

          <Flex gap="md" justify="space-between">
            <Button onClick={handleSubmit} color={color} disabled={!field.isDirty()}>
              Save
            </Button>
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
          </Flex>
        </Flex>
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
