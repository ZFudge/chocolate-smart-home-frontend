import { Tabs } from '@mantine/core';
import { NEO_PIXEL } from "../components/NeoPixels/constants";
import { ON_OFF } from "../components/OnOff/constants";
import NeoPixelsPage from '../pages/NeoPixels.page';
import OnOffPage from '../pages/OnOff.page';
import { FaPowerOff, FaLightbulb } from 'react-icons/fa';
import classes from './Tabs.module.scss';

function TabsPage() {
  return (
    <Tabs defaultValue={NEO_PIXEL} classNames={classes}>
      <Tabs.List>
        <Tabs.Tab value={NEO_PIXEL} leftSection={<FaLightbulb size={15} />}>
          Neo Pixels
        </Tabs.Tab>
        <Tabs.Tab value={ON_OFF} leftSection={<FaPowerOff size={15} />}>
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
