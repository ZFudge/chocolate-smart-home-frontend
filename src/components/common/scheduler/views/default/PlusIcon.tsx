import { FaPlus } from 'react-icons/fa';
import { ActionIcon, Tooltip } from '@mantine/core';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import useSchedulerStore from '../../useSchedulerStore';

const PlusIcon = () => {
  const { color } = useAppStore();
  const { setView } = useSchedulerStore();
  const openNewJobForm = () => setView('new');

  return (
    <Tooltip label="Add New Scheduled Task">
      <ActionIcon
        variant="transparent"
        onClick={openNewJobForm}
        color={color}
        data-testid="scheduler-add-job-button"
      >
        <FaPlus size={ICON_SIZE} />
      </ActionIcon>
    </Tooltip>
  );
};

export default PlusIcon;
