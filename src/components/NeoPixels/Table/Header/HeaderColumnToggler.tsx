import { Table } from "@mantine/core";

import ToggleButton from "@/components/ToggleButton";
import { NeoPixelObject } from "../../interfaces";
import IndeterminateButton from "../IndeterminateButton";
import TooltipWrapper from "../TooltipWrapper";

interface HeaderColumnTogglerProps {
  settingName: string;
  label: string;
  Icon: React.ElementType;
  selection: number[];
  neoPixelData: NeoPixelObject[];
  trSettingsClass: string;
}

const HeaderColumnToggler = ({
  settingName,
  label,
  Icon,
  selection,
  neoPixelData,
  trSettingsClass,
}: HeaderColumnTogglerProps) => {
  const allValuesMatch = new Set(neoPixelData.filter(np => selection.includes(np.mqtt_id)).map(np => np[settingName as keyof NeoPixelObject])).size === 1;
  console.log('settingName', settingName, 'allValuesMatch', allValuesMatch);

  return (
    <Table.Th key={settingName} className={trSettingsClass}>
      <TooltipWrapper label={label}>
        {allValuesMatch ?
          <ToggleButton
            device={neoPixelData}
            settingName={settingName}
          >
            <Icon />
          </ToggleButton> :
          <IndeterminateButton
            settingName={settingName}
            Icon={Icon}
            selection={selection}
          />
        }
      </TooltipWrapper>
    </Table.Th>
  );
};

export default HeaderColumnToggler;
