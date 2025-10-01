import { ColorSwatch, Flex } from '@mantine/core';

const Palette3x3 = ({ palette, mqttIdLabel }: { palette: string[]; mqttIdLabel: string }) => {
  return (
    <Flex wrap="wrap" direction="column">
      {palette
        .map((color: string, i: number) => (
          <ColorSwatch color={color} size="10" key={`${i}-${color}-${mqttIdLabel}`} />
        ))
        .reduce((arr: React.ReactNode[][], v: React.ReactNode, i: number) => {
          const rowIndex = Math.floor(i / 3);
          if (!Array.isArray(arr[rowIndex])) {
            arr[rowIndex] = [];
          }
          arr[rowIndex].push(v);
          return arr;
        }, [])
        .map((row: React.ReactNode, i: number) => (
          <Flex key={`${mqttIdLabel}-${i}-pallete-span`}>{row}</Flex>
        ))}
    </Flex>
  );
};

export default Palette3x3;
