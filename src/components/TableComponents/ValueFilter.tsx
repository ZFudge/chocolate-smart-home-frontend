import { MdOutlineFilterAlt } from 'react-icons/md';
import { Button, Divider, Flex, Space, TextInput } from '@mantine/core';
import classes from '@/App.module.css';

interface ValueFilterProps {
  filteredValue: string;
  onChange: (value: string) => void;
  close: () => void;
}

const ValueFilter = ({ filteredValue, onChange, close }: ValueFilterProps) => {
  return (
    <>
      <span className={classes['vertically-centered']}>
        <MdOutlineFilterAlt />
        <Space w="xs" />
        Filter by value
      </span>
      <Divider my="sm" />
      <TextInput
        placeholder="Enter value"
        value={filteredValue}
        onChange={(event) => onChange(event.target.value)}
      />
      <Space h="md" />
      <Flex justify="space-between">
        <Button onClick={() => onChange('')} variant="transparent">
          Clear
        </Button>
        <Button onClick={close} variant="transparent">
          Close
        </Button>
      </Flex>
    </>
  );
};

export default ValueFilter;
