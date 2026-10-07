import { Checkbox, Flex } from '@mantine/core';
import { useForm } from '@mantine/form';
import { JobFormValuesType } from '@/components/common/scheduler/interfaces';

const SchedulerFields = ({ form }: { form: ReturnType<typeof useForm<JobFormValuesType>> }) => {
  return (
    <Flex gap="lg">
      <Checkbox
        label="On"
        onChange={(_) => form.setFieldValue('value', true)}
        checked={form.values.value === true}
      />
      <Checkbox
        label="Off"
        onChange={(_) => form.setFieldValue('value', false)}
        checked={form.values.value === false}
      />
    </Flex>
  );
};

export default SchedulerFields;
