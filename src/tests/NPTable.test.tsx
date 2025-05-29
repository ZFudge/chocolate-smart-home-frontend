import { act, fireEvent, render, userEvent } from '@test-utils';
import cx from 'clsx';
import classes from '@/components/NeoPixels/NeoPixel.module.css';
import NPTable from '@/components/NeoPixels/Table/NPTable';
import { neoPixelsMockData } from './placeholder-data';

vi.mock('@/lib/api', { spy: true });

describe('NPTable component', () => {
  afterEach(vi.clearAllMocks);

  it('should add/remove rows from selection when clicked', async () => {
    const { getByTestId } = render(<NPTable devices={Object.values(neoPixelsMockData)} />);
    const firstRow: HTMLElement = getByTestId('1-tr');
    const secondRow: HTMLElement = getByTestId('2-tr');
    const firstCheckbox: HTMLElement = getByTestId('1-checkbox');
    const secondCheckbox: HTMLElement = getByTestId('2-checkbox');
    act(() => fireEvent.click(firstCheckbox));
    expect(firstRow).toHaveClass(cx(classes.rowSelected));
    expect(secondRow).not.toHaveClass(cx(classes.rowSelected));
    act(() => {
      fireEvent.click(firstCheckbox);
      fireEvent.click(secondCheckbox);
    });
    expect(firstRow).not.toHaveClass(cx(classes.rowSelected));
    expect(secondRow).toHaveClass(cx(classes.rowSelected));
  });

  it('should call api.postUpdate when power button clicked', async () => {
    const { getByTestId } = render(<NPTable devices={Object.values(neoPixelsMockData)} />);
    const powerButton: HTMLElement = getByTestId('1-on-toggle');
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
    const { getByTestId } = render(<NPTable devices={Object.values(neoPixelsMockData)} />);
    const paletteButton: HTMLElement = getByTestId('1-palette-button');
    fireEvent.click(paletteButton);
    const paletteModal = getByTestId('palette-modal');
    expect(paletteModal).toBeTruthy();
  });

  it('should call api.postUpdate when twinkle button clicked', async () => {
    const { getByTestId } = render(<NPTable devices={Object.values(neoPixelsMockData)} />);
    const twinkleButton: HTMLElement = getByTestId('1-twinkle-toggle');
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
    const { getByTestId } = render(<NPTable devices={Object.values(neoPixelsMockData)} />);
    const transformButton: HTMLElement = getByTestId('1-transform-toggle');
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
    const { getByTestId, findByTestId } = render(
      <NPTable devices={Object.values(neoPixelsMockData)} />
    );
    const msButton: HTMLElement = getByTestId('1-ms-slider-button');
    fireEvent.click(msButton);
    const submitButton = await findByTestId('1-ms-submit-button');
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
    const { getByTestId, findByTestId } = render(
      <NPTable devices={Object.values(neoPixelsMockData)} />
    );
    const brightnessButton: HTMLElement = getByTestId('1-brightness-slider-button');
    fireEvent.click(brightnessButton);
    const submitButton = await findByTestId('1-brightness-submit-button');
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
});
