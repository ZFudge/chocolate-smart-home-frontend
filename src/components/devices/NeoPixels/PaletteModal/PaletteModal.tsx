import { useContext } from 'react';
import { Button, Flex, FocusTrap, Modal } from '@mantine/core';
import { postUpdate } from '@/lib/api';
import { useAppStore } from '@/stores';
import { WebSocketContext } from '@/ws';
import { NeoPixelObject, PaletteFormValuesType } from '../interfaces';
import useNeoPixelStore from '../useNeoPixelStore';
import Header from './Header';
import PaletteDisplay from './PaletteDisplay';
import { PaletteFormProvider, usePaletteForm } from './PaletteForm';
import PalettePresets from './presets/PalettePresets';
import SavePalette from './SavePalette';

const PaletteModal = () => {
  const { selectedPaletteDevices, neoPixelDevices, setSelectedPaletteDevices } = useNeoPixelStore();
  const websocket = useContext(WebSocketContext);
  const { color } = useAppStore();

  const device = neoPixelDevices[selectedPaletteDevices as number] as NeoPixelObject;
  const form = usePaletteForm({
    initialValues: device.palette.reduce(
      (acc, color, i) => ({
        ...acc,
        [`${i}-color`]: color,
      }),
      {} as PaletteFormValuesType
    ),
  });

  const handleSubmit = (values: typeof form.values) => {
    const data = {
      mqtt_id: [device.mqtt_id],
      name: 'palette',
      device_type_name: 'neo_pixel',
      value: Object.values(values),
    };
    if (websocket?.readyState === 1) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
    }
    setSelectedPaletteDevices(null);
  };

  const close = () => setSelectedPaletteDevices(null);

  return (
    <PaletteFormProvider form={form}>
      <Modal
        opened
        onClose={close}
        title={<Header devices={[device]} />}
        withCloseButton={false}
        centered
        data-testid="palette-modal"
        styles={{
          header: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2em 2em 0 2em',
          },
          body: {
            padding: '2em',
          },
        }}
      >
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <FocusTrap.InitialFocus />
          <Flex direction="column" gap="md">
            <Flex align="flex-end" justify="space-between" gap="md">
              <PalettePresets />
              <SavePalette />
            </Flex>
            <Flex direction="column">
              <PaletteDisplay />
            </Flex>
            <Flex justify="space-between">
              <Button type="submit" color={color} data-testid="palette-modal-submit-button">
                Submit
              </Button>
              <Button
                onClick={form.reset}
                variant="default"
                data-testid="palette-modal-reset-button"
              >
                Reset
              </Button>
              <Button variant="default" onClick={close} data-testid="palette-modal-cancel-button">
                Cancel
              </Button>
            </Flex>
          </Flex>
        </form>
      </Modal>
    </PaletteFormProvider>
  );
};

export default PaletteModal;
