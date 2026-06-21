import { act, fireEvent, render, userEvent } from '@test-utils';
import NPTable from '@/components/devices/NeoPixels/Table/NeoPixelsTable';
import useNeoPixelStore from '@/components/devices/NeoPixels/useNeoPixelStore';
import { useDevicesStore } from '@/stores';
import { neoPixelsMockData } from './placeholder-data';

vi.mock('@/lib/api', { spy: true });
vi.mock('@/components/devices/NeoPixels/PaletteModal/presets/utils', () => ({
  getPresets: vi.fn(),
}));

describe('NPTable component', () => {
  beforeEach(() => {
    useDevicesStore.setState({
      devices: neoPixelsMockData,
    });
    useNeoPixelStore.setState({
      neoPixelDevices: neoPixelsMockData,
      selectedDevices: [],
    });
  });
  afterEach(vi.clearAllMocks);

  it('should add/remove rows from selection when clicked', async () => {
    const { getByTestId } = render(<NPTable />);
    const firstCheckbox: HTMLElement = getByTestId('1-tr-checkbox');
    const secondCheckbox: HTMLElement = getByTestId('2-tr-checkbox');
    expect(
      firstCheckbox.parentElement?.parentElement?.parentElement?.hasAttribute('data-checked')
    ).toBe(false);
    expect(
      secondCheckbox.parentElement?.parentElement?.parentElement?.hasAttribute('data-checked')
    ).toBe(false);
    act(() => fireEvent.click(firstCheckbox));
    expect(
      firstCheckbox.parentElement?.parentElement?.parentElement?.hasAttribute('data-checked')
    ).toBe(true);
    expect(
      secondCheckbox.parentElement?.parentElement?.parentElement?.hasAttribute('data-checked')
    ).toBe(false);
    act(() => {
      fireEvent.click(firstCheckbox);
      fireEvent.click(secondCheckbox);
    });
    expect(
      firstCheckbox.parentElement?.parentElement?.parentElement?.hasAttribute('data-checked')
    ).toBe(false);
    expect(
      secondCheckbox.parentElement?.parentElement?.parentElement?.hasAttribute('data-checked')
    ).toBe(true);
    act(() => {
      fireEvent.click(secondCheckbox);
    });
    expect(
      firstCheckbox.parentElement?.parentElement?.parentElement?.hasAttribute('data-checked')
    ).toBe(false);
    expect(
      secondCheckbox.parentElement?.parentElement?.parentElement?.hasAttribute('data-checked')
    ).toBe(false);
  });

  it('should call api.postUpdate when power button clicked', async () => {
    const { getByTestId } = render(<NPTable />);
    const powerButton: HTMLElement = getByTestId('1-on-toggle-button');
    const apiModule = await import('@/lib/api');
    act(() => fireEvent.click(powerButton));
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      mqtt_id: 1,
      device_type_name: 'neo_pixel',
      value: false,
      name: 'on',
    });
  });

  it('should open/close palette modal', async () => {
    const { getByTestId } = render(<NPTable />);

    const paletteButton: HTMLElement = getByTestId('1-tr-palette-button');
    fireEvent.click(paletteButton);
    const paletteModal = getByTestId('palette-modal');
    expect(paletteModal).toBeTruthy();
  });

  it('should call api.postUpdate when twinkle button clicked', async () => {
    const { getByTestId } = render(<NPTable />);
    const twinkleButton: HTMLElement = getByTestId('1-twinkle-toggle-button');
    const apiModule = await import('@/lib/api');
    act(() => fireEvent.click(twinkleButton));
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      mqtt_id: 1,
      device_type_name: 'neo_pixel',
      value: false,
      name: 'twinkle',
    });
  });

  it('should call api.postUpdate when transform button clicked', async () => {
    const { getByTestId } = render(<NPTable />);
    const transformButton: HTMLElement = getByTestId('1-transform-toggle-button');
    const apiModule = await import('@/lib/api');
    act(() => fireEvent.click(transformButton));
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      mqtt_id: 1,
      device_type_name: 'neo_pixel',
      value: false,
      name: 'transform',
    });
  });

  it('should set ms', async () => {
    const { getByTestId, findByTestId } = render(<NPTable />);
    const msButton: HTMLElement = getByTestId('1-ms-popover-slider-button');
    fireEvent.click(msButton);
    const submitButton = await findByTestId('neo-pixel-slider-form-submit-button');
    const apiModule = await import('@/lib/api');
    await userEvent.keyboard('[ArrowUp]');
    await userEvent.keyboard('[ArrowUp]');
    fireEvent.click(submitButton);
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      mqtt_id: 1,
      device_type_name: 'neo_pixel',
      value: 7,
      name: 'ms',
    });
  });

  it('should set brightness', async () => {
    const { getByTestId, findByTestId } = render(<NPTable />);
    const brightnessButton: HTMLElement = getByTestId('1-brightness-popover-slider-button');
    fireEvent.click(brightnessButton);
    const submitButton = await findByTestId('neo-pixel-slider-form-submit-button');
    const apiModule = await import('@/lib/api');
    await userEvent.keyboard('[ArrowUp]');
    await userEvent.keyboard('[ArrowUp]');
    fireEvent.click(submitButton);
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      mqtt_id: 1,
      device_type_name: 'neo_pixel',
      value: 129,
      name: 'brightness',
    });
  });

  it('should select/deselect all devices when toggle all checkbox clicked', async () => {
    const { getByTestId } = render(<NPTable />);
    const toggleAllCheckbox: HTMLElement = getByTestId('neo-pixel-header-toggle-all-checkbox');
    const checkbox1: HTMLElement = getByTestId('1-tr-checkbox').parentElement?.parentElement
      ?.parentElement as HTMLElement;
    const checkbox2: HTMLElement = getByTestId('2-tr-checkbox').parentElement?.parentElement
      ?.parentElement as HTMLElement;

    expect(checkbox1).not.toHaveAttribute('data-checked');
    expect(checkbox2).not.toHaveAttribute('data-checked');
    act(() => fireEvent.click(toggleAllCheckbox));
    expect(checkbox1).toHaveAttribute('data-checked', 'true');
    expect(checkbox2).toHaveAttribute('data-checked', 'true');
    act(() => fireEvent.click(toggleAllCheckbox));
    expect(checkbox1).not.toHaveAttribute('data-checked');
    expect(checkbox2).not.toHaveAttribute('data-checked');
  });
});
