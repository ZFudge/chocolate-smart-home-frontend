// import cx from 'clsx';
// import classes from './PaletteModal.module.css';
import { ColorInput } from '@mantine/core';
import { SWATCHES } from './constants';
import { usePaletteFormContext } from './PaletteForm';

const PaletteDisplay = () => {
  const form = usePaletteFormContext();
  return (
    <>
      {Object.values(form.values).map((_: unknown, i: number) => (
        <ColorInput
          data-index={i}
          data-testid={i}
          key={form.key(`${i.toString()}-color`)}
          {...form.getInputProps(`${i.toString()}-color`)}
          swatches={SWATCHES}
          closeOnColorSwatchClick
        />
      ))}
    </>
  );
};

export default PaletteDisplay;
