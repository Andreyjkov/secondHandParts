import * as React from "react";
import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImEnter } from 'react-icons/im';
import { Login1 } from "./Login1";
import { Register1 } from "./Register1";

function AuthSidebar() {
  const [show, setShow] = useState(false);
  const [regOrLogin, setRegOrLogin] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRegOrLogin = () => setRegOrLogin(!regOrLogin);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <ImEnter />
        <span> Войти</span>
        
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {/* {regOrLogin ? "Зарегистрироваться" : "Войти"} */}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {regOrLogin ? (
            <>
              <Register1 />
              <Link to="#" onClick={handleRegOrLogin}>
                Вход
              </Link>
            </>
          ) : (
            <>
              <Login1 />
              <Link to="#" onClick={handleRegOrLogin}>
                Регистрация
              </Link>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AuthSidebar;
