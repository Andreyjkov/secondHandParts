import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import Header from "./Header";
import Spinner from "./Spinner";

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
