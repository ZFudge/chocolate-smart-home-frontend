import { type KeyboardEventHandler } from 'react';
import { ImPriceTags } from 'react-icons/im';
import { ActionIcon, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import TagsForm from './TagsForm';

const TagsButton = () => {
  const { color } = useAppStore();
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
      default:
        break;
    }
  };

  return (
    <Popover withArrow trapFocus position="bottom" shadow="md" opened={opened}>
      <Popover.Target>
        <Tooltip label="Edit Tags">
          <ActionIcon
            variant="transparent"
            color={color}
            onClick={open}
            size="xl"
            data-testid="devices-tags-button"
          >
            <ImPriceTags color={color} size={ICON_SIZE} />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
        <TagsForm close={close} />
      </Popover.Dropdown>
    </Popover>
  );
};

export default TagsButton;
