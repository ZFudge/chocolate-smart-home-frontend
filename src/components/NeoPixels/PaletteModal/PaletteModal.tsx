import { useContext } from 'react';
import { Button, FocusTrap, Group, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import cx from 'clsx';

import classes from './PaletteModal.module.css';
import { postUpdate } from '@/lib/api';
import WebSocketContext from '@/WebsocketContext';
import { NeoPixelObject, PalettePreset } from '../interfaces';
import PalettePresets from './PalettePresets';


interface PaletteModalProps {
  device: NeoPixelObject;
  close: () => void;
  presetOptions: PalettePreset[];
}

const PaletteModal = ({ device, close, presetOptions }: PaletteModalProps) => {
  const websocket = useContext(WebSocketContext);

  const form = useForm({
    mode: 'uncontrolled',
    name: 'edit-palette',
    initialValues: Object.fromEntries(Object.entries(device.palette)),
  });

  const handleSubmit = (values: typeof form.values) => {
    const value: string[] = Array.from({ length: Object.keys(values).length }).map(
      (_, i) => values[i.toString()]
    );
    const data = {
      mqtt_id: device.mqtt_id,
      name: 'palette',
      value,
      device_type_name: 'neo_pixel',
    };
    if (websocket) {
      websocket.send(JSON.stringify(data));
    } else {
      postUpdate(data);
    }
  };

  return (
    <>
      <Modal
        opened
        onClose={close}
        title={device.name}
        withCloseButton={false}
        centered
        className={cx(classes['palette-modal'])}
        data-testid="palette-modal"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <FocusTrap.InitialFocus />
          <div className={cx(classes['palette-modal-content'])}>
            {Array.from({ length: device.palette.length }).map((_, i) => (
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
