import { HiTag } from "react-icons/hi";
import { Device } from "@/interfaces";
import CreateNewTagForm from "./CreateNewTagForm";
import ExistingTagsForm from "./ExistingTagsForm";
import { Divider, SimpleGrid } from "@mantine/core";


const TagsForm = ({ device, close }: { device: Device, close: () => void }) => {
  return (
    <SimpleGrid
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      <span>
        <HiTag /> Tags:
      </span>
      <ExistingTagsForm device={device} close={close} />
      <Divider my="sm" />
      <CreateNewTagForm />
    </SimpleGrid>
  );
};

export default TagsForm;
