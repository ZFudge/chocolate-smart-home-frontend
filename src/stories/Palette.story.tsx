import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { NeoPixelObject } from '@/components/NeoPixels/interfaces';
import PaletteModal from '@/components/NeoPixels/PaletteModal';

const device: NeoPixelObject = {
  id: 1,
  mqtt_id: 1,
  name: 'NeoPixel Name 1',
  device_type_name: 'neo_pixel',
  online: true,
  last_seen: null,
  tags: [
    {
      id: 1,
      name: 'bedroom',
    },
  ],
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

const meta: Meta<typeof PaletteModal> = {
  component: PaletteModal,
};

export default meta;
type Story = StoryObj<typeof PaletteModal>;

export const PaletteModalStory: Story = {
  args: {
    devices: [device],
    close: fn(),
  },
};
