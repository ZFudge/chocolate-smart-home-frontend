import { Checkbox, Table } from "@mantine/core";
import { FaPowerOff } from "react-icons/fa";
import { GiTransform } from "react-icons/gi";
import { IoSparklesSharp } from "react-icons/io5";

import { NeoPixelObject } from "../interfaces";
import IndeterminateButton from "./IndeterminateButton";

const HeaderRow = ({
  toggleAll,
  selection,
  neoPixelData,
}: {
  toggleAll: () => void;
  selection: number[];
  neoPixelData: NeoPixelObject[];
}) => {
  return (
    <Table.Tr>
      <Table.Th w={40}>
        <Checkbox
          onChange={toggleAll}
          checked={selection.length === Object.keys(neoPixelData).length}
          indeterminate={
          selection.length > 0 &&
            selection.length !== Object.keys(neoPixelData).length
          }
        />
      </Table.Th>
      <Table.Th key="device-names" />
      <Table.Th key="on">
        <IndeterminateButton
          settingName="on"
          Icon={FaPowerOff}
          devices={Object.values(neoPixelData)}
        />
      </Table.Th>
      <Table.Th key="palette" />
      <Table.Th key="twinkle">
        <IndeterminateButton
          settingName="twinkle"
          Icon={IoSparklesSharp}
          devices={Object.values(neoPixelData)}
        />
      </Table.Th>
      <Table.Th key="transform">
        <IndeterminateButton
          settingName="transform"
          Icon={GiTransform}
          devices={Object.values(neoPixelData)}
        />
      </Table.Th>
      <Table.Th key="ms" />
      <Table.Th key="brightness" />
      <Table.Th key="tags" />
    </Table.Tr>
  );
};

export default HeaderRow;
