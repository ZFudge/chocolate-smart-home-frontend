import { Button, Loader, Popover, TextInput } from "@mantine/core";
import { Device, Tag, TagMapping } from "@/interfaces";
import { useState } from "react";
import { useClickOutside, useDisclosure } from "@mantine/hooks";
import useTagsStore from "@/useTagsStore";


const CreateNewTagForm = ({ device }: { device: Device }) => {
  // const [tags, setTags] = useState<string[]>(device.tags || []);
  const [newTag, setNewTag] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());
  const { addTagsData, tags } = useTagsStore();

  const handleAddTag = async () => {
    // setTags([...tags, newTag]);
    // setNewTag("");
    setLoading(true);
    const response = await fetch('/api/tags/', {
      method: "POST",
      body: JSON.stringify({ name: newTag }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      console.error(response.statusText);
      return;
    }
    const data = await response.json();
    console.log(data);
    addTagsData([...tags, data as Tag]);
    close();
    setLoading(false);
    // setNewTag("");
  };

  return (
    <div>
      {!opened && <Button onClick={open} variant="default">New Tag</Button>}
      {opened && (
        <div className="flex gap-2">
          New Tag:
          <TextInput value={newTag} onChange={(e) => setNewTag(e.target.value)} />
          <Button disabled={!newTag} onClick={handleAddTag}>
            Create{loading && <Loader size="0.75rem" />}
          </Button>  
        </div>
      )}
    </div>
  );

  // return (
  //   <Popover width={300} trapFocus position="bottom" withArrow shadow="md" opened={opened}>
  //     <Popover.Target>
  //       <Button onClick={open}>Create New Tag</Button>
  //     </Popover.Target>
  //     <Popover.Dropdown ref={ref}>
  //       <div className="flex gap-2">
  //         <TextInput value={newTag} onChange={(e) => setNewTag(e.target.value)} />
  //         <Button disabled={!newTag} onClick={handleAddTag}>Add</Button>
  //       </div>
  //     </Popover.Dropdown>
  //   </Popover>
  // );
};

export default CreateNewTagForm;
