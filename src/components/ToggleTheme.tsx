import { FaMoon, FaSun } from 'react-icons/fa';
import { Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import classes from '@/App.module.css';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';

const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const { color } = useAppStore();

  return (
    <Switch
      size="lg"
      color="dark.4"
      className={classes['cursor-pointer']}
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      onLabel={<FaSun size={ICON_SIZE} color={color} />}
      offLabel={<FaMoon size={ICON_SIZE} color={color} />}
    />
  );
};

export default ThemeToggle;
