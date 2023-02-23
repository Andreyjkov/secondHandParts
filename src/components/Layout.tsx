import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getAllDataFirebase, getUserFirebase } from "../services";
import { IUserData } from "../services/dataUsers/setUserFirebase";
import { useAppDispatch, useAppSelector } from "../store";
import { setIsLoading } from "../store/sliceApp";
import { setIsAuth, setIsVerification } from "../store/sliceAuth";
import { setBase } from "../store/sliceBase";
import { setUser } from "../store/sliceUser";
import Header from "./Header";
import Spinner from "./Spinner";

function Layout() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.app);
  
  useEffect(() => {
    const dataBase = async () => {
      const data = await getAllDataFirebase();
      dispatch(setBase(data));
    };

    onAuthStateChanged(auth, async (user) => {
      if (user && user.email && auth.currentUser?.emailVerified) {
        const userData = (await getUserFirebase(
          "users",
          user.email
        )) as IUserData;

        dispatch(setUser(userData));
        dispatch(setIsVerification(auth.currentUser?.emailVerified));
        dispatch(setIsLoading(false));
        dispatch(setIsAuth(true));
        dataBase();
      } else {
        dispatch(setIsAuth(false));
        dispatch(setIsLoading(false));
      }
    });
  }, [auth, dispatch]);

  return (
    <>
      <Header />
      {isLoading ? <Spinner /> : <Outlet />}
    </>
  );
}

export default Layout;
