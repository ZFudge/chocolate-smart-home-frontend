import { useContext } from 'react';
import cx from 'clsx';
import { Button, FocusTrap, Group, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';
import { NeoPixelObject, PalettePreset } from '../interfaces';
import PalettePresets from './PalettePresets';
import classes from './PaletteModal.module.css';

const EMPTY_PALETTE = Array(9).fill('#ffffff');

interface PaletteModalProps {
  devices: NeoPixelObject[] | null;
  close: () => void;
  presetOptions: PalettePreset[];
}

const PaletteModal = ({ devices, close, presetOptions }: PaletteModalProps) => {
  if (devices === null || !devices.length) {
    return null;
  }

  const multiple = devices.length > 1;
  const websocket = useContext(WebSocketContext);

  const form = useForm({
    mode: 'uncontrolled',
    name: 'edit-palette',
    initialValues: multiple
      ? EMPTY_PALETTE
      : Object.fromEntries(Object.entries(devices[0].palette)),
  });

  const handleSubmit = (values: typeof form.values) => {
    const data = {
      mqtt_id: multiple ? devices.map((device) => device.mqtt_id) : devices[0].mqtt_id,
      value: values as string[],
      name: 'palette',
      device_type_name: 'neo_pixel',
    };
    if (websocket) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
    }
    close();
  };

  return (
    <>
      <Modal
        opened
        onClose={close}
        title={multiple ? 'multiple' : devices[0].name}
        withCloseButton={false}
        centered
        className={cx(classes['palette-modal'])}
        data-testid="palette-modal"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <FocusTrap.InitialFocus />
          <div className={cx(classes['palette-modal-content'])}>
            {Array.from({ length: multiple ? 9 : devices[0].palette.length }).map((_, i) => (
              <input
                type="color"
                {...form.getInputProps(i.toString())}
                key={form.key(i.toString())}
                data-index={i}
                data-testid={i}
              />
            ))}
          </div>
          <PalettePresets presets={presetOptions} />
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
      </Modal>
    </>
  );
};

export default PaletteModal;
