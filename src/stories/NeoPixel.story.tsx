import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import NPTable from '@/components/NeoPixels/Table/NPTable';
import { neoPixelsMockData } from '@/tests/placeholder-data/';

const meta: Meta<typeof NPTable> = {
  component: NPTable,
};

export default meta;
type Story = StoryObj<typeof NPTable>;

export const MixedView: Story = {
  args: {
    devices: Object.values(neoPixelsMockData),
    onClick: fn(),
  },
};

export const Empty: Story = {
  args: {
    devices: [],
    onClick: fn(),
  },
};
