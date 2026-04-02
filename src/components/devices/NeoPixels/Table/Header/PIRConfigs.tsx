import { useEffect, useState, type KeyboardEventHandler } from 'react';
import { FaClock, FaPersonBurst } from 'react-icons/fa6';
import { ActionIcon, Container, Flex, Popover, Text, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { IndeterminateButton, ToggleButtonMultiple } from '@/components';
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
  const { devices } = useDevicesStore();
  const { selectedDevices } = useNeoPixelStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selected =
    selectedDevices
      .map((mqtt_id) => devices[mqtt_id] as NeoPixelObject)
      .filter((device) => device.pir !== null) || [];
  const armedValues = selected.map((device) => device.pir?.armed);
  const indeterminateArmed = new Set(armedValues).size !== 1;
  const timeoutValues = selected.map((device) => device.pir?.timeout);

  useEffect(() => setIsLoading(false), [new Set(timeoutValues).size === 1]);

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

  const disabled = selected.length < 2;
  const labelElement = disabled ? (
    <Text>PIR Sensor Configs</Text>
  ) : (
    <Flex align="center" gap="xs">
      <FaPersonBurst color={color} size={ICON_SIZE} />
      <Text>Adjust PIR Sensor Configs for all selected devices</Text>
    </Flex>
  );
  const indexableObject = disabled ? undefined : selected[0]?.pir;

  return (
    <Popover trapFocus position="left" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Tooltip label={labelElement}>
          <ActionIcon
            size="xl"
            onClick={disabled ? undefined : open}
            loading={isLoading}
            color={color}
            variant={disabled ? 'transparent' : 'filled'}
            style={{ cursor: disabled ? 'default' : 'pointer' }}
            data-testid="header-pir-configs-button"
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
            {indeterminateArmed ? (
              <Container style={{ width: '100%' }}>
                <IndeterminateButton
                  selection={selected.map((d) => d.mqtt_id)}
                  settingName="armed"
                  label="armed"
                  Icon={FaPersonBurst}
                  deviceTypeName={NEO_PIXEL}
                />
              </Container>
            ) : (
              <ToggleButtonMultiple
                devices={selected}
                settingName="armed"
                Icon={FaPersonBurst}
                label={<Text>Armed</Text>}
                deviceTypeName={NEO_PIXEL}
                indexableObject={indexableObject}
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
              devices={selected}
              indexableObject={indexableObject}
              name="Timeout"
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
