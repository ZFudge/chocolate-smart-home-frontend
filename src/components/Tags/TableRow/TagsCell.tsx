import { type KeyboardEventHandler } from 'react';
import { HiOutlineTag, HiTag } from 'react-icons/hi';
import { Button, Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import { TooltipWrapper } from '@/components';
import { ICON_SIZE } from '@/constants';
import { DeviceObject, TagMapping } from '@/interfaces';
import { useAppStore, useTagsStore } from '@/stores';
import DeviceTagsForm from './DeviceTagsForm';

interface TagsProps {
  device: DeviceObject;
}

const TagsCell = ({ device }: TagsProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const { tags } = useTagsStore();
  const { color } = useAppStore();
  const tagsById: TagMapping = tags.reduce((acc, tag) => ({ ...acc, [tag.id]: tag.name }), {});
  if (!device) {
    return null;
  }

  const label = device.tags?.map((tag) => tagsById[tag.id]).join(', ') || 'no tags';

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
    <TooltipWrapper label={label}>
      <Popover withArrow trapFocus position="bottom" shadow="md" width={300} opened={opened}>
        <Popover.Target>
          <Button
            variant="transparent"
            onClick={open}
            p="0.125rem"
            className={`${classes['cursor-pointer']} ${classes['middle-center']} ${classes['theme-match']}`}
            data-testid={`${device.mqtt_id}-tags-button`}
          >
            {device.tags?.length ? (
              <HiTag color={color} size={ICON_SIZE} />
            ) : (
              <HiOutlineTag color="gray" size={ICON_SIZE} />
            )}
          </Button>
        </Popover.Target>
        <Popover.Dropdown ref={ref} onKeyDown={onKeyDown}>
          <DeviceTagsForm device={device} close={close} />
        </Popover.Dropdown>
      </Popover>
    </TooltipWrapper>
  );
};

export default TagsCell;
