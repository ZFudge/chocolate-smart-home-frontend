import { HiTag } from "react-icons/hi";
import { Device } from "@/interfaces";
import CreateNewTagForm from "./CreateNewTagForm";
import ExistingTagsForm from "./ExistingTagsForm";
import { Divider, SimpleGrid } from "@mantine/core";


const TagsForm = ({ device }: { device: Device }) => {
  return (
    <SimpleGrid
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      <span>
        <HiTag /> Tags:
      </span>
      <ExistingTagsForm device={device} />
      <Divider my="sm" />
      <CreateNewTagForm device={device} />
    </SimpleGrid>
  );
};

export default TagsForm;
