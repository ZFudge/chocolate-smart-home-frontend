import { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { TbTagPlus } from 'react-icons/tb';
import { Button, CloseButton, Container, Divider, Flex, Space, Stack, Text } from '@mantine/core';
import { getDividerColor } from '@/lib/utils';
import { useAppStore } from '@/stores';
import CreateTagForm from './CreateTagForm';
import EditTagsForm from './EditTagsForm';

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
      <Text>{name} Tag</Text>
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
            icon={<TbTagPlus size={20} />}
            onClick={() => setActiveForm('new')}
            isPrimary={activeForm === 'new'}
          />
          <Divider orientation="vertical" color={getDividerColor(color)} />
          <TagButton
            name="Edit"
            icon={<FaEdit size={20} />}
            onClick={() => setActiveForm('edit')}
            isPrimary={activeForm === 'edit'}
          />
        </Flex>
        {activeForm && (
          <>
            <Divider my="xs" color={getDividerColor(color)} />
            {activeForm === 'new' && <CreateTagForm close={() => setActiveForm(null)} />}
            {activeForm === 'edit' && <EditTagsForm close={() => setActiveForm(null)} />}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default TagsForm;
