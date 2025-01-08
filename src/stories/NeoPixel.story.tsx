import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import NeoPixelTable from '@/components/NeoPixels/NeoPixelTable';
import { neoPixelsMockData } from '@/tests/placeholder-data/';

const meta: Meta<typeof NeoPixelTable> = {
  component: NeoPixelTable,
};

export default meta;
type Story = StoryObj<typeof NeoPixelTable>;

export const MixedView: Story = {
  args: {
    neoPixelData: neoPixelsMockData,
    onClick: fn(),
  },
};
