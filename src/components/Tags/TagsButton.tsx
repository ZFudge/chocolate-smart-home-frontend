import { ImPriceTags } from 'react-icons/im';
import { Button, Popover } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '@/App.module.css';
import TagsForm from './TagsForm';

const TagsButton = () => {
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <div className={classes['cursor-pointer']}>
      <Popover withArrow trapFocus position="bottom" shadow="md" width={300} opened={opened}>
        <Popover.Target>
          <Button variant="transparent" onClick={open} style={{ height: '100%' }}>
            <ImPriceTags size={16} />
          </Button>
        </Popover.Target>
        <Popover.Dropdown>
          <TagsForm close={close} />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
};

export default TagsButton;
