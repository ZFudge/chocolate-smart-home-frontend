import { type KeyboardEventHandler } from 'react';
import { ImPriceTags } from 'react-icons/im';
import { Button, Popover, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
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
        close();
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes['cursor-pointer']}>
      <Popover withArrow trapFocus position="bottom" shadow="md" opened={opened}>
        <Popover.Target>
          <Tooltip label="Edit Tags">
            <Button
              variant="transparent"
              onClick={open}
              style={{ height: '100%' }}
              className={classes['theme-match']}
            >
              <ImPriceTags color={color} size={ICON_SIZE} />
            </Button>
          </Tooltip>
        </Popover.Target>
        <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
          <TagsForm close={close} />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default TagsButton;
