import { type KeyboardEventHandler } from 'react';
import { MdOutlineFilterAlt } from "react-icons/md";

import { Button, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import ValueFilter from './ValueFilter';

const ValueFilterButton = ({
  filteredValue,
  setFilteredValue,
}: {
  filteredValue: string;
  setFilteredValue: (filteredValue: string) => void;
}) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const { color } = useAppStore();

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'Escape':
        close();
        break;
      default:
        break;
    }
  };

  return (
    <Popover
      withArrow
      position="bottom"
      shadow="md"
      width={300}
      opened={opened}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Tooltip label="Filter by Value">
          <Button
            m="auto"
            variant="transparent"
            style={{ padding: '0.125rem' }}
            onClick={open}
            className={`${classes['cursor-pointer']} ${classes['middle-center']}`}
            data-testid="devices-value-header-button"
          >
            <MdOutlineFilterAlt color={color} size={ICON_SIZE} />
          </Button>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <ValueFilter filteredValue={filteredValue} onChange={setFilteredValue} close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default ValueFilterButton;
