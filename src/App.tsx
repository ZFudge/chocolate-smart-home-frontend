import { useEffect } from 'react';
import { AppShell, Flex, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import SyncDeviceDataButton from './components/SyncDeviceDataButton';
import TagsButton from './components/Tags/TagsButton';
import ThemeToggle from './components/ToggleTheme';
import Router from './Router';
import useDevicesStore from './useDevicesStore';
import useTagsStore from './useTagsStore';
import useWebsocket from './useWebsocket';
import WebSocketContext from './WebsocketContext';

const App = () => {
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
          padding="md"
        >
          <AppShell.Header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1em',
            }}
          >
            <Flex gap="md">
              <SyncDeviceDataButton />
              <TagsButton />
            </Flex>
            <ThemeToggle />
          </AppShell.Header>

          <AppShell.Main>
            <Router />
          </AppShell.Main>
        </AppShell>
      </WebSocketContext.Provider>
    </MantineProvider>
  );
};

export default App;
