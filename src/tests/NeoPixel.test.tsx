import { act, fireEvent, render } from '@test-utils';
import cx from 'clsx';
import classes from '@/components/NeoPixels/NeoPixel.module.css';
import NeoPixelTable from '@/components/NeoPixels/NeoPixelTable';
import mockNeoPixelsData from './mockData';

vi.mock('@/api', { spy: true });

describe('Neo Pixel Device component', () => {
  afterEach(vi.clearAllMocks);

  it('should add/remove rows from selection when clicked', async () => {
    const { getByTestId } = render(<NeoPixelTable neoPixelData={mockNeoPixelsData} />);
    const firstRow: HTMLElement = getByTestId('1-tr');
    const secondRow: HTMLElement = getByTestId('2-tr');
    act(() => fireEvent.click(firstRow));
    expect(firstRow).toHaveClass(cx(classes.rowSelected));
    expect(secondRow).not.toHaveClass(cx(classes.rowSelected));
    act(() => {
      fireEvent.click(firstRow);
      fireEvent.click(secondRow);
    });
    expect(firstRow).not.toHaveClass(cx(classes.rowSelected));
    expect(secondRow).toHaveClass(cx(classes.rowSelected));
  });

  it('should call api.postUpdate when power button clicked', async () => {
    const { getByTestId } = render(<NeoPixelTable neoPixelData={mockNeoPixelsData} />);
    const powerButton: HTMLElement = getByTestId('1-on-toggle');
    const apiModule = await import('@/api');
    act(() => fireEvent.click(powerButton));
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({ id: 1, value: false, name: 'on' });
  });

  it('should call api.postUpdate when twinkle button clicked', async () => {
    const { getByTestId } = render(<NeoPixelTable neoPixelData={mockNeoPixelsData} />);
    const twinkleButton: HTMLElement = getByTestId('1-twinkle-toggle');
    const apiModule = await import('@/api');
    act(() => fireEvent.click(twinkleButton));
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({ id: 1, value: false, name: 'twinkle' });
  });

  it('should call api.postUpdate when transform button clicked', async () => {
    const { getByTestId } = render(<NeoPixelTable neoPixelData={mockNeoPixelsData} />);
    const transformButton: HTMLElement = getByTestId('1-transform-toggle');
    const apiModule = await import('@/api');
    act(() => fireEvent.click(transformButton));
    expect(apiModule.postUpdate).toHaveBeenCalledOnce();
    expect(apiModule.postUpdate).toHaveBeenCalledWith({ id: 1, value: false, name: 'transform' });
  });

  it('should open/close palette modal', async () => {
    const { getByTestId } = render(<NeoPixelTable neoPixelData={mockNeoPixelsData} />);
    const paletteButton: HTMLElement = getByTestId('1-palette-button');
    act(() => fireEvent.click(paletteButton));
    const paletteModal = getByTestId('palette-modal');
    expect(paletteModal).toBeTruthy();
  });
});
