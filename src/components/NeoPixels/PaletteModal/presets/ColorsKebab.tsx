import cx from 'clsx';
import classes from '../../NeoPixel.module.css';

const ColorsKebab = ({ label, palette }: { label: string; palette: string[] }) => {
  return (
    <span className={cx(classes['palette-kebab'])}>
      {palette.map((c, i) => (
        <span style={{ backgroundColor: c }} key={`${label}-${i}-${c}`} />
      ))}
    </span>
  );
};

export default ColorsKebab;
