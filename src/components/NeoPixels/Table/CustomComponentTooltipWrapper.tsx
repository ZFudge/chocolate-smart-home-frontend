import { Tooltip, TooltipProps } from '@mantine/core';

const CustomComponentTooltipWrapper = (props: TooltipProps) => {
  /* Wraps custom components in nested span tag to prevent ref error
  https://mantine.dev/core/tooltip/#tooltip-children */
  return (
    <Tooltip {...props}>
      <span>{props.children}</span>
    </Tooltip>
  );
};

export default CustomComponentTooltipWrapper;
