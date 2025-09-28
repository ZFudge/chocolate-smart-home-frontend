// import cx from 'clsx';
// import classes from './PaletteModal.module.css';
import { ColorInput } from '@mantine/core';
import { usePaletteFormContext } from './PaletteForm';

const SWATCHES = ['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14'];

const PaletteDisplay = () => {
  const form = usePaletteFormContext();
  // console.log('PaletteDisplay form.values', form.values);
  return (
    <>
      {Object.values(form.values).map((color: unknown, i: number) => (
        <ColorInput
          data-index={i}
          data-testid={i}
          key={form.key(`${i.toString()}-color`)}
          {...form.getInputProps(`${i.toString()}-color`)}
          swatches={SWATCHES}
        />
      ))}
    </>
  );
};

export default PaletteDisplay;
