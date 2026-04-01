import { useEffect, useState, type KeyboardEventHandler } from 'react';
import { FaClock, FaPersonBurst } from 'react-icons/fa6';
import { ActionIcon, Container, Flex, Popover, Text, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { IndeterminateButton, ToggleButton } from '@/components';
import { ICON_SIZE } from '@/constants';
import { getBorderColor } from '@/lib/utils';
import { useAppStore, useDevicesStore } from '@/stores';
import { NEO_PIXEL } from '../../constants';
import { NeoPixelObject } from '../../interfaces';
import useNeoPixelStore from '../../useNeoPixelStore';
import SliderFormMulti from './SliderFormMulti';

const PIRConfigs = () => {
  const { color } = useAppStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const { devices: devicesMapping } = useDevicesStore();
  const { selectedDevices } = useNeoPixelStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => setIsLoading(false), [devicesMapping]);
  if (selectedDevices.length < 2) {
    return null;
  }

  const devices = selectedDevices
    .map((mqtt_id) => devicesMapping[mqtt_id] as NeoPixelObject)
    .filter((device) => device.pir !== undefined);

  let value = 0;
  let explicitColor = 'red';

  const mqttId: number[] = [];
  devices.forEach((cur) => {
    (mqttId as number[]).push(cur.mqtt_id);
    value += cur.pir?.timeout || 0;
  });
  if (value) {
    value = Math.round(value / devices.length);
  }
  if (devices.every((cur) => cur.pir?.armed)) {
    explicitColor = 'green';
  } else if (devices.every((cur) => !cur.pir?.armed)) {
    explicitColor = 'red';
  } else {
    explicitColor = 'inherit';
  }

  const indeterminate = new Set(devices.map((np) => np.pir?.armed)).size > 1;

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
        <Tooltip label="Passive IR Sensor Configuration">
          <ActionIcon
            size="xl"
            onClick={open}
            disabled={opened}
            loading={isLoading}
            color={explicitColor}
            data-testid="selected-devices-pir-config-button"
          >
            <FaPersonBurst size={ICON_SIZE} />
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
            {indeterminate ? (
              <IndeterminateButton
                selection={devices.map((d) => d.mqtt_id)}
                settingName="armed"
                label="armed"
                Icon={FaPersonBurst}
                deviceTypeName={NEO_PIXEL}
              />
            ) : (
              <ToggleButton
                device={devices[0]}
                settingName="armed"
                Icon={FaPersonBurst}
                label={<Text>Armed</Text>}
              />
            )}
          </Flex>
          <Container
            style={{
              border: `1px solid ${getBorderColor(color)}`,
              borderRadius: '4px',
              padding: '1em',
            }}
          >
            <SliderFormMulti
              devices={devices}
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

export default PIRConfigs;
