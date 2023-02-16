import { Outlet } from "react-router-dom";
import { Header1, Spinner } from "./";
import { useAppSelector } from "../store";
import { Header } from "./Header";

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
