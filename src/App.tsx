import { useEffect } from 'react';
import { AppShell, createTheme, Flex, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { ColorThemePickerIcon, SyncDeviceDataButton, TagsButton, ThemeToggler } from '@/components';
import Router from './Router';
import { useDevicesStore } from './stores';
import { useWebsocket, WebSocketContext } from './ws';

// allow theme toggle cursor to be a pointer
const theme = createTheme({
  cursorType: 'pointer',
});

const App = () => {
  const { connect, websocket } = useWebsocket();
  const { addDeviceData } = useDevicesStore();

  useEffect(() => {
    const handleMessage = (msgEvent: MessageEvent) => {
      const data = JSON.parse(msgEvent.data);
      addDeviceData(data);
    };
    connect(handleMessage);
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
