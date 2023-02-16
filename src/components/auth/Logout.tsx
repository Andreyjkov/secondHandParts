import { getAuth, signOut } from "firebase/auth";
import { ImExit } from "react-icons/im";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { setIsAuth, setIsVerification } from "../../store/sliceAuth";
import { setUser } from "../../store/sliceUser";
import styles from "../Header/Header.module.css";

function LogOut() {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(setIsAuth(false));
        dispatch(setIsVerification(false));
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
      className={({ isActive }) =>
        isActive ? `${styles.active} ${styles['nav-link']}` : `${styles['nav-link']}`
      }
    >
      <span>Выйти </span>
      <ImExit size={20}/>
    </NavLink>
  );
}

export default LogOut;
