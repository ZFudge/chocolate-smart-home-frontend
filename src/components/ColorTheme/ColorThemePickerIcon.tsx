import type { KeyboardEventHandler } from 'react';
import { FaPalette } from 'react-icons/fa';
import { ActionIcon, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import ColorThemePicker from './picker';

const ColorThemePickerIcon = () => {
  const { color } = useAppStore();
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key === 'Escape') {
      close();
    }
  };

  return (
    <Popover position="right" withArrow shadow="md" opened={opened} trapFocus>
      <Popover.Target>
        <ActionIcon
          variant="transparent"
          color={color}
          onClick={open}
          size="xl"
          data-testid="app-color-theme-picker-button"
        >
          <FaPalette size={ICON_SIZE} />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown onKeyDown={onKeyDown} ref={ref}>
        <ColorThemePicker />
      </Popover.Dropdown>
    </Popover>
  );
};

export default ColorThemePickerIcon;
