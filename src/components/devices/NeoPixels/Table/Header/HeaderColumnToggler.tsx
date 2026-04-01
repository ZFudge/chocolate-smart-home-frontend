import { IndeterminateButton, ToggleButtonMultiple } from '@/components';
import { NEO_PIXEL } from '../../constants';
import { NeoPixelObject } from '../../interfaces';
import useNeoPixelStore from '../../useNeoPixelStore';

interface HeaderColumnTogglerProps {
  settingName: string;
  Icon: React.ElementType;
}

const HeaderColumnToggler = ({ settingName, Icon }: HeaderColumnTogglerProps) => {
  const { neoPixelDevices, selectedDevices } = useNeoPixelStore();

  if (selectedDevices.length < 2) {
    return null;
  }

  const devices = selectedDevices.map((mqtt_id) => neoPixelDevices[mqtt_id]);
  const values = devices.map((device) => device[settingName as keyof NeoPixelObject]);
  const allValuesMatch = new Set(values).size === 1;

  return allValuesMatch ? (
    <ToggleButtonMultiple
      devices={devices}
      deviceTypeName={NEO_PIXEL}
      settingName={settingName}
      label={`set ALL ${settingName} ${devices[0][settingName as keyof NeoPixelObject] ? 'OFF' : 'ON'}`}
      Icon={Icon}
    />
  ) : (
    <IndeterminateButton
      deviceTypeName={NEO_PIXEL}
      settingName={settingName}
      Icon={Icon}
      selection={selectedDevices}
      label={settingName}
    />
  );
};

export default HeaderColumnToggler;
