import cx from 'clsx';
import { Select } from '@mantine/core';
import classes from '../NeoPixel.module.css';
import { useEffect, useState } from 'react';
import { PaletteFormValuesType, PalettePresetData } from '../interfaces';
import { usePaletteFormContext } from './PaletteForm';


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


export default function PalettePresets() {
  const [presets, setPresets] = useState<PalettePresetData[]>([]);
  const form = usePaletteFormContext();

  useEffect(() => {
    const getPresets = async () => {
      const resp = await fetch('/api/neo_pixel/palettes/');
      if (!resp.ok) {
        console.error(resp.statusText);
        return;
      }
      const data = await resp.json();
      setPresets(data);
    };
    getPresets();
  }, []);

  const handleSelect = (value: string | null) => {
    console.log('handleSelect value', value);
    if (!value) {
      return;
    }
    const palette: PaletteFormValuesType = value.split(',').reduce((acc, c, i) => ({
      ...acc,
      [`${i}-color`]: c,
    }), {} as PaletteFormValuesType);
    form.setValues(palette as unknown as PaletteFormValuesType);
  };

  const formValues = Object.values(form.getValues());
  let defaultValue: string | undefined;
  console.log('formValues', formValues);
  console.log('presets', presets);
  for (const preset of presets) {
    if (preset.colors.toString() === formValues.toString()) {
      defaultValue = preset.colors.toString();
      // defaultValue = preset.name;
    }
  }
  console.log('defaultValue', defaultValue);

  return (
    <Select
      label="Palette Presets"
      placeholder="Select Palette Preset"
      defaultValue={defaultValue}
      data={presets?.map((preset: { name: string; colors: string[] }) => ({
        value: preset.colors.toString(),
        label: preset.name,
      }))}
      renderOption={renderSelectOption}
      className={cx(classes['palette-preset-select'])}
      onChange={handleSelect}
      data-testid="palette-preset-select"
    />
  );
}
