import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
