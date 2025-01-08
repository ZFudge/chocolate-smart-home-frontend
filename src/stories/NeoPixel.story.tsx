import { fn } from '@storybook/test';
import { mockNeoPixelsData } from '@/tests/mockData';
import NeoPixelTable from '@/components/NeoPixels/NeoPixelTable';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NeoPixelTable> = {
  component: NeoPixelTable,
};

export default meta;
type Story = StoryObj<typeof NeoPixelTable>;
 
export const MixedView: Story = {
  args: {
    neoPixelData: mockNeoPixelsData,
    onClick: fn(),
  },
};

