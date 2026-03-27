import { useEffect } from 'react';
import { AppShell, createTheme, Flex, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorThemePickerIcon, SyncDeviceDataButton, TagsButton, ThemeToggler } from '@/components';
import Router from './Router';
import { useDevicesStore, useTagsStore } from './stores';
import { useWebsocket, WebSocketContext } from './ws';

// allow theme toggle cursor to be a pointer
const theme = createTheme({
  cursorType: 'pointer',
});

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
    <MantineProvider theme={theme}>
      <Notifications />
      <WebSocketContext.Provider value={websocket}>
        <AppShell header={{ height: 60 }} padding="md">
          <AppShell.Header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '1em',
            }}
          >
            <Flex gap="md" align="center">
              <ColorThemePickerIcon />
              <SyncDeviceDataButton />
              <TagsButton />
            </Flex>
            <ThemeToggler />
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
