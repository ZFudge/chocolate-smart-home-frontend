import cx from 'clsx';
import { Button, Group, Slider, Text } from '@mantine/core';
import { useField } from '@mantine/form';
import { postUpdate } from '@/api';
import { IndexableObj } from './interfaces';
import classes from './NeoPixel.module.css';

function SliderForm({
  device,
  name,
  close,
}: {
  device: IndexableObj;
  name: string;
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
        min={0}
        max={255}
        key={field.key}
        {...field.getInputProps()}
        className={cx(classes['number-slider'])}
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
