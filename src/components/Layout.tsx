import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { setIsLoading } from "../store/sliceApp";
import { setIsAuth } from "../store/sliceAuth";
import { setBase } from "../store/sliceBase";
import { setPhotoURL, setUser } from "../store/sliceUser";
import { IUserData } from "../interface";
import { getAllDataFirebase, getUserFirebase } from "../services";
import Header from "./Header";
import Spinner from "./Spinner";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";

function Layout() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.app);
  const { isVerification } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const dataBase = async () => {
      const data = await getAllDataFirebase();
      dispatch(setBase(data));
    };

    onAuthStateChanged(auth, async (user) => {
      if (!user) return dispatch(setIsLoading(false));

      if (user.email && (isVerification || user.emailVerified)) {
        await dataBase();
        dispatch(setIsLoading(false));
        const userData = (await getUserFirebase(
          "users",
          user.email
        )) as IUserData;
        dispatch(setUser(userData));
        dispatch(setIsAuth(true));

        getDownloadURL(ref(storage, `/avatars/${user.email}/avatar.jpg`))
          .then((url) => {
            dispatch(setPhotoURL(url));
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  }, [auth, dispatch, isVerification]);

  return (
    <>
      <Header />
      {isLoading ? <Spinner /> : <Outlet />}
    </>
  );
}

export default Layout;
function setTestFoto(url: string) {
  throw new Error("Function not implemented.");
}
