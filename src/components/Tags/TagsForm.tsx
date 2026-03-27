import { useState } from 'react';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import { Button, CloseButton, Container, Divider, Flex, Space, Stack } from '@mantine/core';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import EditTagsForm from './EditTagsForm';
import NewTagForm from './NewTagForm';

const TagButton = ({
  name,
  icon,
  onClick,
  isPrimary,
}: {
  name: string;
  icon: React.ReactNode;
  onClick: () => void;
  isPrimary: boolean;
}) => {
  const { color } = useAppStore();

  return (
    <Button
      color={isPrimary ? color : 'black'}
      onClick={onClick}
      data-testid={`${name.toLowerCase()}-tag-button`}
    >
      {icon}
      <Space w="xs" />
      {name} Tag
    </Button>
  );
};

const TagsForm = ({ close }: { close: () => void }) => {
  const [activeForm, setActiveForm] = useState<'edit' | 'new' | null>(null);
  const { color } = useAppStore();

  return (
    <Container p="xs">
      <Stack>
        <CloseButton onClick={close} />
        <Flex gap="md">
          <TagButton
            name="New"
            icon={<FaPlusCircle />}
            onClick={() => setActiveForm('new')}
            isPrimary={activeForm === 'new'}
          />
          <Divider orientation="vertical" color={color} />
          <TagButton
            name="Edit"
            icon={<FaEdit />}
            onClick={() => setActiveForm('edit')}
            isPrimary={activeForm === 'edit'}
          />
        </Flex>
        {activeForm && (
          <>
            <Divider my="xs" color={color} />
            {activeForm === 'new' && <NewTagForm close={() => setActiveForm(null)} />}
            {activeForm === 'edit' && <EditTagsForm close={() => setActiveForm(null)} />}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default TagsForm;
