import { Table } from '@mantine/core';
import appClasses from '@/App.module.css';
import { IndeterminateButton, ToggleButtonMultiple } from '@/components';
import { NeoPixelObject } from '../../interfaces';
import useNeoPixelStore from '../../useNeoPixelStore';
import classes from '../../NeoPixel.module.css';

interface HeaderColumnTogglerProps {
  settingName: string;
  Icon: React.ElementType;
}

const HeaderColumnToggler = ({ settingName, Icon }: HeaderColumnTogglerProps) => {
  const { neoPixelDevices, selectedDevices } = useNeoPixelStore();
  const devices = selectedDevices.map((mqtt_id) => neoPixelDevices[mqtt_id]);

  if (devices.length < 2) {
    const trSettingsClass = `${selectedDevices.length < 2 ? appClasses.hidden : appClasses.visible} ${classes['visibility-transition']}`;
    return <Table.Th key={`${settingName}-header`} className={trSettingsClass} />;
  }

  const allValuesMatch =
    new Set(devices.map((device) => device[settingName as keyof NeoPixelObject])).size === 1;

  return (
    <Table.Th>
      {allValuesMatch ? (
        <ToggleButtonMultiple
          devices={devices}
          deviceTypeName="neo_pixel"
          settingName={settingName}
          label={`set ALL ${settingName} ${devices[0][settingName as keyof NeoPixelObject] ? 'OFF' : 'ON'}`}
          Icon={Icon}
        />
      ) : (
        <IndeterminateButton
          deviceTypeName="neo_pixel"
          settingName={settingName}
          Icon={Icon}
          selection={selectedDevices}
          label={settingName}
        />
      )}
    </Table.Th>
  );
};

export default HeaderColumnToggler;
