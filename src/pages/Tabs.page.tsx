import { FaLightbulb, FaMicrochip, FaPowerOff } from 'react-icons/fa';
import { Tabs, Text } from '@mantine/core';
import { useAppStore } from '@/stores';
import { LEONARDO } from '../components/Leonardo/constants';
import { NEO_PIXEL } from '../components/NeoPixels/constants';
import { ON_OFF } from '../components/OnOff/constants';
import LeonardoPage from '../pages/Leonardo.page';
import NeoPixelsPage from '../pages/NeoPixels.page';
import OnOffPage from '../pages/OnOff.page';

function TabsPage() {
  const { color } = useAppStore();

  return (
    <Tabs color={color} variant="pills" defaultValue={NEO_PIXEL}>
      <Tabs.List>
        <Tabs.Tab value={NEO_PIXEL} leftSection={<FaLightbulb size={15} />}>
          <Text fw={700}>Neo Pixels</Text>
        </Tabs.Tab>
        <Tabs.Tab value={ON_OFF} leftSection={<FaPowerOff size={15} />}>
          <Text fw={700}>On/Off</Text>
        </Tabs.Tab>
        <Tabs.Tab value={LEONARDO} leftSection={<FaMicrochip size={15} />}>
          <Text fw={700}>Leonardo</Text>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={NEO_PIXEL}>
        <NeoPixelsPage />
      </Tabs.Panel>

      <Tabs.Panel value={ON_OFF}>
        <OnOffPage />
      </Tabs.Panel>

      <Tabs.Panel value={LEONARDO}>
        <LeonardoPage />
      </Tabs.Panel>
    </Tabs>
  );
}

export default TabsPage;
