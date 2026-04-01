import { useEffect, useState, type KeyboardEventHandler } from 'react';
import { IconType } from 'react-icons';
import { ActionIcon, Container, Loader, Popover, Tooltip } from '@mantine/core';
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
  useEffect(() => setIsLoading(false), [Object.values(devices)]);
  const selected = selectedDevices.map((mqtt_id) => devices[mqtt_id] as NeoPixelObject);

  if (selectedDevices.length < 2) {
    return null;
  }

  const mqttId: number[] = [];
  let value = 0;
  selected.forEach((cur) => {
    (mqttId as number[]).push(cur.mqtt_id);
    value += (cur[name as keyof NeoPixelObject] as number) || 0;
  });
  if (value) {
    value = Math.round(value / selected.length);
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

  return (
    <Popover trapFocus position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Tooltip label={name} withArrow>
          <ActionIcon onClick={open} size="xl" color={color}>
            {isLoading ? <Loader color="white" size={ICON_SIZE} /> : <Icon size={ICON_SIZE} />}
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
