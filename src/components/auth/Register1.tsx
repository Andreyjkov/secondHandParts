import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm1 } from "../";

import { useAppSelector } from "../../store";
import { MyAlert } from "../MyAlert";


export function Register1() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { isVerification } = useAppSelector((state) => state.auth);
  const [sentVerification, setSentVerification] = useState(false);
  const [massageError, setMassageError] = useState("");

  useEffect(() => {
    if (isVerification && sentVerification) {
      setSentVerification(false);
      console.log("navigate()");
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
        setMassageError(error.code);
      });
  };

  console.log("render Register");

  return (
    <>
      {massageError && <MyAlert title={"Error"} subTitle={massageError} />}
      <AuthForm1
        title="Регистрация"
        handleClick={handleRegister}
        subtitle={"Уже зарегистрированы?"}
        link={"/login"}
        btnTitle={"Зарегистрироваться"}
        placeholder="Придумайте пароль"
      />
    </>
  );
}

export default Register1;
