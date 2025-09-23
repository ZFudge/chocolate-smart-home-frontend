import { useClickOutside, useDisclosure } from "@mantine/hooks";
import { Button, Popover } from "@mantine/core";
import { HiTag } from "react-icons/hi";
import classes from '@/App.module.css';
import TagsForm from "./TagsForm";

const TagsButton = () => {
  const [opened, { close, open }] = useDisclosure(false);
  const ref = useClickOutside(() => close());

  return (
    <div className={classes['cursor-pointer']}>
      <Popover withArrow trapFocus position="bottom" shadow="md" 
        width={300}
        opened={opened}
        closeOnClickOutside={false}
      >
        <Popover.Target>
          <Button variant="transparent" onClick={open} style={{ height: '100%' }}>
            <HiTag />
          </Button>
        </Popover.Target>
        <Popover.Dropdown ref={ref}>
          <TagsForm/>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default TagsButton;
