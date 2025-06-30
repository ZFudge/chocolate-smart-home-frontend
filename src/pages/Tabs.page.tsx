import { Tabs } from '@mantine/core';
import { IconTrafficLights, IconCircuitPushbutton } from '@tabler/icons-react';
import { NEO_PIXEL } from "../components/NeoPixels/constants";
import { ON_OFF } from "../components/OnOff/constants";
import NeoPixelsPage from '../pages/NeoPixels.page';
import OnOffPage from '../pages/OnOff.page';

function TabsPage() {
  return (
    <Tabs defaultValue={NEO_PIXEL}>
      <Tabs.List>
        <Tabs.Tab value={NEO_PIXEL} leftSection={<IconTrafficLights size={12} />}>
          Neo Pixels
        </Tabs.Tab>
        <Tabs.Tab value={ON_OFF} leftSection={<IconCircuitPushbutton size={12} />}>
          On/Off
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={NEO_PIXEL}>
				<NeoPixelsPage />
      </Tabs.Panel>

      <Tabs.Panel value={ON_OFF}>
				<OnOffPage />
      </Tabs.Panel>
    </Tabs>
  );
}

export default TabsPage;
