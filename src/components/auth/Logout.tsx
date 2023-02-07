import { getAuth, signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { setIsAuth } from "../../store/sliceAuth";
import { setUser } from "../../store/sliceUser";

export function LogOut() {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setIsAuth(false));
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <NavLink
      to="/login"
      onClick={handleLogout}
      className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}
    >
      Выйти
    </NavLink>
  );
}
