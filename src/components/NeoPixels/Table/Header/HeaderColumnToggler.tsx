import { Table } from "@mantine/core";

import IndeterminateButton from "@/components/IndeterminateButton";
import ToggleButton from "@/components/ToggleButton";
import { NeoPixelObject } from "../../interfaces";

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

  if (selection.length < 2) {
    return <Table.Th key={`${settingName}-header`} className={trSettingsClass} />;
  }

  return (
    <Table.Th key={`${settingName}-header`} className={trSettingsClass}>
      {allValuesMatch ?
        <ToggleButton
          device={devices}
          deviceTypeName="neo_pixel"
          settingName={settingName}
          label={label}
          Icon={Icon}
        /> :
        <IndeterminateButton
          deviceTypeName="neo_pixel"
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
