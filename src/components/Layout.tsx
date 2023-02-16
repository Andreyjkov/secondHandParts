import { Outlet } from "react-router-dom";
import { Header, Spinner } from "./";
import { useAppSelector } from "../store";

function Layout() {
  const { isLoading } = useAppSelector((state) => state.app);
  return (
    <>
      <Header />
      {isLoading ? <Spinner /> : <Outlet />}
    </>
  );
}

export default Layout;
