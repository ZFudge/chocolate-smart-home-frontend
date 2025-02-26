import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SliderForm from '@/components/NeoPixels/SliderForm';
import { neoPixelsMockData } from '@/tests/placeholder-data/';
import { FaPowerOff } from 'react-icons/fa';

const meta: Meta<typeof SliderForm> = {
  component: SliderForm,
};

export default meta;
type Story = StoryObj<typeof SliderForm>;

export const SliderStory: Story = {
  args: {
    name: "ms",
    Icon: FaPowerOff,
    device: neoPixelsMockData["1"],
    close: fn(),
  },
};
