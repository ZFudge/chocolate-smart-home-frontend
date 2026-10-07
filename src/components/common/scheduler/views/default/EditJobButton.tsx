import { FaPencil } from 'react-icons/fa6';
import { ActionIcon, Tooltip } from '@mantine/core';
import { useAppStore } from '@/stores';
import { Job } from '../../interfaces';
import useSchedulerStore from '../../useSchedulerStore';

const EditJobButton = ({ job }: { job: Job }) => {
  const { color } = useAppStore();
  const { setEditJob } = useSchedulerStore();

  return (
    <Tooltip label="Edit" position="bottom">
      <ActionIcon
        variant="transparent"
        color={color}
        size="xl"
        data-testid="scheduler-edit-job-button"
        onClick={() => setEditJob(job.job_id)}
      >
        <FaPencil size={15} />
      </ActionIcon>
    </Tooltip>
  );
};

export default EditJobButton;
