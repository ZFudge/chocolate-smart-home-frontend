import { createFormContext } from '@mantine/form';
import { PaletteFormValuesType } from '../interfaces';

const [PaletteFormProvider, usePaletteFormContext, usePaletteForm] =
  createFormContext<PaletteFormValuesType>();

export { PaletteFormProvider, usePaletteFormContext, usePaletteForm };
