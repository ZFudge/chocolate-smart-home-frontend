import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LeonardoPage from './pages/Leonardo.page';
import NeoPixelsPage from './pages/NeoPixels.page';
import OnOffPage from './pages/OnOff.page';
import TabsPage from './pages/Tabs.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TabsPage />,
  },
  {
    path: '/neo_pixel',
    element: <NeoPixelsPage />,
  },
  {
    path: '/on_off',
    element: <OnOffPage />,
  },
  {
    path: '/leonardo',
    element: <LeonardoPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
