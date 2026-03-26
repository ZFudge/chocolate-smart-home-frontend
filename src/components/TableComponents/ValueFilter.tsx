import { KeyboardEventHandler } from 'react';
import { MdOutlineFilterAlt } from 'react-icons/md';
import { CloseButton, Container, Divider, Flex, TextInput } from '@mantine/core';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';

interface ValueFilterProps {
  filteredValue: string;
  onChange: (value: string) => void;
  close: () => void;
}

const ValueFilter = ({ filteredValue, onChange, close }: ValueFilterProps) => {
  const { color } = useAppStore();

  const clear = () => onChange('');

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
            <MdOutlineFilterAlt color={color} size={ICON_SIZE} />
            Filter by value
          </Flex>
          <CloseButton onClick={close} />
        </Flex>
        <Divider my="xs" color={color} />
        <TextInput
          placeholder="Enter value"
          value={filteredValue}
          onChange={(event) => onChange(event.target.value)}
          rightSection={<CloseButton onClick={clear} />}
          onKeyDown={onKeyDown}
          autoFocus
          styles={{
            input: {
              border: `0.5px solid ${color}`,
            },
          }}
        />
      </Flex>
    </Container>
  );
};

export default ValueFilter;
