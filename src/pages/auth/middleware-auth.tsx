import { AppContext } from "@/contexts/app-context";
import { useContext } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

export default function MiddlewareAuth() {
  const location = useLocation();
  const { companyCode } = useParams();
  const { isAuthenticated } = useContext(AppContext);

  const companyCodeStorage = localStorage.getItem("companyCode");
  const companyCodeValue = companyCode || companyCodeStorage;

  if (!isAuthenticated) {
    return <Navigate to={`/auth/${companyCodeValue}`} replace />;
  }

  if (
    isAuthenticated &&
    (location.pathname == "/" ||
      location.pathname == "/app" ||
      location.pathname.startsWith("/auth"))
  )
    return <Navigate to="/app/dashboard" replace />;

  return <Outlet />;
}
