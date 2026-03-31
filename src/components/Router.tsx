import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LeonardoPage, NeoPixelsPage, NotFoundPage, OnOffPage, TabsPage } from '../pages';

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
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
