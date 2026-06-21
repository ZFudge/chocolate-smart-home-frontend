import { act, fireEvent, render } from '@test-utils';
import { vi } from 'vitest';
import { NeoPixelObject } from '@/components/devices/NeoPixels/interfaces';
import PaletteModal from '@/components/devices/NeoPixels/PaletteModal';
import useNeoPixelStore from '@/components/devices/NeoPixels/useNeoPixelStore';
import { useDevicesStore } from '@/stores';
import { neoPixelsMockData } from './placeholder-data';

vi.mock('@/lib/api', { spy: true });
vi.mock('@/components/devices/NeoPixels/PaletteModal/presets/utils', () => ({
  getPresets: vi.fn(),
}));

const device: NeoPixelObject = neoPixelsMockData[1];

describe('Palette Modal component', () => {
  beforeEach(() => {
    useDevicesStore.setState({
      devices: neoPixelsMockData,
    });
    useNeoPixelStore.setState({
      neoPixelDevices: neoPixelsMockData,
      selectedPaletteDevices: 1,
    });
  });
  afterEach(vi.clearAllMocks);

  it('should handle submit button click', async () => {
    const { getByTestId } = render(<PaletteModal />);
    const submitButton: HTMLElement = getByTestId('palette-modal-submit-button');
    const apiModule = await import('@/lib/api');
    act(() => {
      fireEvent.click(submitButton);
    });
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      mqtt_id: device.mqtt_id,
      value: device.plugin.palette,
      name: 'palette',
      device_type_name: 'neo_pixel',
    });
  });

  it('should submit the modified palette value after initial input is changed', async () => {
    const { getByTestId } = render(<PaletteModal />);
    const firstColorInput: HTMLElement = getByTestId('palette-display-color-input-0');
    const submitButton: HTMLElement = getByTestId('palette-modal-submit-button');
    const apiModule = await import('@/lib/api');
    act(() => {
      fireEvent.change(firstColorInput, { target: { value: '#332211' } });
      fireEvent.click(submitButton);
    });
    expect((firstColorInput as HTMLInputElement).value).toBe('#332211');
    const expectedPaletteValue: string[] = ['#332211'].concat(device.plugin.palette.slice(1));
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      mqtt_id: device.mqtt_id,
      value: expectedPaletteValue,
      name: 'palette',
      device_type_name: 'neo_pixel',
    });
  });

  it('should reset form fields to its initial values after reset button click', async () => {
    const { getByTestId } = render(<PaletteModal />);
    const firstColorInput: HTMLElement = getByTestId('palette-display-color-input-0');
    const resetButton: HTMLElement = getByTestId('palette-modal-reset-button');
    const submitButton: HTMLElement = getByTestId('palette-modal-submit-button');
    const apiModule = await import('@/lib/api');
    act(() => {
      fireEvent.change(firstColorInput, { target: { value: '#332211' } });
      fireEvent.click(resetButton);
      fireEvent.click(submitButton);
    });
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      mqtt_id: device.mqtt_id,
      value: device.plugin.palette,
      name: 'palette',
      device_type_name: 'neo_pixel',
    });
  });
});
