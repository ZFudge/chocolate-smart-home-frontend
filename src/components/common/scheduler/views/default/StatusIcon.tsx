import { LuCalendarCheck, LuCalendarOff } from 'react-icons/lu';
import { TbCalendarX } from 'react-icons/tb';
import { ActionIcon, Tooltip } from '@mantine/core';
import { ICON_SIZE } from '@/constants';
import { Job } from '../../interfaces';

type STATUS = 'active' | 'inactive' | 'expired';
const ACTIVE = 'active';
const INACTIVE = 'inactive';
const EXPIRED = 'expired';

const getStatus = (job: Job) => {
  // improve this logic after date is implemented
  if (job.scheduler_kwargs.trigger === 'date' && job.scheduler_kwargs.run_date < new Date()) {
    return EXPIRED;
  }
  if (!job.active) {
    return INACTIVE;
  }
  return ACTIVE;
};

const STATUS_MAPPING = {
  [ACTIVE]: {
    Icon: LuCalendarCheck,
    color: 'blue',
  },
  [INACTIVE]: {
    Icon: LuCalendarOff,
    color: 'gray',
  },
  [EXPIRED]: {
    Icon: TbCalendarX,
    color: 'red',
  },
};

const StatusIcon = ({ job }: { job: Job }) => {
  const status: STATUS = getStatus(job);
  const { Icon, color } = STATUS_MAPPING[status];
  return (
    <Tooltip label={status} position="bottom">
      <ActionIcon variant="transparent" color={color} size="xl">
        <Icon size={ICON_SIZE} />
      </ActionIcon>
    </Tooltip>
  );
};

export default StatusIcon;
