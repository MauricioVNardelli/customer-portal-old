import { AppContext } from "@/contexts/app-context";
import { useContext } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

export default function MiddlewareAuth() {
  const location = useLocation();
  const { companyCode } = useParams();
  const { isAuthenticated, user } = useContext(AppContext);

  const companyCodeStorage = localStorage.getItem("companyCode");
  const companyCodeValue = companyCode || companyCodeStorage;

  if (user !== undefined) {
    console.log("path", location.pathname);
    if (!isAuthenticated) {
      return <Navigate to={`/auth/${companyCodeValue}`} replace />;
    }

    if (isAuthenticated && location.pathname.startsWith("/auth"))
      return <Navigate to="/app/dashboard" replace />;

    return <Outlet />;
  }
}
