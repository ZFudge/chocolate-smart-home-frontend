import type { Meta, StoryObj } from '@storybook/react';
import PalettePresets from '@/components/NeoPixels/PaletteModal/presets/PalettePresets';
import { palettePresetsMockData } from '@/tests/placeholder-data';

const meta: Meta<typeof PalettePresets> = {
  component: PalettePresets,
};

export default meta;
type Story = StoryObj<typeof PalettePresets>;

export const PalettePresetsStory: Story = {
  args: {
    presets: palettePresetsMockData,
  },
};
