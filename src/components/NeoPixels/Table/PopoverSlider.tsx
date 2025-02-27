import cx from 'clsx';
import { IconType } from 'react-icons';
import { JSX } from 'react/jsx-runtime';
import { Button, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { IndexableObj } from '../interfaces';
import SliderForm from '../SliderForm';
import SplitTableCell from './SplitTableCell';
import classes from '../NeoPixel.module.css';

function PopoverSlider(
  props: JSX.IntrinsicAttributes & {
    children?: React.ReactNode;
    Icon: IconType;
    device: IndexableObj;
    name: string;
  }
) {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button
          onClick={open}
          variant="transparent"
          className={cx(classes['split-button'])}
          data-testid={`${props.device.mqtt_id}-${props.name}-slider-button`}
        >
          <SplitTableCell {...props} value={props.device[props.name]} />
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={ref}>
        <SliderForm name={props.name} device={props.device} close={close} Icon={props.Icon} />
      </Popover.Dropdown>
    </Popover>
  );
}

export default PopoverSlider;
