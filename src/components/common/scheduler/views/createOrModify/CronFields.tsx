import { Flex, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { JobFormValuesType } from '../../interfaces';
import { CRON_TYPES } from '../constants';

const CronFields = ({ form }: { form: UseFormReturnType<JobFormValuesType> }) => {
  const { color } = useAppStore();

  const handleCronUpdate = (fieldName: string, value: string) => {
    const schedulerKwargs = form.getValues().schedulerKwargs;
    schedulerKwargs[fieldName] = value;
    form.setFieldValue('schedulerKwargs', schedulerKwargs);
  };

  return (
    <Flex gap="sm">
      {CRON_TYPES.map((cronType) => (
        <TextInput
          key={cronType}
          label={cronType.charAt(0).toUpperCase() + cronType.slice(1)}
          placeholder={cronType.charAt(0).toUpperCase() + cronType.slice(1)}
          data-testid={`${cronType}-input`}
          styles={getTextInputStyles(color)}
          onChange={({ target }) => handleCronUpdate(cronType, target.value)}
          value={form.values.schedulerKwargs[cronType] || ''}
          error={
            form.errors.scheduler_kwargs?.[cronType as keyof typeof form.errors.scheduler_kwargs]
          }
        />
      ))}
    </Flex>
  );
};

export default CronFields;
