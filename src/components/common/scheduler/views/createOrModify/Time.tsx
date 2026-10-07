import { TimePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { getTextInputStyles } from '@/lib/utils';
import { useAppStore } from '@/stores';
import { JobFormValuesType } from '../../interfaces';

const Time = ({ form }: { form: UseFormReturnType<JobFormValuesType> }) => {
  const { color } = useAppStore();

  const handleTimeUpdate = (value: string) => {
    const schedulerKwargs = form.getValues().schedulerKwargs;
    schedulerKwargs.time = value;
    form.setFieldValue('schedulerKwargs', schedulerKwargs);
  };

  return (
    <TimePicker
      color={color}
      styles={getTextInputStyles(color)}
      label="Time"
      data-testid="time-input"
      withDropdown
      format="12h"
      popoverProps={{
        width: 'target',
      }}
      onChange={handleTimeUpdate}
      value={form.values.schedulerKwargs.time}
    />
  );
};

export default Time;
