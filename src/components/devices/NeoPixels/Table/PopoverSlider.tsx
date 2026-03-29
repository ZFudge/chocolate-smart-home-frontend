import { useEffect, useState, type KeyboardEventHandler } from 'react';
import { IconType } from 'react-icons';
import { useLocation } from 'react-router-dom';
import { ActionIcon, Container, Loader, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { SplitTableCell } from '@/components';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import { IndexableObj } from '../interfaces';
import SliderForm from '../SliderForm';
import classes from '../NeoPixel.module.css';

const PopoverSlider = ({
  label,
  children,
  Icon,
  devices,
  name,
  deviceTypeName,
}: {
  label: string;
  children?: React.ReactNode;
  Icon: IconType;
  devices: IndexableObj[];
  name: string;
  deviceTypeName?: string;
}) => {
  const { color } = useAppStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  let dynamicDeviceTypeName: string | undefined = deviceTypeName;
  if (!deviceTypeName) {
    const location = useLocation();
    dynamicDeviceTypeName = location.pathname.split('/').pop() || '';
  }

  const multiple = devices.length > 1;
  let mqttId: number[] | number;
  let value: number;

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setIsLoading(false), [devices]);

  if (!devices || !devices.length) {
    return null;
  }

  if (multiple) {
    mqttId = [];
    value = 0;
    devices.forEach((cur) => {
      (mqttId as number[]).push(cur.mqtt_id);
      value += cur[name];
    });
    if (value) {
      value = Math.round(value / devices.length);
    }
  } else {
    mqttId = devices[0].mqtt_id;
    value = devices[0][name];
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
        <ActionIcon
          onClick={open}
          size="xl"
          variant="transparent"
          w="100%"
          ta="left"
          className={classes['theme-match']}
        >
          {isLoading ? (
            <Loader color={color} size={ICON_SIZE} />
          ) : (
            <SplitTableCell value={value} Icon={Icon} />
          )}
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <Container p="xs">
          <SliderForm
            devices={devices}
            name={name}
            initialValue={value}
            Icon={Icon}
            close={close}
            setIsLoading={setIsLoading}
            deviceTypeName={dynamicDeviceTypeName || ''}
            mqttId={mqttId}
          />
        </Container>
      </Popover.Dropdown>
    </Popover>
  );
};

export default PopoverSlider;
