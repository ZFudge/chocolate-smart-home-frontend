import { Table } from "@mantine/core";

import ToggleButton from "@/components/ToggleButton";
import { NeoPixelObject } from "../../interfaces";
import IndeterminateButton from "../IndeterminateButton";

interface HeaderColumnTogglerProps {
  settingName: string;
  Icon: React.ElementType;
  selection: number[];
  devices: NeoPixelObject[];
  trSettingsClass: string;
}

const HeaderColumnToggler = ({
  settingName,
  Icon,
  selection,
  devices,
  trSettingsClass,
}: HeaderColumnTogglerProps) => {
  const allValuesMatch = new Set(devices.filter(np => selection.includes(np.mqtt_id)).map(np => np[settingName as keyof NeoPixelObject])).size === 1;
  const label = `${settingName} setting`;

  return (
    <Table.Th key={settingName} className={trSettingsClass}>
      {allValuesMatch ?
        <ToggleButton
          device={devices}
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
