import classes from '@/App.module.css';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { Switch, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';

const ThemeToggle = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Switch
      size="md"
      color="dark.4"
      className={classes['cursor-pointer']}
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
      offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
    />
  );
};

export default ThemeToggle;
