import { HiTag } from 'react-icons/hi';
import TooltipWrapper from './TooltipWrapper';

interface TagsProps {
  space?: string;
}

const Tags = ({ space }: TagsProps) => {
  return (
    <TooltipWrapper label={space || null}>
      <HiTag />
    </TooltipWrapper>
  );
};

export default Tags;
