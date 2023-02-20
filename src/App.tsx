import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages";
import { RegisterPage } from "./pages";
import { Main } from "./pages";
import { Profile } from "./pages";
import { Blog } from "./pages";
import { About } from "./pages";
import { useAppDispatch } from "./store";
import { setIsAuth, setIsVerification } from "./store/sliceAuth";
import { setUser } from "./store/sliceUser";
import { Layout } from "./components/Layout";
import { RequireAuth } from "./hoc/RequireAuth";
import { Unregistered } from "./hoc/Unregistered";
import "./App.css";
import { NotFound } from "./pages";
import { setIsLoading } from "./store/sliceApp";
import AddPosition from "./pages/AddPosition";
import Base from "./pages/Base";


function App() {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && auth.currentUser?.emailVerified) {
        dispatch(setIsAuth(true));
        dispatch(setUser(user.email));
        dispatch(setIsVerification(auth.currentUser?.emailVerified));
        dispatch(setIsLoading(false));
      } else {
        dispatch(setIsAuth(false));
        dispatch(setUser(null));
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
                <Profile />
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
