import { useEffect, useState } from 'react';
import { Button, Flex, Loader } from '@mantine/core';
import { useAppStore } from '@/stores';
import { Job } from '../../interfaces';
import useSchedulerStore from '../../useSchedulerStore';
import JobsTable from './JobsTable';
import PlusIcon from './PlusIcon';

const DefaultView = ({ close }: { close: () => void }) => {
  const { color } = useAppStore();
  const { addJob } = useSchedulerStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobs = async () => {
      const response = await fetch('/scheduler/');
      if (!response.ok) {
        console.error(response.statusText); // eslint-disable-line no-console
        return;
      }
      const data = await response.json();
      data.forEach((job: Job) => addJob(job));
      setLoading(false);
    };
    getJobs();
  }, [addJob]);

  return (
    <Flex direction="column" gap="xl">
      {loading ? <Loader color={color} /> : <JobsTable />}
      <Flex justify="space-between">
        <PlusIcon />
        <Button onClick={close} color={color} data-testid="scheduler-close-button">
          Close
        </Button>
      </Flex>
    </Flex>
  );
};

export default DefaultView;
