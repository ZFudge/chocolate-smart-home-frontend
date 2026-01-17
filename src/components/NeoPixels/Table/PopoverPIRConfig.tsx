import { useEffect, useState } from 'react';
import cx from 'clsx';
import { FaClock, FaPersonBurst } from 'react-icons/fa6';
import { Button, Divider, Flex, Loader, Popover, Text } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ToggleButton } from '@/components';
import { SplitTableCell, TooltipWrapper } from '@/components/';
import IndeterminateButton from '@/components/IndeterminateButton';
import { NEO_PIXEL } from '../constants';
import { IndexableObj } from '../interfaces';
import SliderForm from '../SliderForm';
import classes from '../NeoPixel.module.css';

const PopoverPIRConfig = ({ devices }: { devices: IndexableObj[] }) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const multiple = devices.length > 1;
  let mqttId: number[] | number;
  let value: number;
  let explicitColor = 'red';

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
      value += cur.timeout;
    });
    if (value) {
      value = Math.round(value / devices.length);
    }
    if (devices.every((cur) => cur.armed)) {
      explicitColor = 'green';
    } else if (devices.every((cur) => !cur.armed)) {
      explicitColor = 'red';
    } else {
      explicitColor = 'inherit';
    }
  } else {
    mqttId = devices[0].mqtt_id;
    value = devices[0].timeout;
    if (devices[0].armed) {
      explicitColor = 'green';
    } else {
      explicitColor = 'red';
    }
  }

  const indeterminate = multiple && new Set(devices.map((np) => np.armed)).size > 1;

  return (
    <TooltipWrapper label="PIR Config">
      <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={opened}>
        <Popover.Target>
          {isLoading ? (
            <div
              className={classes['fade-in']}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Loader size="0.75rem" />
            </div>
          ) : (
            <Button
              onClick={open}
              disabled={opened}
              variant="transparent"
              className={cx(classes['split-button'])}
              data-testid={`${multiple ? 'selected-devices' : mqttId}-pir-config-button`}
            >
              <SplitTableCell value={value} Icon={FaPersonBurst} explicitColor={explicitColor} />
            </Button>
          )}
        </Popover.Target>
        <Popover.Dropdown ref={ref}>
          <div style={{ marginBottom: '1em' }}>
            <Flex justify="flex-start" gap="md">
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
                  devices={devices}
                  settingName="armed"
                  Icon={FaPersonBurst}
                  deviceTypeName={NEO_PIXEL}
                />
              )}
            </Flex>
          </div>
          <Divider my="sm" />
          <SliderForm
            devices={devices}
            name="timeout"
            initialValue={value}
            Icon={FaClock}
            close={close}
            setIsLoading={setIsLoading}
            deviceTypeName={NEO_PIXEL}
            mqttId={mqttId}
          />
        </Popover.Dropdown>
      </Popover>
    </TooltipWrapper>
  );
};

export default PopoverPIRConfig;
