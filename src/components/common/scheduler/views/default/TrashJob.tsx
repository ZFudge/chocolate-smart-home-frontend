import { KeyboardEventHandler } from 'react';
import { BsTrash3Fill } from 'react-icons/bs';
import { ActionIcon, Button, Flex, Popover, Text, Tooltip } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { ICON_SIZE } from '@/constants';
import { notifyJobDeleteFailed, notifyJobDeleteSuccess } from '@/lib/notifications';
import { useAppStore } from '@/stores';
import { Job } from '../../interfaces';
import useSchedulerStore from '../../useSchedulerStore';

const TrashJob = ({ job }: { job: Job }) => {
  const { color } = useAppStore();
  const { deleteJob: deleteJobFromStore } = useSchedulerStore();
  const [opened, { open, close }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        close();
        break;
      default:
        break;
    }
  };

  const handleDeleteJobRequest = async () => {
    const response = await fetch(`/scheduler/${job.job_id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      console.error(response.statusText); // eslint-disable-line no-console
      notifyJobDeleteFailed(job.name);
      return;
    }
    notifyJobDeleteSuccess(job.name);
    deleteJobFromStore(job.job_id);
    close();
  };

  return (
    <Popover position="right" withArrow shadow="md" opened={opened} trapFocus>
      <Popover.Target>
        <Tooltip label="Delete" position="bottom">
          <ActionIcon
            variant="transparent"
            color={color}
            onClick={open}
            size="xl"
            data-testid={`trash-job-button-${job.job_id}`}
          >
            <BsTrash3Fill size={ICON_SIZE} />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown onKeyDown={onKeyDown} ref={ref}>
        <Flex justify="space-between" direction="column" align="center" gap="sm">
          <div>
            <Text>Are you sure you want to delete this job?</Text>
          </div>
          <Flex w="100%" justify="space-between" align="center" gap="sm">
            <Button color={color} onClick={close}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDeleteJobRequest}>
              <Flex gap="sm" align="center">
                <Text>Delete</Text>
                <BsTrash3Fill />
              </Flex>
            </Button>
          </Flex>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default TrashJob;
