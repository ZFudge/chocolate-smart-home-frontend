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

  const multiple = Array.isArray(device);
  let mqttId: number[] | number;
  let value: number;
  let deviceTypeName: string;
  console.log('device',device);

  if (multiple) {
    mqttId = [];
    value = 0;
    if (device.length < 2) {
      return null;
    }
    deviceTypeName = device[0].device_type_name;
    device.forEach(cur => {
      (mqttId as number[]).push(cur.mqtt_id);
      value += cur[name];
    });
    value = Math.round(value / device.length);
  } else {
    mqttId = device.mqtt_id;
    value = device[name];
    deviceTypeName = device.device_type_name;
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
