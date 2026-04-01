import { IconType } from 'react-icons';
import { Flex, Text } from '@mantine/core';
import { ICON_SIZE } from '@/constants';

const SplitTableCell = ({
  Icon,
  value,
}: {
  Icon: IconType;
  value: string | number | undefined;
}) => {
  return (
    <Flex align="center" justify="flex-start" gap="xs">
      <Icon size={ICON_SIZE} />
      <Text fz="xl" ta="right">
        {value}
      </Text>
    </Flex>
  );
};

export default SplitTableCell;
