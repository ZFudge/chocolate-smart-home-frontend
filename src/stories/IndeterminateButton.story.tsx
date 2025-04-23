import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { FaPowerOff } from 'react-icons/fa';
import IndeterminateButton from '@/components/IndeterminateButton';
import { neoPixelsMockData } from '@/tests/placeholder-data/';

const meta: Meta<typeof IndeterminateButton> = {
  component: IndeterminateButton,
};

export default meta;
type Story = StoryObj<typeof IndeterminateButton>;

export const IndeterminateButtonStory: Story = {
  args: {
    settingName: 'on',
    Icon: FaPowerOff,
    selection: [1, 2, 3],
  },
};
