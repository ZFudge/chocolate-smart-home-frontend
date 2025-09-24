import classes from '@/App.module.css';
import { CiNoWaitingSign } from "react-icons/ci";
import { HiTag } from 'react-icons/hi';
import { Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import TooltipWrapper from '../TooltipWrapper';
import { Device, TagMapping } from '@/interfaces';
import DeviceTagsForm from './DeviceTagsForm';
import useTagsStore from '@/useTagsStore';

interface TagsProps {
  device: Device;
}

const TagsCell = ({ device }: TagsProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const { tags } = useTagsStore();
  const tagsById: TagMapping = tags.reduce((acc, tag) => ({...acc, [tag.id]: tag.name}), {});
  if (!device) return null;

  const label = device.tags?.map((tag) => tagsById[tag.id]).join(', ') || null;

  return (
    <TooltipWrapper label={label || <CiNoWaitingSign />}>
      <Popover withArrow trapFocus position="bottom" shadow="md" 
        width={300}
        opened={opened}
        closeOnClickOutside={false}
      >
        <Popover.Target>
          <div
            onClick={open}
            className={`${classes['cursor-pointer']} ${classes['middle-center']}`}
            data-testid={`${device.mqtt_id}-tags-button`}
          >
            <HiTag />
          </div>
        </Popover.Target>
        <Popover.Dropdown ref={ref}>
          <DeviceTagsForm device={device} close={close} />
        </Popover.Dropdown>
      </Popover>
    </TooltipWrapper>
  );
};

export default TagsCell;
