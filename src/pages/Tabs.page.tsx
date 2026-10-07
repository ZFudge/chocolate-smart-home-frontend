import { FaLightbulb, FaMicrochip, FaPowerOff } from 'react-icons/fa';
import { Tabs, Text } from '@mantine/core';
import { LEONARDO, NEO_PIXEL, ON_OFF } from '@/components/devices';
import { useAppStore } from '@/stores';
import { LeonardoPage, NeoPixelsPage, OnOffPage } from './index';

function TabsPage() {
  const { color, tab, setTab } = useAppStore();

  return (
    <Tabs color={color} variant="pills" defaultValue={tab} onChange={setTab}>
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
