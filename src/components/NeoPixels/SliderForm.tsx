import cx from 'clsx';
import { IconType } from 'react-icons';
import { Button, Group, rem, Slider, Text } from '@mantine/core';
import { useField } from '@mantine/form';
import { postUpdate } from '@/api';
import { IndexableObj } from './interfaces';
import classes from './NeoPixel.module.css';

function SliderForm({
  device,
  name,
  Icon,
  close,
}: {
  device: IndexableObj;
  name: string;
  Icon: IconType;
  close: () => void;
}) {
  const field = useField({
    mode: 'uncontrolled',
    initialValue: device[name],
  });

  const handleSubmit = () => {
    postUpdate({ name, value: field.getValue(), id: device.id });
    close();
  };

  return (
    <>
      <Text size="sm">
        {name}: {device[name]}
      </Text>
      <Slider
        {...field.getInputProps()}
        min={0}
        max={255}
        key={field.key}
        label={null}
        className={cx(classes['number-slider'])}
        thumbChildren={<Icon size="1rem" />}
        thumbSize={26}
        styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
      />
      <Group className={cx(classes['slider-button-group'])}>
        <Button
          type="submit"
          onClick={handleSubmit}
          data-testid={`${device.id}-${name}-submit-button`}
        >
          Submit
        </Button>
        <Button variant="default" onClick={close} data-testid="close">
          Cancel
        </Button>
      </Group>
    </>
  );
}

export default SliderForm;
