import { Pill } from '@mantine/core';
import { useAppStore } from '@/stores';

interface ColoredPillProps {
  item: string;
  onRemove: () => void;
}

const ColoredPill = ({ item, onRemove }: ColoredPillProps) => {
  const { color } = useAppStore();
  return (
    <Pill
      key={item}
      withRemoveButton
      onRemove={onRemove}
      style={{ border: `1px solid ${color}`, color: 'white', fontWeight: 600 }}
      removeButtonProps={{
        style: { color },
      }}
    >
      {item}
    </Pill>
  );
};

export default ColoredPill;
