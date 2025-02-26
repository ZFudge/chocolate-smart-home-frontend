import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import EditPaletteModal from '@/components/NeoPixels/EditPaletteModal';
import { NeoPixelObject } from '@/components/NeoPixels/interfaces';
import { palettePresetsMockData } from '@/tests/placeholder-data';

const device: NeoPixelObject = {
  mqtt_id: 1,
  name: 'NeoPixel Name 1',
  device_type_name: 'neo_pixel',
  space: 'bedroom',
  online: true,
  on: true,
  twinkle: true,
  transform: true,
  white: false,
  ms: 5,
  brightness: 127,
  scheduled: false,
  palette: [
    '#09F09F',
    '#0F90F9',
    '#F90F90',
    '#F09F09',
    '#9F09F0',
    '#90F90F',
    '#FFFFFF',
    '#999999',
    '#000000',
  ],
};

const meta: Meta<typeof EditPaletteModal> = {
  component: EditPaletteModal,
};

export default meta;
type Story = StoryObj<typeof EditPaletteModal>;

export const EditPaletteModalStory: Story = {
  args: {
    device,
    presetOptions: palettePresetsMockData,
    close: fn(),
  },
};
