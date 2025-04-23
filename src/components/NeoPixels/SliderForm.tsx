import { useContext, useState } from 'react';
import { IconType } from 'react-icons';
import { Button, Group, rem, Slider, Text } from '@mantine/core';
import { useField } from '@mantine/form';
import cx from 'clsx';

import classes from './NeoPixel.module.css';
import { postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';
import { IndexableObj } from './interfaces';

interface SliderFormProps {
  device: IndexableObj | IndexableObj[];
  name: string;
  Icon: IconType;
  close: () => void;
  initialValue: number;
  mqttId: number | number[];
  deviceTypeName: string;
  setIsLoading: (isLoading: boolean) => void;
}

const SliderForm = ({
  device,
  name,
  Icon,
  close,
  initialValue,
  mqttId,
  deviceTypeName,
  setIsLoading,
}: SliderFormProps) => {
  const websocket = useContext(WebSocketContext);
  const [value, setValue] = useState(initialValue);
  const multiple = Array.isArray(device);

  const field = useField({
    mode: 'uncontrolled',
    initialValue: initialValue,
    onValueChange: setValue,
  });

  const handleSubmit = () => {
    const data = {
      name,
      value: field.getValue(),
      mqtt_id: mqttId,
      device_type_name: deviceTypeName,
    };
    if (websocket) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
    }
    close();
    setIsLoading(true);
  };

  return (
    <>
      <Text size="sm">
        {name}: {value}
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
          data-testid={`${multiple ? mqttId : device.mqtt_id}-${name}-submit-button`}
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
