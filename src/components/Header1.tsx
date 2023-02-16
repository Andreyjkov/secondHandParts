import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { AuthSidebar, LogOut } from "./";
import { useAppSelector } from "../store";


function Header1() {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
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
              </>
            ) : null}
          </Nav>

          <Nav>{isAuth ? <LogOut /> : <AuthSidebar />}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header1;
