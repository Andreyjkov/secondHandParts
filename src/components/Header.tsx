import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import { AuthSidebar, LogOut } from "./";
import { useAppSelector } from "../store";

function Header() {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { photoURL } = useAppSelector((store) => store.user);

  const styleNavLink = (isActive: boolean) => {
    return isActive ? "active nav-link" : "nav-link";
  };

  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand">
            Second Hand Parts
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isAuth ? (
                <>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => styleNavLink(isActive)}
                  >
                    Профиль
                  </NavLink>
                  <NavLink
                    to="/add-position"
                    className={({ isActive }) => styleNavLink(isActive)}
                  >
                    Добавить позицию
                  </NavLink>
                  <NavLink
                    to="/base"
                    className={({ isActive }) => styleNavLink(isActive)}
                  >
                    Запчасти
                  </NavLink>
                </>
              ) : null}
            </Nav>
            <Nav>
              {isAuth ? <LogOut /> : <AuthSidebar />}
              {photoURL && (
                <img
                  src={photoURL}
                  className="header-avatar rounded-circle"
                  alt="avatar"
                />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
