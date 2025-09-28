import { useContext } from 'react';
import cx from 'clsx';
import { Button, FocusTrap, Group, Modal, Space } from '@mantine/core';
import { postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';
import { NeoPixelObject, PaletteFormValuesType } from '../interfaces';
import PaletteDisplay from './PaletteDisplay';
import { PaletteFormProvider, usePaletteForm } from './PaletteForm';
import PalettePresets from './presets/PalettePresets';
import classes from './PaletteModal.module.css';

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
    initialValues: devices[0].palette.reduce(
      (acc, color, i) => ({
        ...acc,
        [`${i}-color`]: color,
      }),
      {} as PaletteFormValuesType
    ),
  });

  const handleSubmit = (values: typeof form.values) => {
    const data = {
      mqtt_id: devices.map(({ mqtt_id }) => mqtt_id),
      name: 'palette',
      device_type_name: 'neo_pixel',
      value: Object.values(values),
    };
    if (websocket?.readyState === 1) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
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
