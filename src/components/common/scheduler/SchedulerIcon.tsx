import { RiCalendarScheduleFill } from 'react-icons/ri';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ICON_SIZE } from '@/constants';
import { DeviceObject, SchedulerFormFields } from '@/interfaces';
import { useAppStore } from '@/stores';
import Scheduler from './Scheduler';

const SchedulerIcon = ({
  deviceTypeName,
  devices,
  Fields,
  valueKey,
}: {
  deviceTypeName: string;
  devices: DeviceObject[];
  Fields: SchedulerFormFields;
  valueKey?: string;
}) => {
  const { color } = useAppStore();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Tooltip label="View/Edit/Add Scheduled Tasks">
        <ActionIcon
          variant="transparent"
          size="xl"
          color={color}
          onClick={open}
          data-testid="scheduler-icon"
        >
          <RiCalendarScheduleFill size={ICON_SIZE} />
        </ActionIcon>
      </Tooltip>
      {opened && (
        <Scheduler
          Fields={Fields}
          close={close}
          deviceTypeName={deviceTypeName}
          devices={devices}
          valueKey={valueKey}
        />
      )}
    </>
  );
};

export default SchedulerIcon;
