import { createFormContext } from '@mantine/form';
import { JobFormValuesType } from './interfaces';

const [JobFormProvider, useJobFormContext, useJobForm] = createFormContext<JobFormValuesType>();

export { JobFormProvider, useJobFormContext, useJobForm };
