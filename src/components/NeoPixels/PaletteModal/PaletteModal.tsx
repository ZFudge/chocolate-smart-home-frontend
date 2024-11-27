import cx from 'clsx';
import { Button, FocusTrap, Group, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import NeoPixelObject from '../NeoPixelObject';
import classes from './PaletteModal.module.css';

export default function PaletteModal({
  device,
  opened,
  close,
}: {
  device: NeoPixelObject;
  opened: boolean;
  close: () => void;
}) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: Object.fromEntries(Object.entries(device.palette)),
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log(values);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={device.name}
        withCloseButton={false}
        centered
        className={cx(classes['palette-modal'])}
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
              />
            ))}
          </div>
          <Group className={cx(classes['modal-button-group'])}>
            <Button type="submit">Submit</Button>
            <Button onClick={form.reset} variant="default">
              Reset
            </Button>
            <Button variant="default" onClick={close}>
              Cancel
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
