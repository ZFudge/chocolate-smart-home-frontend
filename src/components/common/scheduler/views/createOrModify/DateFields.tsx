import { DateTimePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { JobFormValuesType } from '../../interfaces';

const DateFields = ({ form }: { form: UseFormReturnType<JobFormValuesType> }) => {
  const handleDateUpdate = (value: string | null) => {
    const schedulerKwargs = form.getValues().schedulerKwargs;
    schedulerKwargs.run_date = value;
    form.setFieldValue('schedulerKwargs', schedulerKwargs);
  };

  return (
    <DateTimePicker
      label="Run Date"
      placeholder="Choose Run Date"
      data-testid="run-date-input"
      timePickerProps={{
        withDropdown: true,
        popoverProps: { withinPortal: false },
        format: '12h',
      }}
      onChange={(value: string | null) => handleDateUpdate(value)}
      value={form.values.schedulerKwargs.run_date}
    />
  );
};

export default DateFields;
