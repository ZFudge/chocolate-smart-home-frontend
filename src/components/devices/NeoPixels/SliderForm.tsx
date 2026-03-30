import { useContext, useState } from 'react';
import { IconType } from 'react-icons';
import { Button, Divider, Flex, rem, Slider, Text } from '@mantine/core';
import { useField } from '@mantine/form';
import { ICON_SIZE } from '@/constants';
import { postUpdate } from '@/lib/api';
import { notifyDeviceTypeNameMissing } from '@/lib/notifications';
import { getDividerColor } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { WebSocketContext } from '@/ws';
import { IndexableObj } from './interfaces';

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
    initialValue,
    onValueChange: setValue,
  });

  const handleSubmit = () => {
    if (!deviceTypeName) {
      notifyDeviceTypeNameMissing();
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
      <Flex align="center" gap="xs">
        <Icon color={color} size={ICON_SIZE} />{' '}
        <Text span fw={500}>
          {name}:
        </Text>{' '}
        <Text span fw={500}>
          {value}
        </Text>
      </Flex>
      <Slider
        min={0}
        max={255}
        thumbChildren={<Icon size="1rem" />}
        thumbSize={26}
        color={color}
        styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
        label={null}
        {...field.getInputProps()}
      />
      <Divider my="xs" color={getDividerColor(color)} />
      <Flex justify="space-between" gap="lg">
        <Button
          type="submit"
          onClick={handleSubmit}
          data-testid={`${multiple ? mqttId : devices[0].mqtt_id}-${name}-submit-button`}
          color={color}
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
