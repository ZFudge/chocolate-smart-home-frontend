import { useEffect, useState } from 'react';
import cx from 'clsx';
import { Select } from '@mantine/core';
import { PaletteFormValuesType, PalettePresetData } from '../../interfaces';
import { usePaletteFormContext } from '../PaletteForm';
import PalettePresetOption from './PalettePresetOption';
import { getPresets } from './utils';
import classes from '../PaletteModal.module.css';

export default function PalettePresets() {
  const [presets, setPresets] = useState<PalettePresetData[]>([]);
  const form = usePaletteFormContext();

  useEffect(() => {
    getPresets(setPresets);
  }, []);

  if (presets.length === 0) {
    return <div>Loading...</div>;
  }

  const handleSelect = (value: string | null) => {
    if (!value) {
      return;
    }
    const palette: PaletteFormValuesType = value.split(',').reduce(
      (acc, c, i) => ({
        ...acc,
        [`${i}-color`]: c,
      }),
      {} as PaletteFormValuesType
    );
    form.setValues(palette as unknown as PaletteFormValuesType);
  };

  const formValues = Object.values(form.getValues());
  let defaultValue: string | undefined;
  for (const preset of presets) {
    if (preset.colors.toString() === formValues.toString()) {
      defaultValue = preset.colors.toString();
      break;
    }
  }

  return (
    <Select
      label="Palette Presets"
      placeholder="Select Palette Preset"
      defaultValue={defaultValue}
      data={presets?.map((preset: { name: string; colors: string[] }) => ({
        value: preset.colors.toString(),
        label: preset.name,
      }))}
      renderOption={PalettePresetOption}
      onChange={handleSelect}
      className={cx(classes['palette-preset-select'])}
      data-testid="palette-preset-select"
    />
  );
}
