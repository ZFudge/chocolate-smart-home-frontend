import { IconType } from 'react-icons';
import { JSX } from 'react/jsx-runtime';
import { Button, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import cx from 'clsx';

import classes from '../NeoPixel.module.css';
import TooltipWrapper from '@/components/TooltipWrapper';
import SliderForm from '../SliderForm';
import SplitTableCell from './SplitTableCell';
import { IndexableObj } from '../interfaces';
import { useLocation } from 'react-router-dom';

const PopoverSlider = ({
  label,
  children,
  Icon,
  device,
  name,
}: JSX.IntrinsicAttributes & {
  label: string;
  children?: React.ReactNode;
  Icon: IconType;
  device: IndexableObj | IndexableObj[];
  name: string;
}) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const location = useLocation();
  const deviceTypeName = location.pathname.split('/').pop() || '';

  const multiple = Array.isArray(device);
  let mqttId: number[] | number;
  let value: number;

  if (multiple) {
    mqttId = [];
    value = 0;
    device.forEach(cur => {
      (mqttId as number[]).push(cur.mqtt_id);
      value += cur[name];
    });
    if (value) {
      value = Math.round(value / device.length);
    }
  } else {
    mqttId = device.mqtt_id;
    value = device[name];
  }

  return (
    <TooltipWrapper label={label}>
      <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={opened}>
        <Popover.Target>
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
        </Popover.Target>
        <Popover.Dropdown ref={ref}>
          <SliderForm
            device={device}
            name={name}
            initialValue={value}
            Icon={Icon}
            close={close}
            deviceTypeName={deviceTypeName}
            mqttId={mqttId}
          />
        </Popover.Dropdown>
      </Popover>
    </TooltipWrapper>
  );
}

export default PopoverSlider;
