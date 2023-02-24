import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { ImEnter } from "react-icons/im";

import { Login } from "./Login";
import { Register } from "./Register";

function AuthSidebar() {
  const [show, setShow] = useState(false);
  const [formSwitcher, setFormSwitcher] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFormSwitcher = () => setFormSwitcher(!formSwitcher);

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <ImEnter />
        <span> Войти</span>
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {formSwitcher ? (
            <>
              <Register handleFormSwitcher={handleFormSwitcher} />
            </>
          ) : (
            <>
              <Login handleFormSwitcher={handleFormSwitcher} />
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AuthSidebar;
