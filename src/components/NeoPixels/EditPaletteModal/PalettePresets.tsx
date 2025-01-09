import cx from 'clsx';
import { Select } from '@mantine/core';
import { PalettePreset, PresetFormValuesType } from '../interfaces';
import { editPaletteFormActions } from './formActions';
import classes from '../NeoPixel.module.css';

const renderSelectOption = ({ option }: { option: { label: string; value: string } }) => {
  const { label, value } = option;
  return (
    <div className={cx(classes['palette-preset-select-option'])}>
      <span className={cx(classes['palette-preset-label'])}>{label}</span>
      <PaletteKebab label={label} palette={value.split(',')} />
    </div>
  );
};

const PaletteKebab = ({ label, palette }: { label: string; palette: string[] }) => {
  return (
    <span className={cx(classes['palette-kebab'])}>
      {palette.map((c, i) => (
        <span style={{ backgroundColor: c }} key={`${label}-${i}-${c}`} />
      ))}
    </span>
  );
};

interface PalettePresetsProps {
  presets: PalettePreset[];
}

export default function PalettePresets({ presets }: PalettePresetsProps) {
  const handleSelect = (value: string | null) => {
    if (!value) {
      return;
    }
    const palette = value.split(',');
    editPaletteFormActions.setValues(palette as PresetFormValuesType);
  };

  return (
    <Select
      searchable
      label="Palette Presets"
      placeholder="Select Palette Preset"
      data={presets.map((preset: { label: string; value: string[] }) => ({
        ...preset,
        value: preset.value.toString(),
      }))}
      renderOption={renderSelectOption}
      className={cx(classes['palette-preset-select'])}
      onChange={handleSelect}
    />
  );
}
