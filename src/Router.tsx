import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NeoPixelsPage } from './pages/NeoPixels.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NeoPixelsPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
