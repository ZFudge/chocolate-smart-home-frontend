import { Flex, Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { JobFormValuesType } from '../../interfaces';
import { SCHEDULE_TYPE_OPTIONS } from '../constants';
import CronFields from './CronFields';
import DateFields from './DateFields';
import Time from './Time';

const SchedulerFields = ({ form }: { form: UseFormReturnType<JobFormValuesType> }) => {
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
        onChange={(value) => form.setFieldValue('schedulerKwargs', { trigger: value })}
        value={form.values.schedulerKwargs.trigger}
      />
      {form.values.schedulerKwargs.trigger === 'cron' && <CronFields form={form} />}
      {form.values.schedulerKwargs.trigger === 'date' && <DateFields form={form} />}
      {form.values.schedulerKwargs.trigger === 'time' && <Time form={form} />}
    </Flex>
  );
};

export default SchedulerFields;
