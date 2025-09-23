import { useState } from "react";
import { Button, Loader, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { Tag } from "@/interfaces";
import useTagsStore from "@/useTagsStore";

const MIN_TAG_LENGTH = 3;

const CreateNewTagForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, { close, open }] = useDisclosure(false);
  const { addTagsData, tags } = useTagsStore();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
    },
    validateInputOnChange: true,
    validate: {
      name: (value) => {
        if (value.length < MIN_TAG_LENGTH) {
          return 'Tag must be at least 3 characters long';
        }
        if (Object.values(tags).map((tag) => tag.name).includes(value)) {
          return 'Tag already exists';
        }
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const { name } = values;
    setLoading(true);
    const response = await fetch('/api/tags/', {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    const data = await response.json();
    addTagsData([...Object.values(tags), data as Tag]);
    form.reset();
    close();
    setLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      {!opened && <Button onClick={open} variant="default">New Tag</Button>}
      {opened && (
        <div className="flex gap-2">
          New Tag:
          <TextInput
            label="Tag Name"
            key={form.key('name')}
            {...form.getInputProps('name')}    
          />
          <Button
            disabled={!form.isValid() || loading}
            type="submit"
          >
            Create
            {loading && <Loader size="0.75rem" />}
          </Button>
          <Button variant="default" onClick={close}>Cancel</Button>
        </div>
      )}
    </form>
  );
};

export default CreateNewTagForm;
