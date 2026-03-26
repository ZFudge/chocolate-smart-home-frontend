import { FaMoon, FaSun } from 'react-icons/fa';
import { Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import classes from '@/App.module.css';
import { useAppStore } from '@/stores';

const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
  const { color } = useAppStore();

  return (
    <Switch
      size="md"
      color="dark.4"
      className={classes['cursor-pointer']}
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      onLabel={<FaSun size={16} color={color} />}
      offLabel={<FaMoon size={16} color={color} />}
    />
  );
};

export default ThemeToggle;
