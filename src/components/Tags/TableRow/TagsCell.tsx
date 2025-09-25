import { HiOutlineTag, HiTag } from 'react-icons/hi';
import { Button, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import DeviceTagsForm from '@/components/Tags/TableRow/DeviceTagsForm';
import TooltipWrapper from '@/components/TooltipWrapper';
import { Device, TagMapping } from '@/interfaces';
import useTagsStore from '@/useTagsStore';

interface TagsProps {
  device: Device;
}

const TagsCell = ({ device }: TagsProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const { tags } = useTagsStore();
  const tagsById: TagMapping = tags.reduce((acc, tag) => ({ ...acc, [tag.id]: tag.name }), {});
  if (!device) {
    return null;
  }

  const label = device.tags?.map((tag) => tagsById[tag.id]).join(', ') || 'no tags';

  return (
    <TooltipWrapper label={label}>
      <Popover
        withArrow
        trapFocus
        position="bottom"
        shadow="md"
        width={300}
        opened={opened}
        closeOnClickOutside={false}
      >
        <Popover.Target>
          <Button
            size="compact-xs"
            variant="transparent"
            style={{ padding: '0.125rem' }}
            onClick={open}
            className={`${classes['cursor-pointer']} ${classes['middle-center']}`}
            data-testid={`${device.mqtt_id}-tags-button`}
          >
            {device.tags?.length ? (
              <HiTag color="var(--mantine-color-blue-4)" size={16} />
            ) : (
              <HiOutlineTag color="gray" size={16} />
            )}
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <DeviceTagsForm device={device} close={close} />
        </Popover.Dropdown>
      </Popover>
    </TooltipWrapper>
  );
};

export default TagsCell;
