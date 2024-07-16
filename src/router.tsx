import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom'

import { LayoutApp } from '@/pages/app/_layouts/app';
import { PageNotFound } from '@/pages/error/404';

import { SignIn } from '@/pages/auth/sign-in';
import { Dashboard } from '@/pages/app/dashboard';
import { Contract } from '@/pages/app/contract';

import { User } from '@/pages/app/user';
import { UserView } from './pages/app/user/view';
import { parseCookies } from 'nookies';

export const router = createBrowserRouter([
  {
    path: '/auth/:clientId',
    element: <SignIn/>
  },
  {
    path: '/',
    element: <IsAuthenticated />,
    children: [
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
            path: '/app/user/view/:paramId?',
            element: <UserView />
          },
          {
            path: '/app/contract',
            element: <Contract/>
          }
        ],
      }
    ]
  },
])

function IsAuthenticated() {
  const location = useLocation();
  const cookies = parseCookies();
  const isAuthenticated = cookies['customer-portal.token'];

  if (!isAuthenticated)
    return <Navigate to="/auth/1" replace />
  if (location.pathname == '/' || location.pathname == '/app') 
    return <Navigate to="/app/dashboard" replace />
  else
    return <Outlet />
}