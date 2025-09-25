import { MdOutlineFilterAlt } from 'react-icons/md';
import { Button, Divider, Space, TextInput } from '@mantine/core';
import classes from '@/App.module.css';

const ValueFilter = ({
  filteredValue,
  onChange,
}: {
  filteredValue: string;
  onChange: (value: string) => void;
}) => {
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
      <Button onClick={() => onChange('')}>Clear</Button>
    </>
  );
};

export default ValueFilter;
