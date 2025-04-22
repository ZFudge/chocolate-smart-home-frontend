import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NeoPixelsPage from './pages/NeoPixels.page';

const router = createBrowserRouter([
  {
    path: '/neo_pixel',
    element: <NeoPixelsPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
