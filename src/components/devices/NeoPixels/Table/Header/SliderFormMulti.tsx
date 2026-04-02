import { useContext } from 'react';
import { IconType } from 'react-icons';
import { Button, Divider, Flex, rem, Slider, Text } from '@mantine/core';
import { useField } from '@mantine/form';
import { ICON_SIZE } from '@/constants';
import { IndexableObj } from '@/interfaces';
import { PostData, postUpdate } from '@/lib/api';
import { getDividerColor } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { WebSocketContext } from '@/ws';
import { NEO_PIXEL } from '../../constants';
import { NeoPixelObject } from '../../interfaces';

interface SliderFormPropsMulti {
  devices: NeoPixelObject[];
  indexableObject?: IndexableObj;
  name: string;
  Icon: IconType;
  close: () => void;
  setIsLoading: (isLoading: boolean) => void;
}

const SliderFormMulti = ({
  devices,
  indexableObject,
  name,
  Icon,
  close,
  setIsLoading,
}: SliderFormPropsMulti) => {
  const { color } = useAppStore();
  const websocket = useContext(WebSocketContext);

  const field = useField({
    initialValue: indexableObject
      ? indexableObject[name.toLowerCase() as keyof IndexableObj]
      : devices[0][name.toLowerCase() as keyof NeoPixelObject],
  });

  const handleSubmit = () => {
    const data = {
      name: name.toLowerCase(),
      value: field.getValue(),
      mqtt_id: devices.map((device) => device.mqtt_id),
      device_type_name: NEO_PIXEL,
    } as PostData;
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
          {field.getValue() as number}
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
        value={field.getValue() as number}
        onChange={(value) => field.setValue(value)}
      />
      <Divider my="xs" color={getDividerColor(color)} />
      <Flex justify="space-between" gap="lg">
        <Button
          type="submit"
          onClick={handleSubmit}
          data-testid="header-slider-submit-button"
          color={color}
        >
          Submit
        </Button>
        <Button variant="default" onClick={close} data-testid="header-slider-close-button">
          Cancel
        </Button>
      </Flex>
    </Flex>
  );
};

export default SliderFormMulti;
