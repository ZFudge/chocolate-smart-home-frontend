import { Flex, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { JobFormValuesType } from '../../interfaces';
import { SCHEDULE_TYPE_OPTIONS } from '../constants';
import CronFields from './CronFields';

const SchedulerFields = ({ form }: { form: ReturnType<typeof useForm<JobFormValuesType>> }) => {
  const { color } = useAppStore();

  return (
    <Flex direction="column" gap="sm">
      <Select
        label="Schedule Type"
        placeholder="Choose Schedule Type"
        data-testid="trigger-type-select"
        data={SCHEDULE_TYPE_OPTIONS}
        comboboxProps={{ withinPortal: false }}
        styles={getTextInputStyles(color)}
        onChange={(value) => {
          const schedulerKwargs = form.getValues().schedulerKwargs;
          schedulerKwargs.trigger = value;
          form.setFieldValue('scheduler_kwargs', schedulerKwargs);
        }}
        value={form.values.schedulerKwargs.trigger}
      />
      {form.values.schedulerKwargs.trigger === 'cron' && <CronFields form={form} />}
    </Flex>
  );
};

export default SchedulerFields;
