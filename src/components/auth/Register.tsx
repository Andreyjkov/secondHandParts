import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../store";
import AuthForm from "./AuthForm";

function Register() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { isVerification } = useAppSelector((state) => state.auth);
  const [sentVerification, setSentVerification] = useState(false);

  useEffect(() => {
    if (isVerification && sentVerification) {
      setSentVerification(false);
    }
  }, [isVerification, navigate, sentVerification]);

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
    <AuthForm
      title="Зарегистрироваться"
      handleClick={handleRegister}
      subtitle={"Уже зарегистрированы?"}
      link={"/login"}
      linkTitle={"Войти"}
    />
  );
}

export default Register;
