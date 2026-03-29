import { KeyboardEventHandler } from 'react';
import { MdFilterListAlt, MdOutlineFilterAlt } from 'react-icons/md';
import { CloseButton, Container, Divider, Flex, TextInput } from '@mantine/core';
import { ICON_SIZE } from '@/constants';
import { getDividerColor, getTextInputStyles } from '@/lib/utils';
import { useAppStore, useDevicesStore } from '@/stores';

const ValueFilterForm = ({ close }: { close: () => void }) => {
  const { color } = useAppStore();
  const { filteredValue, setFilteredValue } = useDevicesStore();

  const clear = () => setFilteredValue('');

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'x':
        if (!event.metaKey) {
          return;
        }
        event.preventDefault();
        clear();
        break;
      default:
        break;
    }
  };

  return (
    <Container p="xs">
      <Flex direction="column" gap="md">
        <Flex align="center" justify="space-between" gap="xs">
          <Flex align="center" gap="xs">
            {filteredValue.length > 0 ? (
              <MdFilterListAlt color={color} size={ICON_SIZE} />
            ) : (
              <MdOutlineFilterAlt color={color} size={ICON_SIZE} />
            )}
            Filter by value
          </Flex>
          <CloseButton onClick={close} />
        </Flex>
        <Divider my="xs" color={getDividerColor(color)} />
        <TextInput
          placeholder="Enter value"
          value={filteredValue}
          onChange={(event) => setFilteredValue(event.target.value)}
          rightSection={<CloseButton onClick={clear} />}
          onKeyDown={onKeyDown}
          autoFocus
          styles={getTextInputStyles(color)}
          maxLength={20}
        />
      </Flex>
    </Container>
  );
};

export default ValueFilterForm;
