import { useEffect, useState, type KeyboardEventHandler } from 'react';
import { IconType } from 'react-icons';
import { ActionIcon, Container, Flex, Popover, Text, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ICON_SIZE } from '@/constants';
import { useAppStore, useDevicesStore } from '@/stores';
import { NeoPixelObject } from '../../interfaces';
import useNeoPixelStore from '../../useNeoPixelStore';
import SliderFormMulti from './SliderFormMulti';

const PopoverSliderMulti = ({ Icon, name }: { Icon: IconType; name: string }) => {
  const { color } = useAppStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const { devices } = useDevicesStore();
  const { selectedDevices } = useNeoPixelStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selected = selectedDevices.map((mqtt_id) => devices[mqtt_id] as NeoPixelObject);
  const values = selected.map((device) => device[name.toLowerCase() as keyof NeoPixelObject]);
  useEffect(() => setIsLoading(false), [new Set(values).size === 1]);

  if (selectedDevices.length < 2) {
    return <Icon color={color} size={ICON_SIZE} />;
  }

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
      <Text>Adjust {name} for all selected devices</Text>
    </Flex>
  );

  return (
    <Popover trapFocus position="left" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Tooltip label={labelElement} withArrow>
          <ActionIcon onClick={open} size="xl" color={color} loading={isLoading}>
            <Icon size={ICON_SIZE} />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <Container p="xs">
          <SliderFormMulti
            devices={selected}
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

export default PopoverSliderMulti;
