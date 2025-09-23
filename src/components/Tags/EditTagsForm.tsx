import { Button, TextInput, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import useTagsStore from "@/useTagsStore";
import { useState } from 'react';

const MIN_TAG_LENGTH = 3;


const EditTagsForm = ({ close }: { close: () => void }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { tags } = useTagsStore();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      id: null,
      name: '',
    },
    onValuesChange: (values) => {
      console.log('values', values);
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
    console.log('values', values);
    close();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <div className="flex gap-2">
        <TextInput
          label="Edit Tag Name"
          key={form.key('name')}
          {...form.getInputProps('name')}    
        />
        <Button
          disabled={!form.isValid()}
          type="submit"
        >
          Save
          {loading && <Loader size="0.75rem" />}
        </Button>
        <Button variant="default" onClick={close}>Cancel</Button>
      </div>
    </form>
  );
};

export default EditTagsForm;
