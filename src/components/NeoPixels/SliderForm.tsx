import { useContext, useState } from 'react';
import cx from 'clsx';
import { IconType } from 'react-icons';
import { Button, Divider, Flex, rem, Slider, Stack, Text } from '@mantine/core';
import { useField } from '@mantine/form';
import { postUpdate } from '@/lib/api';
import { useAppStore } from '@/stores';
import WebSocketContext from '@/WebsocketContext';
import { IndexableObj } from './interfaces';
import classes from './NeoPixel.module.css';

interface SliderFormProps {
  devices: IndexableObj[];
  name: string;
  Icon: IconType;
  close: () => void;
  initialValue: number;
  mqttId: number | number[];
  deviceTypeName: string;
  setIsLoading: (isLoading: boolean) => void;
}

const SliderForm = ({
  devices,
  name,
  Icon,
  close,
  initialValue,
  mqttId,
  deviceTypeName,
  setIsLoading,
}: SliderFormProps) => {
  if (!devices || !devices.length) {
    return null;
  }

  const websocket = useContext(WebSocketContext);
  const [value, setValue] = useState(initialValue);
  const multiple = devices.length > 1;
  const { color } = useAppStore();
  const field = useField({
    mode: 'uncontrolled',
    initialValue,
    onValueChange: setValue,
  });

  const handleSubmit = () => {
    if (!deviceTypeName) {
      alert('No device type name'); // eslint-disable-line no-alert
      return;
    }
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
    <Flex direction="column" gap="md">
      <Text fw={500} size="sm">
        {name}: {value}
      </Text>
      <Slider
        min={0}
        max={255}
        key={field.key}
        thumbChildren={<Icon size="1rem" />}
        thumbSize={26}
        color={color}
        styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
        label={null}
        {...field.getInputProps()}
      />
      <Divider my="xs" color={color} />
      <Flex justify="space-between" className={cx(classes['slider-button-group'])}>
        <Button
          type="submit"
          onClick={handleSubmit}
          data-testid={`${multiple ? mqttId : devices[0].mqtt_id}-${name}-submit-button`}
          color={color}
          disabled={!field.isDirty()}
        >
          Submit
        </Button>
        <Button variant="default" onClick={close} data-testid="close">
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default SliderForm;
