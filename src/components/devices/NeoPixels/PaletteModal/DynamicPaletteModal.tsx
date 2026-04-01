import useNeoPixelStore from '../useNeoPixelStore';
import PaletteModal from './PaletteModal';
import PaletteModalMultiple from './PaletteModalMultiple';

const DynamicPaletteModal = () => {
  const { selectedPaletteDevices } = useNeoPixelStore();

  if (
    selectedPaletteDevices === null ||
    (Array.isArray(selectedPaletteDevices) && selectedPaletteDevices.length === 0)
  ) {
    return null;
  }
  if (Array.isArray(selectedPaletteDevices)) {
    return <PaletteModalMultiple />;
  }
  return <PaletteModal />;
};

export default DynamicPaletteModal;
