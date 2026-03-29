import cx from 'clsx';
import ColorsKebab from './ColorsKebab';
import classes from '../PaletteModal.module.css';

const PalettePresetOption = ({ option }: { option: { label: string; value: string } }) => {
  const { label, value } = option;
  return (
    <div className={cx(classes['palette-preset-select-option'])}>
      <span className={cx(classes['palette-preset-label'])}>{label}</span>
      <ColorsKebab label={label} palette={value.split(',')} />
    </div>
  );
};

export default PalettePresetOption;
