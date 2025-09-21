import classes from '@/App.module.css';
import { HiTag } from 'react-icons/hi';
import TooltipWrapper from '../TooltipWrapper';
import { Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import TagsForm from './TagsForm';
import { Device } from '@/interfaces';

interface TagsProps {
  device: Device;
}

const TagsCell = ({ device }: TagsProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  console.log(device);

  if (!device) return null;

  return (
    <div className={classes['cursor-pointer']} onClick={open}>
      <TooltipWrapper label={device.tags || null}>
        <Popover withArrow trapFocus position="bottom" shadow="md" 
          width={300}
          opened={opened}
          closeOnClickOutside={false}
        >
          <Popover.Target>
            <div>
              <HiTag />
            </div>
          </Popover.Target>
          <Popover.Dropdown ref={ref}>
            <TagsForm device={device} />
          </Popover.Dropdown>
        </Popover>
      </TooltipWrapper>
    </div>
  );
};

export default TagsCell;
