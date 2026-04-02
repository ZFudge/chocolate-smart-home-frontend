import { useEffect, useState, type KeyboardEventHandler } from 'react';
import { CiNoWaitingSign } from 'react-icons/ci';
import { FaPersonBurst } from 'react-icons/fa6';
import { ActionIcon, Flex, Popover, Text, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import { NeoPixelObject } from '../../interfaces';
import PIRForm from './form';

const PIRConfig = ({ device }: { device: NeoPixelObject }) => {
  const { color } = useAppStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setIsLoading(false), [device.pir]);

  const disabled = !device.pir;
  const explicitColor = disabled ? 'gray' : device.pir?.armed ? 'green' : 'red';

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
      {disabled ? (
        <>
          <Text>No PIR Sensor Configured for This Device</Text>
        </>
      ) : (
        <>
          <FaPersonBurst color={color} size={ICON_SIZE} />
          <Text>Adjust PIR Sensor Configuration</Text>
        </>
      )}
    </Flex>
  );

  return (
    <Popover trapFocus position="left" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Tooltip label={labelElement}>
          <ActionIcon
            size="xl"
            onClick={open}
            disabled={disabled}
            variant="outline"
            loading={isLoading}
            className={classes['theme-match']}
            color={explicitColor}
            data-testid={`${device.mqtt_id}-pir-config-button`}
          >
            {disabled ? (
              <CiNoWaitingSign size={ICON_SIZE} />
            ) : (
              <Text fz="xl" fw={700} ta="right" td={device.pir?.armed ? 'none' : 'line-through'}>
                {device.pir?.timeout || 0}
              </Text>
            )}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <PIRForm device={device} setIsLoading={setIsLoading} close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default PIRConfig;
