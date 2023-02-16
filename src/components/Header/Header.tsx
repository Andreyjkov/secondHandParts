import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store";
import LogOut from "../auth/Logout";
import styles from "./Header.module.css";
import { ImEnter } from "react-icons/im";

function Header() {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.wrapper} container`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.active} ${styles['nav-link']} ${styles.logo}`
              : `${styles['nav-link']} ${styles.logo}`
          }
        >
          SecondHandParts
        </NavLink>
        {isAuth ? (
          <div className={styles.nav}>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles['nav-link']}`
                  : `${styles['nav-link']}`
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles['nav-link']}`
                  : `${styles['nav-link']}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? `${styles.active} ${styles['nav-link']}`
                  : `${styles['nav-link']}`
              }
            >
              Blog
            </NavLink>
          </div>
        ) : (
          ""
        )}

        {isAuth ? (
          <LogOut />
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? `${styles.active} ${styles['nav-link']}`
                : `${styles['nav-link']}`
            }
          >
            <ImEnter />
            <span> Войти</span>
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
