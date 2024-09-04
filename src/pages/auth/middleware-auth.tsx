import { AppContext } from "@/contexts/app-context";
import { useContext } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

export default function MiddlewareAuth() {
  const location = useLocation();
  const { companyCode } = useParams();
  const { isAuthenticated } = useContext(AppContext);
  const companyCodeStorage = sessionStorage.getItem("companyCode");
  const companyCodeValue = companyCode || companyCodeStorage;

  //console.log("companyParam", companyCode);
  //console.log("companyStorage", companyCodeStorage);
  //console.log("location", location.pathname);

  if (!isAuthenticated && companyCodeValue) {
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
