import { IconType } from 'react-icons';
import { Flex, Text } from '@mantine/core';
import classes from '@/App.module.css';

const SplitTableCell = ({
  children,
  Icon,
  value,
  explicitColor,
}: {
  children?: React.ReactNode;
  Icon: IconType;
  value: string | number | undefined;
  explicitColor?: string;
}) => {
  const color = explicitColor || 'inherit';
  return (
    <Flex
      m="auto"
      columnGap={5}
      justify="flex-end"
      align="center"
      direction="row-reverse"
      style={{ color }}
      className={classes['theme-match']}
    >
      {value && <Text ta="right">{value}</Text>}
      <Icon size={18} />
      {children}
    </Flex>
  );
};

export default SplitTableCell;
