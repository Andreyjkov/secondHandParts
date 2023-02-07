import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store";
import { AuthForm } from "./AuthForm";

export function Register() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [sentVerification, setSentVerification] = useState(false);

  useEffect(() => {  
    auth.currentUser && setSentVerification(true);
  }, [auth, auth.currentUser?.emailVerified, isAuth, navigate]);

  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        auth.currentUser &&
          sendEmailVerification(auth.currentUser).then(() => {
            setSentVerification(true);
          });
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  return (
    <div className="container justify-content-center">
      {sentVerification && (
        <>
          <div className="text-success text-center ">
            На вашу почту отправлено письмо с подтверждением. <br />
            Подтвердите письмо на почте и перезагрузите страницу.
          </div>
        </>
      )}
      <AuthForm
        title="Зарегистрироваться"
        handleClick={handleRegister}
        subtitle={"Уже зарегистрированы?"}
        link={"/login"}
        linkTitle={"Войти"}
      />
    </div>
  );
}
