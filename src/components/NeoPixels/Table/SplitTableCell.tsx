import { IconType } from 'react-icons';
import { Flex, Text } from '@mantine/core';

function SplitTableCell({
  children,
  Icon,
  value,
}: {
  children?: React.ReactNode;
  Icon: IconType;
  value: string | number | undefined;
}) {
  return (
    <Flex columnGap={5} justify="flex-end" align="center" direction="row-reverse">
      {value && <Text ta="right">{value}</Text>}
      <Icon />
      {children}
    </Flex>
  );
}

export default SplitTableCell;
