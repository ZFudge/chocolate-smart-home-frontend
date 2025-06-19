import { useEffect, useState } from 'react';
import cx from 'clsx';
import { FaClock, FaPersonBurst } from 'react-icons/fa6';
import { useLocation } from 'react-router-dom';
import { Button, Loader, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import TooltipWrapper from '@/components/TooltipWrapper';
import { IndexableObj } from '../interfaces';
import SliderForm from '../SliderForm';
import SplitTableCell from './SplitTableCell';
import classes from '../NeoPixel.module.css';
import { NEO_PIXEL } from '../constants';
import { ToggleButton } from '@/components';

const PopoverPIRConfig = ({ devices, }: {
  devices: IndexableObj[];
}) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

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
      value += cur.timeout;
    });
    if (value) {
      value = Math.round(value / devices.length);
    }
  } else {
    mqttId = devices[0].mqtt_id;
    value = devices[0].timeout;
  }

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
              variant="transparent"
              className={cx(classes['split-button'])}
              data-testid={`${multiple ? 'selected-devices' : mqttId}-pir-config-button`}
            >
              <SplitTableCell value={value} Icon={FaPersonBurst} />
            </Button>
          )}
        </Popover.Target>
        <Popover.Dropdown ref={ref}>
          <ToggleButton
            devices={devices}
            settingName="armed"
            Icon={FaPersonBurst}
            deviceTypeName={NEO_PIXEL}
          />
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
