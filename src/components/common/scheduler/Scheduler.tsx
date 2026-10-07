import { Modal } from '@mantine/core';
import { DeviceObject, SchedulerFormFields } from '@/interfaces';
import useSchedulerStore from './useSchedulerStore';
import { CreateOrModifyJobForm, DefaultView, VIEWS } from './views';

const Scheduler = ({
  close,
  deviceTypeName,
  devices,
  Fields,
  valueKey,
}: {
  close: () => void;
  deviceTypeName: string;
  devices: DeviceObject[];
  Fields: SchedulerFormFields;
  valueKey?: string;
}) => {
  const { view } = useSchedulerStore();

  return (
    <Modal
      opened
      centered
      withCloseButton={false}
      size="xl"
      title={`Schedule a task for one or more ${deviceTypeName} devices`}
      onClose={close}
      closeOnEscape={false}
      closeOnClickOutside={false}
      data-testid="scheduler-modal"
      styles={{
        header: {
          display: 'flex',
          padding: '1em 1em 1em 2em',
        },
        body: {
          padding: '2em',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        },
      }}
    >
      {view === VIEWS.DEFAULT && <DefaultView close={close} />}
      {[VIEWS.NEW, VIEWS.EDIT].includes(view) && (
        <CreateOrModifyJobForm
          devices={devices}
          deviceTypeName={deviceTypeName}
          valueKey={valueKey}
          Fields={Fields}
        />
      )}
    </Modal>
  );
};

export default Scheduler;
