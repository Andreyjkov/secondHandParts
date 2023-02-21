import { Route, Routes } from "react-router-dom";

import {
  MainPage,
  ProfilePage,
  NotFound,
  BasePage,
  AddPosition,
} from "./pages";

import { Layout } from "./components";
import { RequireAuth } from "./hoc/RequireAuth";

import "./App.css";

function App() {

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
