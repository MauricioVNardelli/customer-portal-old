import { createBrowserRouter } from 'react-router-dom'

import { LayoutApp } from '@/pages/app/_layouts/app';
import { PageNotFound } from '@/pages/error/404';

import { SignIn } from '@/pages/auth/sign-in';
import { Dashboard } from '@/pages/app/dashboard';
import { Contract } from '@/pages/app/contract';

import { User } from '@/pages/app/user';
import { UserView } from './pages/app/user/view';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn/>
  },
  {
    path: '/app',
    element: <LayoutApp/>,
    errorElement: <PageNotFound/>,
    children: [
      {
        path: '/app/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/app/user',
        element: <User/>,

      },
      {
        path: '/app/user/view/:paramId',
        element: <UserView />
      },
      {
        path: '/app/contract',
        element: <Contract/>
      }
    ],
  },
])
