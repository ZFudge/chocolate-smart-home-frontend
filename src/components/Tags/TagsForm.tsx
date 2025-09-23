import { Button, Divider, Flex, Stack } from "@mantine/core";
import { useState } from "react";
import EditTagsForm from "./EditTagsForm";
import NewTagForm from "./NewTagForm";
import { FaEdit, FaPlusCircle } from "react-icons/fa";

const NewTagButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="default" onClick={onClick}>
    <FaPlusCircle />
    New Tag
  </Button>
);

const EditTagButton = ({ onClick }: { onClick: () => void }) => (
  <Button variant="default" onClick={onClick}>
    <FaEdit />
    Edit Tag
  </Button>
);

const TagsForm = () => {
  const [activeForm, setActiveForm] = useState<'edit' | 'new' | null>(null);

  return (
    <Stack>
      <Flex gap="md">
        <EditTagButton onClick={() => setActiveForm('edit')} />
        <Divider orientation="vertical" my="sm" />
        <NewTagButton onClick={() => setActiveForm('new')} />
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
