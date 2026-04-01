import { useEffect, useState, type KeyboardEventHandler } from 'react';
import { IconType } from 'react-icons';
import { ActionIcon, Container, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { SplitTableCell } from '@/components';
import { IndexableObj } from '@/interfaces';
import { useAppStore } from '@/stores';
import SliderForm from './SliderForm';

const PopoverSlider = ({
  label,
  Icon,
  device,
  name,
}: {
  label: React.ReactNode;
  Icon: IconType;
  device: IndexableObj;
  name: string;
}) => {
  const { color } = useAppStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setIsLoading(false), [device]);

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
      default:
        break;
    }
  };

  return (
    <Popover trapFocus position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Tooltip label={label} withArrow>
          <ActionIcon
            onClick={open}
            size="xl"
            variant="outline"
            w="100%"
            ta="left"
            loading={isLoading}
            className={classes['theme-match']}
            loaderProps={{ color }}
          >
            <SplitTableCell value={device[name]} Icon={Icon} />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <Container p="xs">
          <SliderForm
            device={device}
            name={name}
            Icon={Icon}
            close={close}
            setIsLoading={setIsLoading}
          />
        </Container>
      </Popover.Dropdown>
    </Popover>
  );
};

export default PopoverSlider;
