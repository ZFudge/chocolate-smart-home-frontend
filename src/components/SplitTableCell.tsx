import { IconType } from 'react-icons';
import { Flex, Text } from '@mantine/core';

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
  let color = explicitColor || 'inherit';
  return (
    <Flex
      columnGap={5}
      justify="flex-end"
      align="center"
      direction="row-reverse"
      style={{ color: color }}
    >
      {value && <Text ta="right">{value}</Text>}
      <Icon />
      {children}
    </Flex>
  );
};

export default SplitTableCell;
