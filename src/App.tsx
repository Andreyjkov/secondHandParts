import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import {
  MainPage,
  ProfilePage,
  NotFound,
  BasePage,
  AddPosition,
} from "./pages";

import { useAppDispatch } from "./store";
import { setIsAuth, setIsVerification } from "./store/sliceAuth";
import { setUser } from "./store/sliceUser";
import { setIsLoading } from "./store/sliceApp";

import { Layout } from "./components";
import { RequireAuth } from "./hoc/RequireAuth";

import { IUserData } from "./services/dataUsers/setUserFirebase";
import { getUserFirebase } from "./services";

import "./App.css";

function App() {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
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
      } else {
        dispatch(setIsAuth(false));
        dispatch(setIsLoading(false));
      }
    });
  }, [auth, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path="add-position"
            element={
              <RequireAuth>
                <AddPosition />
              </RequireAuth>
            }
          />
          <Route
            path="base"
            element={
              <RequireAuth>
                <BasePage />
              </RequireAuth>
            }
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
