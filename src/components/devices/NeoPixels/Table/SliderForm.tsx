import { useContext } from 'react';
import { IconType } from 'react-icons';
import { Button, Divider, Flex, rem, Slider, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { ICON_SIZE } from '@/constants';
import { IndexableObj } from '@/interfaces';
import { postUpdate } from '@/lib/api';
import { getDividerColor } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { WebSocketContext } from '@/ws';
import { NEO_PIXEL } from '../constants';

interface SliderFormProps {
  device: IndexableObj;
  name: string;
  Icon: IconType;
  close: () => void;
  initialValue?: number;
  setIsLoading: (isLoading: boolean) => void;
}

const SliderForm = ({ device, name, Icon, close, initialValue, setIsLoading }: SliderFormProps) => {
  const { color } = useAppStore();
  const websocket = useContext(WebSocketContext);

  const field = useForm({
    initialValues: {
      [name.toLowerCase()]: initialValue || device[name.toLowerCase()],
    },
  });

  const handleSubmit = () => {
    const data = {
      name: name.toLowerCase(),
      value: field.getValues()[name.toLowerCase()],
      mqtt_id: device.mqtt_id,
      device_type_name: NEO_PIXEL,
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
          {field.getValues()[name.toLowerCase()]}
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
        {...field.getInputProps(name.toLowerCase())}
      />
      <Divider my="xs" color={getDividerColor(color)} />
      <Flex justify="space-between" gap="lg">
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={!field.isDirty(name.toLowerCase())}
          data-testid="neo-pixel-slider-form-submit-button"
          color={color}
        >
          Submit
        </Button>
        <Button variant="default" onClick={close} data-testid="neo-pixel-slider-form-close-button">
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default SliderForm;
