import { createBrowserRouter, useParams } from "react-router-dom";

import { LayoutApp } from "@/pages/app/_layouts/app";
import { PageNotFound } from "@/pages/error/404";

import { SignIn } from "@/pages/auth/sign-in";
import { Dashboard } from "@/pages/app/dashboard";
import { Contract } from "@/pages/app/contract";

import { User } from "@/pages/app/user";
import { UserView } from "./pages/app/user/view";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Company } from "./pages/app/company";
import { CompanyView } from "./pages/app/company/view";
import { useCookies } from "react-cookie";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <IsAuthenticated />,
    children: [
      {
        path: "/auth/:companyCode",
        element: <SignIn />,
      },
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

function IsAuthenticated() {
  const location = useLocation();
  const [cookies, ,] = useCookies(["auth"]);
  const { companyCodeParam } = useParams();

  const isAuthenticated = cookies.auth;
  const companyCode = sessionStorage.getItem("companyCode");

  const companyCodeValue = companyCodeParam || companyCode;

  if (!isAuthenticated && !location.pathname.startsWith("/auth"))
    return <Navigate to={`/auth/${companyCodeValue}`} replace />;

  if (
    isAuthenticated &&
    (location.pathname == "/" ||
      location.pathname == "/app" ||
      location.pathname.startsWith("/auth"))
  )
    return <Navigate to="/app/dashboard" replace />;

  return <Outlet />;
}
