import { useEffect } from 'react';
import { AppShell, Burger, Flex, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import SyncDeviceDataButton from './components/SyncDeviceDataButton';
import TagsButton from './components/Tags/TagsButton';
import ThemeToggle from './components/ToggleTheme';
import Navbar from './Navbar';
import Router from './Router';
import useDevicesStore from './useDevicesStore';
import useTagsStore from './useTagsStore';
import useWebsocket from './useWebsocket';
import WebSocketContext from './WebsocketContext';

const App = () => {
  const [opened, { toggle }] = useDisclosure();

  const { connect, websocket } = useWebsocket();
  const { addDeviceData } = useDevicesStore();
  const { addTagsData } = useTagsStore();

  const handleMessage = (msgEvent: MessageEvent) => {
    const data = JSON.parse(msgEvent.data);
    addDeviceData(data);
  };

  useEffect(() => {
    connect(handleMessage);
    const getTags = async () => {
      const response = await fetch('/api/tags/');
      if (!response.ok) {
        console.error(response.statusText);
        return;
      }
      const data = await response.json();
      addTagsData(data);
    };
    getTags();
    return () => {
      websocket?.close();
    };
  }, []);

  return (
    <MantineProvider>
      <Notifications />
      <WebSocketContext.Provider value={websocket}>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 200,
            breakpoint: 'sm',
            collapsed: { mobile: !opened },
          }}
          padding="md"
        >
          <AppShell.Header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1em',
            }}
          >
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            {/* <img src={logo} width={30} height={30} alt="logo" /> */}
            <Flex gap="md">
              <SyncDeviceDataButton />
              <TagsButton />
              <ThemeToggle />
            </Flex>
          </AppShell.Header>

          <AppShell.Navbar p="md">
            <Navbar />
          </AppShell.Navbar>

          <AppShell.Main>
            <Router />
          </AppShell.Main>
        </AppShell>
      </WebSocketContext.Provider>
    </MantineProvider>
  );
};

export default App;
