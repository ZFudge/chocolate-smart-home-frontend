import { MdOutlineFilterAlt } from 'react-icons/md';
import { Button, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
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

  return (
    <Popover
      withArrow
      trapFocus
      position="bottom"
      shadow="md"
      width={300}
      opened={opened}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Tooltip label="Filter by Value">
          <Button
            size="compact-xs"
            variant="transparent"
            style={{ padding: '0.125rem' }}
            onClick={open}
            className={`${classes['cursor-pointer']} ${classes['middle-center']}`}
            data-testid="devices-value-header-button"
          >
            <MdOutlineFilterAlt size={16} />
          </Button>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref}>
        <ValueFilter filteredValue={filteredValue} onChange={setFilteredValue} close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default ValueFilterButton;
