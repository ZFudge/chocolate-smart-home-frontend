import { useContext } from 'react';
import cx from 'clsx';
import { Button, FocusTrap, Group, Modal, Space } from '@mantine/core';
import WebSocketContext from '@/WebsocketContext';
import { NeoPixelObject } from '../interfaces';
import PalettePresets from './PalettePresets';
import classes from './PaletteModal.module.css';
import PaletteDisplay from './PaletteDisplay';
import { PaletteFormProvider, usePaletteForm } from './PaletteForm';

interface PaletteModalProps {
  devices: NeoPixelObject[];
  close: () => void;
}

const PaletteModal = ({ devices, close }: PaletteModalProps) => {
  const multiple = devices && devices.length > 1;
  const websocket = useContext(WebSocketContext);
  const form = usePaletteForm({
    mode: 'uncontrolled',
    name: 'edit-palette-form',
    initialValues: {
      '0-color': devices[0].palette[0],
      '1-color': devices[0].palette[1],
      '2-color': devices[0].palette[2],
      '3-color': devices[0].palette[3],
      '4-color': devices[0].palette[4],
      '5-color': devices[0].palette[5],
      '6-color': devices[0].palette[6],
      '7-color': devices[0].palette[7],
      '8-color': devices[0].palette[8],
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    const data = {
      mqtt_id: devices.map(({ mqtt_id }) => mqtt_id),
      name: 'palette',
      device_type_name: 'neo_pixel',
      value: Object.values(values),
    };
    if (websocket) {
      websocket.send(JSON.stringify(data));
    // } else {
    //   postUpdate(data);
    }
    close();
  };

  return (
    <Modal
      opened
      onClose={close}
      title={multiple ? 'multiple' : devices[0]?.name}
      withCloseButton={false}
      centered
      className={cx(classes['palette-modal'])}
      data-testid="palette-modal"
    >
      <PaletteFormProvider form={form}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <FocusTrap.InitialFocus />
          <PaletteDisplay />
          <Space h="md" />
          <PalettePresets />
          <Space h="md" />
          <Group className={cx(classes['modal-button-group'])}>
            <Button type="submit" data-testid="submit">
              Submit
            </Button>
            <Button onClick={form.reset} variant="default" data-testid="reset">
              Reset
            </Button>
            <Button variant="default" onClick={close} data-testid="close">
              Cancel
            </Button>
          </Group>
        </form>
      </PaletteFormProvider>
    </Modal>
  );
};

export default PaletteModal;
