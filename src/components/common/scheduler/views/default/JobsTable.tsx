import { Table } from '@mantine/core';
import useSchedulerStore from '../../useSchedulerStore';
import JobRow from './JobRow';

const JobsTable = () => {
  const { jobs } = useSchedulerStore();

  if (Object.keys(jobs).length === 0) {
    return <div>No jobs found</div>;
  }

  return (
    <Table withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Key</Table.Th>
          <Table.Th>Value</Table.Th>
          <Table.Th>Devices</Table.Th>
          <Table.Th>Schedule</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th />
          <Table.Th />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.values(jobs).map((job) => (
          <JobRow key={job.job_id} job={job} />
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default JobsTable;
