import { Suspense, lazy } from 'react';
import { RouteObject } from 'react-router';

import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//Authen
const LoginPage = Loader(lazy(() => import('src/content/authentication')));

const UnAuthRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <BaseLayout />,
    children: [
      {
        path: '',
        element: <LoginPage />
      }
    ]
  }
];

export default UnAuthRoutes;
