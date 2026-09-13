import { Badge, Table } from '@mantine/core';
import { useAppStore, useDevicesStore } from '@/stores';
import { Job } from '../../interfaces';
import EditJobButton from './EditJobButton';
import StatusIcon from './StatusIcon';
import TrashJob from './TrashJob';

const JobRow = ({ job }: { job: Job }) => {
  const { color } = useAppStore();
  const { devices } = useDevicesStore();

  return (
    <Table.Tr>
      <Table.Td>{job.name}</Table.Td>
      <Table.Td>{job.message_kvp.key}</Table.Td>
      <Table.Td>{job.message_kvp.value.toString()}</Table.Td>
      <Table.Td>
        {job.mqtt_ids.map((id: string) => (
          <Badge fullWidth key={id} color={color} variant="light">
            {devices[Number(id)]?.name}
          </Badge>
        ))}
      </Table.Td>
      <Table.Td>
        {Object.entries(job.scheduler_kwargs)
          .map(([key, value]) => `${key}=${value}`)
          .join(', ')}
      </Table.Td>
      <Table.Td>
        <StatusIcon job={job} />
      </Table.Td>
      <Table.Td>
        <EditJobButton job={job} />
      </Table.Td>
      <Table.Td>
        <TrashJob job={job} />
      </Table.Td>
    </Table.Tr>
  );
};

export default JobRow;
