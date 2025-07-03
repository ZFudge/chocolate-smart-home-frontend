import { useEffect, useState } from 'react';
import cx from 'clsx';
import { IconType } from 'react-icons';
import { useLocation } from 'react-router-dom';
import { Button, Loader, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { SplitTableCell, TooltipWrapper } from '@/components/';
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

  return (
    <TooltipWrapper label={label}>
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
              data-testid={`${multiple ? 'selected-devices' : mqttId}-${name}-slider-button`}
            >
              <SplitTableCell value={value} Icon={Icon}>
                {children}
              </SplitTableCell>
            </Button>
          )}
        </Popover.Target>
        <Popover.Dropdown ref={ref}>
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
        </Popover.Dropdown>
      </Popover>
    </TooltipWrapper>
  );
};

export default PopoverSlider;
