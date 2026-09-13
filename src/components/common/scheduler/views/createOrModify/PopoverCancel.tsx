import { Button, Flex, Popover, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useAppStore } from '@/stores';
import { JobFormValuesType } from '../../interfaces';

const PopoverCancel = ({
  form,
  close,
}: {
  form: ReturnType<typeof useForm<JobFormValuesType>>;
  close: () => void;
}) => {
  const { color } = useAppStore();
  const [opened, { open, close: closePopover }] = useDisclosure(false);

  const handleCancel = () => {
    if (form.isDirty()) {
      open();
    } else {
      close();
    }
  };

  return (
    <Popover opened={opened}>
      <Popover.Target>
        <Button color="gray" onClick={handleCancel}>
          Cancel
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Flex direction="column" gap="md">
          <Text>Are you sure you want to cancel?</Text>
          <Flex justify="space-between">
            <Button onClick={close} color="red">
              Yes
            </Button>
            <Button color={color} onClick={closePopover}>
              No
            </Button>
          </Flex>
        </Flex>
      </Popover.Dropdown>
    </Popover>
  );
};

export default PopoverCancel;
