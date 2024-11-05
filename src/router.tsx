import MiddlewareAuth from "@/pages/auth/middleware-auth";

import { createBrowserRouter } from "react-router-dom";

import { Home } from "@/pages/site";

import { LayoutApp } from "@/pages/app/_layouts/app";
import { PageNotFound } from "@/pages/error/404";

import { SignIn } from "@/pages/auth/sign-in";
import { Dashboard } from "@/pages/app/dashboard";

import { SchedulingPage } from "@/pages/app/scheduling";
import { SchedulingView } from "@/pages/app/scheduling/view";

import { User } from "@/pages/app/user";
import { UserView } from "@/pages/app/user/view";

import { Company } from "@/pages/app/company";
import { CompanyView } from "@/pages/app/company/view";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/:companyCode",
    element: <SignIn />,
  },
  {
    path: "/app",
    element: <MiddlewareAuth />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/app",
        element: <LayoutApp />,
        errorElement: <PageNotFound />,
        children: [
          {
            path: "/app/dashboard",
            element: <Dashboard />,
          },
          //user
          {
            path: "/app/user",
            element: <User />,
          },
          {
            path: "/app/user/view/:paramId?",
            element: <UserView />,
          },
          //company
          {
            path: "/app/company",
            element: <Company />,
          },
          {
            path: "/app/company/view/:paramId?",
            element: <CompanyView />,
          },
          //scheduling
          {
            path: "/app/scheduling",
            element: <SchedulingPage />,
          },
          {
            path: "/app/scheduling/view/:paramId?",
            element: <SchedulingView />,
          },
        ],
      },
    ],
  },
]);
