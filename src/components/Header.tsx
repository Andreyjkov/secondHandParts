import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store";
import LogOut from "./Auth/Logout";

export function Header() {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/" className="navbar-brand">
          SecondHandParts
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              Profile
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              Blog
            </NavLink>
          </Nav>
          <Nav>
            {isAuth ? (
              <LogOut />
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "active nav-link" : "nav-link"
                }
              >
                Войти
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
