import { Tooltip, TooltipProps } from '@mantine/core';

const TooltipWrapper = (props: TooltipProps) => {
  return (
    <Tooltip {...props}>
      <span>{props.children}</span>
    </Tooltip>
  );
};

export default TooltipWrapper;
