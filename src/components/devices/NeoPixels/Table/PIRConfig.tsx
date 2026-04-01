import { useState, type KeyboardEventHandler } from 'react';
import { FaClock, FaPersonBurst } from 'react-icons/fa6';
import { ActionIcon, Container, Flex, Popover, Text, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { SplitTableCell, ToggleButton } from '@/components';
import { ICON_SIZE } from '@/constants';
import { IndexableObj } from '@/interfaces';
import { getBorderColor } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { NeoPixelObject } from '../interfaces';
import SliderForm from './SliderForm';

const PIRConfig = ({ device }: { device: NeoPixelObject }) => {
  const { color } = useAppStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <Popover trapFocus position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Tooltip label={disabled ? 'No PIR Sensor' : 'PIR Sensor Configuration'}>
          <ActionIcon
            w="100%"
            size="xl"
            onClick={open}
            disabled={disabled}
            variant={disabled ? 'transparent' : 'outline'}
            loading={isLoading}
            loaderProps={{ color }}
            className={classes['theme-match']}
            color={explicitColor}
            data-testid={`${device.mqtt_id}-pir-config-button`}
          >
            {disabled ? (
              <FaPersonBurst size={ICON_SIZE} />
            ) : (
              <SplitTableCell value={device.pir?.timeout || 0} Icon={FaPersonBurst} />
            )}
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <Flex direction="column" gap="md">
          <Flex
            justify="flex-start"
            gap="md"
            align="center"
            style={{
              border: `1px solid ${getBorderColor(color)}`,
              borderRadius: '4px',
              padding: '1em',
            }}
          >
            <Text fw={500}>Armed:</Text>
            <ToggleButton
              device={device}
              settingName="armed"
              Icon={FaPersonBurst}
              label={<Text>Armed</Text>}
            />
          </Flex>
          <Container
            style={{
              border: `1px solid ${getBorderColor(color)}`,
              borderRadius: '4px',
              padding: '1em',
            }}
          >
            <SliderForm
              device={device as unknown as IndexableObj}
              initialValue={device.pir?.timeout || 0}
              name="timeout"
              Icon={FaClock}
              close={close}
              setIsLoading={setIsLoading}
            />
          </Container>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default PIRConfig;
