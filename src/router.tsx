import { createBrowserRouter } from "react-router-dom";

import { LayoutApp } from "@/pages/app/_layouts/app";
import { PageNotFound } from "@/pages/error/404";

import { SignIn } from "@/pages/auth/sign-in";
import { Dashboard } from "@/pages/app/dashboard";
import { Contract } from "@/pages/app/contract";

import { User } from "@/pages/app/user";
import { UserView } from "./pages/app/user/view";
import { Company } from "./pages/app/company";
import { CompanyView } from "./pages/app/company/view";
import MiddlewareAuth from "./pages/auth/middleware-auth";

export const router = createBrowserRouter([
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
          {
            path: "/app/user",
            element: <User />,
          },
          {
            path: "/app/company",
            element: <Company />,
          },
          {
            path: "/app/user/view/:paramId?",
            element: <UserView />,
          },
          {
            path: "/app/company/view/:paramId?",
            element: <CompanyView />,
          },
          {
            path: "/app/contract",
            element: <Contract />,
          },
        ],
      },
    ],
  },
]);
