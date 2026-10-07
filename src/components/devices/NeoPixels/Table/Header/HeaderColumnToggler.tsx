import { Flex, Text } from '@mantine/core';
import { IndeterminateButton, ToggleButtonMultiple } from '@/components';
import { ICON_SIZE } from '@/constants';
import { useAppStore } from '@/stores';
import { NEO_PIXEL } from '../../constants';
import { NeoPixelPlugin } from '../../interfaces';
import useNeoPixelStore from '../../useNeoPixelStore';

interface HeaderColumnTogglerProps {
  settingName: string;
  Icon: React.ElementType;
}

const HeaderColumnToggler = ({ settingName, Icon }: HeaderColumnTogglerProps) => {
  const { color } = useAppStore();
  const { neoPixelDevices, selectedDevices } = useNeoPixelStore();

  if (selectedDevices.length < 2) {
    return null;
  }

  const devices = selectedDevices.map((mqtt_id) => neoPixelDevices[mqtt_id]);
  const values = devices.map(
    (device) => device.plugin[settingName.toLowerCase() as keyof NeoPixelPlugin]
  );
  const allValuesMatch = new Set(values).size === 1;

  return allValuesMatch ? (
    <ToggleButtonMultiple
      devices={devices}
      deviceTypeName={NEO_PIXEL}
      indexableObject={devices[0].plugin}
      settingName={settingName}
      label={
        <Flex align="center" gap="xs">
          <Icon color={color} size={ICON_SIZE} />
          <Flex direction="column" align="center">
            <Text>
              Turn {settingName} setting to{' '}
              {devices[0].plugin[settingName.toLowerCase() as keyof NeoPixelPlugin] ? 'OFF' : 'ON'}
            </Text>
            <Text>for all selected devices</Text>
          </Flex>
        </Flex>
      }
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
