import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import { AuthSidebar, LogOut } from "./";
import { useAppSelector } from "../store";
import { useState } from "react";

function Header() {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { photoURL } = useAppSelector((store) => store.user);

  const [openCollapse, setOpenCollapse] = useState(false);

  const styleNavLink = (isActive: boolean) => {
    return isActive ? "active nav-link" : "nav-link";
  };

  return (
    <div className="header">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/" className="navbar-brand" onClick={() => setOpenCollapse(false)}>
            Second Hand Parts
          </Link>
          <Navbar.Toggle onClick={() => setOpenCollapse(!openCollapse)} />
          <Navbar.Collapse in={openCollapse}>
            <Nav className="me-auto" onClick={() => setOpenCollapse(false)}>
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
            <Nav onClick={() => setOpenCollapse(false)}>
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
