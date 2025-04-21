import { Table } from "@mantine/core";

import ToggleButton from "@/components/ToggleButton";
import { NeoPixelObject } from "../../interfaces";
import IndeterminateButton from "../IndeterminateButton";

interface HeaderColumnTogglerProps {
  settingName: string;
  Icon: React.ElementType;
  selection: number[];
  neoPixelData: NeoPixelObject[];
  trSettingsClass: string;
}

const HeaderColumnToggler = ({
  settingName,
  Icon,
  selection,
  neoPixelData,
  trSettingsClass,
}: HeaderColumnTogglerProps) => {
  const allValuesMatch = new Set(neoPixelData.filter(np => selection.includes(np.mqtt_id)).map(np => np[settingName as keyof NeoPixelObject])).size === 1;
  const label = `${settingName} setting`;

  return (
    <Table.Th key={settingName} className={trSettingsClass}>
      {allValuesMatch ?
        <ToggleButton
          device={neoPixelData}
          settingName={settingName}
          label={label}
        >
          <Icon />
        </ToggleButton> :
        <IndeterminateButton
          settingName={settingName}
          Icon={Icon}
          selection={selection}
          label={label}
        />
      }
    </Table.Th>
  );
};

export default HeaderColumnToggler;
