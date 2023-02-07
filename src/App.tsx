import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";
import { RegisterPage } from "./pages/RegisterPage";
import { useAppDispatch } from "./store";
import { setIsAuth } from "./store/sliceAuth";
import { setUser } from "./store/sliceUser";
import { Layout } from "./components/Layout";
import { AboutPage } from "./pages/AboutPage";
import { BlogPage } from "./pages/BlogPage";
import { RequireAuth } from "./hoc/RequireAuth";
import { Unregistered } from "./hoc/Unregistered";
import { ProfilePage } from "./pages/ProfilePage";
import "./App.css";
import { PageNotFound } from "./pages/PageNotFound";

function App() {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && auth.currentUser?.emailVerified) {
        dispatch(setIsAuth(true));
        dispatch(setUser(user.email));
      } else {
        dispatch(setIsAuth(false));
        dispatch(setUser(null));
      }
    });
  }, [auth, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
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
                <AboutPage />
              </RequireAuth>
            }
          />
          <Route
            path="blog"
            element={
              <RequireAuth>
                <BlogPage />
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
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
