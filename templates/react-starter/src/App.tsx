import { createBrowserRouter, RouterProvider } from 'react-router';

import { routes } from './generated-routes';
import { Providers } from './providers';

const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});

export function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}
