import classes from '@/App.module.css';
import { CiNoWaitingSign } from "react-icons/ci";
import { HiTag } from 'react-icons/hi';
import { Popover } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import TooltipWrapper from '../TooltipWrapper';
import { Device } from '@/interfaces';
import DeviceTagsForm from './DeviceTagsForm';

interface TagsProps {
  device: Device;
}

const TagsCell = ({ device }: TagsProps) => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  console.log(device);

  if (!device) return null;

  const label = device.tags?.map((tag) => tag?.name).join(', ') || null;

  return (
    <div className={classes['cursor-pointer']} onClick={open}>
      <TooltipWrapper label={label || <CiNoWaitingSign />}>
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
            <DeviceTagsForm device={device} close={close} />
          </Popover.Dropdown>
        </Popover>
      </TooltipWrapper>
    </div>
  );
};

export default TagsCell;
