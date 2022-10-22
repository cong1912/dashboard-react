import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

export const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

// Categories
const CategoryBlog = Loader(
  lazy(() => import('src/content/applications/Categories'))
);
const BlogManager = Loader(
  lazy(() => import('src/content/applications/Article'))
);

//Courses
const Courses = Loader(lazy(() => import('src/content/applications/Courses')));

const Sections = Loader(
  lazy(() => import('src/content/applications/Sections'))
);
const Lectures = Loader(
  lazy(() => import('src/content/applications/Lectures'))
);

const Questions = Loader(
  lazy(() => import('src/content/applications/Questions'))
);
const Answer = Loader(
  lazy(() => import('src/content/applications/QuizAnswer'))
);
// FAQ
const FAQ = Loader(lazy(() => import('src/content/applications/FAQs')));

// FAQ Detail
const FAQDetail = Loader(
  lazy(() => import('src/content/applications/FAQ_Detail'))
);

// UserManager
const UserManager = Loader(
  lazy(() => import('src/content/applications/UserManager'))
);
const LoginPage = Loader(lazy(() => import('src/content/authentication')));

const routes = (isLoggedIn: boolean) => [
  {
    path: '',
    element: isLoggedIn ? <BaseLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '/',
        element: <Overview />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'dashboards',
    element: isLoggedIn ? <SidebarLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: isLoggedIn ? <SidebarLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'articles',
        element: <BlogManager />
      },
      {
        path: 'category-blog',
        element: <CategoryBlog />
      },
      {
        path: 'course/:id/sections',
        element: <Sections />
      },
      {
        path: 'course/:id/questions',
        element: <Questions />
      },
      {
        path: 'question/:id/answers',
        element: <Answer />
      },
      {
        path: 'section/:sectionId/lectures',
        element: <Lectures />
      },
      {
        path: 'courses',
        element: <Courses />
      },
      {
        path: 'faqs',
        children: [
          {
            path: '',
            element: <FAQ />
          },
          {
            path: 'detail/:id',
            element: <FAQDetail />
          }
        ]
      },
      {
        path: 'user-manager',
        element: <UserManager />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: isLoggedIn ? <SidebarLayout /> : <Navigate to="/login" />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  },
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

export default routes;
