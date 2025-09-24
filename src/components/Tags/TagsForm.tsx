import { useState } from 'react';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import { Button, CloseButton, Divider, Flex, Stack } from '@mantine/core';
import EditTagsForm from './EditTagsForm';
import NewTagForm from './NewTagForm';

const NewTagButton = ({ onClick, isPrimary }: { onClick: () => void; isPrimary: boolean }) => (
  <Button
    variant={isPrimary ? 'primary' : 'default'}
    onClick={onClick}
    data-testid="new-tag-button"
  >
    <FaPlusCircle />
    &nbsp;New Tag
  </Button>
);

const EditTagButton = ({ onClick, isPrimary }: { onClick: () => void; isPrimary: boolean }) => (
  <Button
    variant={isPrimary ? 'primary' : 'default'}
    onClick={onClick}
    data-testid="edit-tag-button"
  >
    <FaEdit />
    &nbsp;Edit Tag
  </Button>
);

const TagsForm = ({ close }: { close: () => void }) => {
  const [activeForm, setActiveForm] = useState<'edit' | 'new' | null>(null);

  return (
    <Stack>
      <CloseButton onClick={close} />
      <Flex gap="md">
        <NewTagButton isPrimary={activeForm === 'new'} onClick={() => setActiveForm('new')} />
        <Divider orientation="vertical" />
        <EditTagButton isPrimary={activeForm === 'edit'} onClick={() => setActiveForm('edit')} />
      </Flex>
      {activeForm && (
        <>
          <Divider my="sm" />
          {activeForm === 'new' && <NewTagForm close={() => setActiveForm(null)} />}
          {activeForm === 'edit' && <EditTagsForm close={() => setActiveForm(null)} />}
        </>
      )}
    </Stack>
  );
};

export default TagsForm;
