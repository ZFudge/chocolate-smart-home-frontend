import { useState } from 'react';
import { Button, Checkbox, Flex, TextInput, Title } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { DeviceObject, SchedulerFormFields } from '@/interfaces';
import { notifyJobCreateFailed, notifyJobCreateSuccess } from '@/lib/notifications';
import { useAppStore } from '@/stores';
import { Job, JobFormValuesType, JobRequestData } from '../../interfaces';
import useSchedulerStore from '../../useSchedulerStore';
import { CRON_TYPES } from '../constants';
import PopoverCancel from './PopoverCancel';
import SchedulerFields from './SchedulerFields';

const CreateOrModifyJobForm = ({
  devices,
  deviceTypeName,
  Fields,
  valueKey,
}: {
  devices: DeviceObject[];
  deviceTypeName: string;
  Fields: SchedulerFormFields;
  valueKey?: string;
}) => {
  const { color } = useAppStore();
  const { addJob, editJob, setEditJob, setView } = useSchedulerStore();
  const [loading, setLoading] = useState<boolean>(false);
  const isNewJob = editJob === null;

  const close = () => {
    setView('default');
    setEditJob(null);
  };

  const form = useForm<JobFormValuesType>({
    initialValues: {
      job_id: editJob?.job_id || null,
      name: editJob?.name || '',
      mqtt_ids: editJob?.mqtt_ids.map((mqtt_id) => mqtt_id.toString()) || [],
      key: valueKey || '',
      value: editJob?.message_kvp.value || null,
      schedulerKwargs: editJob?.scheduler_kwargs || {},
      active: editJob?.active ?? true,
    },
    validateInputOnChange: true,
    validate: {
      name: isNotEmpty('Name is required'),
      value: isNotEmpty('Value is required'),
      schedulerKwargs: (kwargs) => {
        if (kwargs.trigger === 'cron') {
          for (let i = 0; i < CRON_TYPES.length; i++) {
            const cronType = CRON_TYPES[i];
            if (kwargs[cronType] && kwargs[cronType].replace(/(\*|\/|\d){0,}/, '')) {
              return `${cronType} is formatted incorrectly`;
            }
          }
          return null;
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const requestData: JobRequestData = {
      device_type_name: deviceTypeName,
      name: values.name,
      mqtt_ids: values.mqtt_ids.map(Number),
      message_kvp: {
        key: values.key,
        value: values.value,
      },
      scheduler_kwargs: values.schedulerKwargs,
      active: values.active,
    };
    if (!isNewJob && values.job_id) {
      requestData.job_id = values.job_id;
    }
    const response = await fetch('/scheduler/', {
      method: isNewJob ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    if (!response.ok) {
      console.error(response.statusText); // eslint-disable-line no-console
      notifyJobCreateFailed(values.name);
      setLoading(false);
      return;
    }
    const responseData: Job = await response.json();
    addJob(responseData);
    notifyJobCreateSuccess(values.name);
    close();
    setLoading(false);
  };

  return (
    <Flex gap="md" direction="column">
      <Title>{isNewJob ? 'Create New Job' : 'Modify Job'}</Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Flex direction="column" gap="lg">
          <Flex justify="space-between" gap="sm">
            <TextInput label="Name" {...form.getInputProps('name')} />
          </Flex>
          <Flex justify="space-between">
            <Checkbox.Group
              label={`Select ${deviceTypeName} Devices`}
              color={color}
              {...form.getInputProps('mqtt_ids')}
            >
              {devices.map((device) => (
                <Checkbox
                  mt="sm"
                  color={color}
                  key={device.mqtt_id}
                  value={device.mqtt_id.toString()}
                  label={device.name}
                />
              ))}
            </Checkbox.Group>
          </Flex>
          <Flex direction="column" gap="sm">
            <Title order={6}>Device Fields</Title>
            <Fields form={form} />
          </Flex>
          <Flex justify="space-between">
            <SchedulerFields form={form} />
          </Flex>
          <Flex justify="space-between">
            <Checkbox
              mt="sm"
              color={color}
              label={<div>Active</div>}
              labelPosition="left"
              onChange={({ target }) => form.setFieldValue('active', target.checked)}
              checked={form.values.active === true}
            />
          </Flex>
          <Flex justify="space-between">
            <Button
              type="submit"
              color={color}
              data-testid="scheduler-save-button"
              loading={loading}
              disabled={!form.isValid() || !form.isDirty()}
            >
              {isNewJob ? 'Create' : 'Save Changes'}
            </Button>
            <PopoverCancel form={form} close={close} />
          </Flex>
        </Flex>
      </form>
    </Flex>
  );
};

export default CreateOrModifyJobForm;
