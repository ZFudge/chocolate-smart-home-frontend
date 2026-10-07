import cx from 'clsx';
import classes from '../PaletteModal.module.css';

const ColorsKebab = ({ label, colors }: { label: string; colors: string[] }) => {
  return (
    <span className={cx(classes['palette-kebab'])}>
      {colors.map((c, i) => (
        <span style={{ backgroundColor: c }} key={`${label}-${i}-${c}`} />
      ))}
    </span>
  );
};

export default ColorsKebab;
