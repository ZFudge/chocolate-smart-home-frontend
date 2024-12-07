import { act, fireEvent, render } from '@test-utils';
import { vi } from 'vitest';
import EditPaletteModal from '@/components/NeoPixels/EditPaletteModal/EditPaletteModal';
import { NeoPixelObject } from '@/components/NeoPixels/interfaces';
import mockNeoPixelsData from './mockData';

vi.mock('@/api', { spy: true });

const device: NeoPixelObject = mockNeoPixelsData[0];

describe('Palette Modal component', () => {
  afterEach(vi.clearAllMocks);

  it('should handle submit button click', async () => {
    const { getByTestId } = render(<EditPaletteModal device={device} close={() => {}} />);
    const submitButton: HTMLElement = getByTestId('submit');
    const apiModule = await import('@/api');
    act(() => {
      fireEvent.click(submitButton);
    });
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      id: device.id,
      value: device.palette,
      name: 'palette',
    });
  });

  it('should submit the modified palette value after initial input is changed', async () => {
    const { getByTestId } = render(<EditPaletteModal device={device} close={() => {}} />);
    const firstColorInput: HTMLElement = getByTestId(0);
    const submitButton: HTMLElement = getByTestId('submit');
    const apiModule = await import('@/api');
    act(() => {
      fireEvent.change(firstColorInput, { target: { value: '#332211' } });
      fireEvent.click(submitButton);
    });
    expect((firstColorInput as HTMLInputElement).value).toBe('#332211');
    const expectedPaletteValue: string[] = ['#332211'].concat(device.palette.slice(1));
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      id: device.id,
      value: expectedPaletteValue,
      name: 'palette',
    });
  });

  it('should reset form fields to its initial values after reset button click', async () => {
    const { getByTestId } = render(<EditPaletteModal device={device} close={() => {}} />);
    const firstColorInput: HTMLElement = getByTestId(0);
    const resetButton: HTMLElement = getByTestId('reset');
    const submitButton: HTMLElement = getByTestId('submit');
    const apiModule = await import('@/api');
    act(() => {
      fireEvent.change(firstColorInput, { target: { value: '#332211' } });
      fireEvent.click(resetButton);
      fireEvent.click(submitButton);
    });
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({
      id: device.id,
      value: device.palette,
      name: 'palette',
    });
  });

  it('should call the given close function when close button is clicked', async () => {
    const close = vi.fn().mockImplementation(() => {});
    const { getByTestId } = render(<EditPaletteModal device={device} close={close} />);
    const closeButton: HTMLElement = getByTestId('close');
    act(() => {
      fireEvent.click(closeButton);
    });
    expect(close).toHaveBeenCalledOnce();
  });
});
