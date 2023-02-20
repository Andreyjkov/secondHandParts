import { getAuth, signOut } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { ImExit } from "react-icons/im";

import { useAppDispatch } from "../../store";
import { setIsAuth, setIsVerification } from "../../store/sliceAuth";
import { removeUser } from "../../store/sliceUser";

function LogOut() {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setIsAuth(false));
        dispatch(setIsVerification(false));
        dispatch(removeUser());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <NavLink
      to="/"
      onClick={handleLogout}
      className={({ isActive }) => (isActive ? "active nav-link" : "nav-link")}
    >
      <span>Выйти </span>
      <ImExit />
    </NavLink>
  );
}

export default LogOut;
