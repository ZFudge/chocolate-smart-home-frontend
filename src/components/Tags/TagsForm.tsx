import { HiTag } from "react-icons/hi";
import { Device } from "@/interfaces";
import CreateNewTagForm from "./CreateNewTagForm";
import ExistingTagsForm from "./ExistingTagsForm";


const TagsForm = ({ device }: { device: Device }) => {
  return (
    <div className="flex gap-2">
      <HiTag /> Tags:
      <ExistingTagsForm device={device} />
      <CreateNewTagForm device={device} />
    </div>
  );
};

export default TagsForm;
