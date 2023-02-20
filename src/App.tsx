import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages";
import { RegisterPage } from "./pages";
import { Main } from "./pages";
import { ProfilePage } from "./pages";
import { Blog } from "./pages";
import { About } from "./pages";
import { useAppDispatch } from "./store";
import { setIsAuth, setIsVerification } from "./store/sliceAuth";
import { removeUser, setUser } from "./store/sliceUser";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./hoc/RequireAuth";
import { Unregistered } from "./hoc/Unregistered";
import "./App.css";
import { NotFound } from "./pages";
import { setIsLoading } from "./store/sliceApp";
import AddPosition from "./pages/AddPosition";
import Base from "./pages/Base";
import { getUserFirebase } from "./services/dataUsers/getUserFirebase";
import { IUserData } from "./services/dataUsers/setUserFirebase";

function App() {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {

      if (user && user.email && auth.currentUser?.emailVerified) {
        const userData = (await getUserFirebase("users", user.email)) as IUserData;

        dispatch(setUser(userData));
        dispatch(setIsVerification(auth.currentUser?.emailVerified));
        dispatch(setIsLoading(false));
        dispatch(setIsAuth(true));
      } else {
        dispatch(setIsAuth(false));
        // dispatch(removeUser());
        dispatch(setIsLoading(false));
      }
    });
  }, [auth, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route
            path="login"
            element={
              <Unregistered>
                <LoginPage />
              </Unregistered>
            }
          />
          <Route
            path="register"
            element={
              <Unregistered>
                <RegisterPage />
              </Unregistered>
            }
          />
          <Route
            path="about"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
          <Route
            path="add-position"
            element={
              <RequireAuth>
                <AddPosition />
              </RequireAuth>
            }
          />
          <Route
            path="blog"
            element={
              <RequireAuth>
                <Blog />
              </RequireAuth>
            }
          />
          <Route
            path="base"
            element={
              <RequireAuth>
                <Base />
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
