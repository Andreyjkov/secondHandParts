import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store";
import { Header } from "./Header";
import { Header1 } from "./Header1";
import { Spinner } from "./Spinner";

export function Layout() {
  const { isLoading } = useAppSelector((state) => state.app);
  return (
    <>
      {/* <Header /> */}
      <Header1 />
      {isLoading ? <Spinner /> : <Outlet />}
    </>
  );
}
