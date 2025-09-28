import { createFormActions } from '@mantine/form';
import { PresetFormValuesType } from '../interfaces';

export const editPaletteFormActions = createFormActions<PresetFormValuesType>('edit-palette-form');
