import { parseCookies } from "nookies";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function IsAuthenticated() {
  const location = useLocation();
  const cookies = parseCookies();
  const isAuthenticated = cookies["customer-portal.token"];

  if (!isAuthenticated) return <Navigate to="/auth/1" replace />;

  if (location.pathname == "/" || location.pathname == "/app")
    return <Navigate to="/app/dashboard" replace />;
  else return <Outlet />;
}
