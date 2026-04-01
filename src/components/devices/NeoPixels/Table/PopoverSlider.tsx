import { useEffect, useState, type KeyboardEventHandler } from 'react';
import { IconType } from 'react-icons';
import { ActionIcon, Container, Flex, Popover, Text, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { IndexableObj } from '@/interfaces';
import { useAppStore } from '@/stores';
import SliderForm from './SliderForm';

const PopoverSlider = ({
  Icon,
  device,
  name,
}: {
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

  const labelElement = (
    <Flex align="center" gap="xs">
      <Icon color={color} size={ICON_SIZE} />
      <Text>Adjust {name}</Text>
    </Flex>
  );

  return (
    <Popover trapFocus position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Tooltip label={labelElement} withArrow>
          <ActionIcon
            onClick={open}
            size="xl"
            variant="outline"
            color={color}
            loading={isLoading}
            className={classes['theme-match']}
            loaderProps={{ color }}
          >
            <Text fz="xl" fw={700}>
              {device[name.toLowerCase()]}
            </Text>
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
