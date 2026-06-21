import { FaClock, FaPersonBurst } from 'react-icons/fa6';
import { Container, Flex, Text } from '@mantine/core';
import { ToggleButton } from '@/components';
import { IndexableObj } from '@/interfaces';
import { getBorderColor } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { NeoPixelObject } from '../../interfaces';
import SliderForm from '../SliderForm';

const PIRForm = ({
  device,
  setIsLoading,
  close,
}: {
  device: NeoPixelObject;
  setIsLoading: (isLoading: boolean) => void;
  close: () => void;
}) => {
  const { color } = useAppStore();

  return (
    <Flex direction="column" gap="md">
      <Flex
        justify="flex-start"
        gap="md"
        align="center"
        style={{
          border: `1px solid ${getBorderColor(color)}`,
          borderRadius: '4px',
          padding: '1em',
        }}
      >
        <Text fw={500}>Armed:</Text>
        <ToggleButton
          device={device}
          indexableObject={device.plugin}
          settingName="pir_armed"
          Icon={FaPersonBurst}
          label={<Text>Armed</Text>}
        />
      </Flex>
      <Container
        style={{
          border: `1px solid ${getBorderColor(color)}`,
          borderRadius: '4px',
          padding: '1em',
        }}
      >
        <SliderForm
          device={device as unknown as IndexableObj}
          initialValue={device.plugin?.pir_timeout || 0}
          name="pir_timeout"
          Icon={FaClock}
          close={close}
          setIsLoading={setIsLoading}
        />
      </Container>
    </Flex>
  );
};

export default PIRForm;
