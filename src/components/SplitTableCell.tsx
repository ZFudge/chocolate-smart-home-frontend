import { IconType } from 'react-icons';
import { Flex, Text } from '@mantine/core';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';

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
      {value && (
        <Text fz="xl" ta="right">
          {value}
        </Text>
      )}
      <Icon size={ICON_SIZE} />
      {children}
    </Flex>
  );
};

export default SplitTableCell;
