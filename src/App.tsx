import { useEffect } from 'react';
import { AppShell, Burger, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '@mantine/core/styles.css';

import WebSocketContext from './WebsocketContext';
import useDevicesStore from './useDevicesStore';
import useWebsocket from './useWebsocket';

import Navbar from './Navbar';
import Router from './Router';
import ThemeToggle from './components/ToggleTheme';

const App = () => {
  const [opened, { toggle }] = useDisclosure();

  const { connect, websocket } = useWebsocket();
  const { addDeviceData } = useDevicesStore();

  const handleMessage = (msgEvent: MessageEvent) => {
    const data = JSON.parse(msgEvent.data);
    addDeviceData(data);
  };

  useEffect(() => {
    connect(handleMessage);
  }, []);

  return (
    <MantineProvider>
      <WebSocketContext.Provider value={websocket}>
        <AppShell
          header={{ height: 60 }}
          navbar={{
            width: 300,
            breakpoint: 'sm',
            collapsed: { mobile: !opened }, 
          }}
          padding="md"
        >
          <AppShell.Header
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            {/* <img src={logo} width={30} height={30} alt="logo" /> */}
            <ThemeToggle />
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
