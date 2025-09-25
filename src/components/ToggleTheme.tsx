import { FaMoon, FaSun } from 'react-icons/fa';
import { Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import classes from '@/App.module.css';

const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Switch
      size="md"
      color="dark.4"
      className={classes['cursor-pointer']}
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      onLabel={<FaSun size={16} color="var(--mantine-color-yellow-4)" />}
      offLabel={<FaMoon size={16} color="var(--mantine-color-blue-6)" />}
    />
  );
};

export default ThemeToggle;
