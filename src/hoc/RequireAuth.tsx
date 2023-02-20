import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../store";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}
