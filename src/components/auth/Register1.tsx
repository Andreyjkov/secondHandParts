import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserFirebase } from "../../services/dataUsers/setUserFirebase";
import { useAppSelector } from "../../store";
import { MyAlert } from "../MyAlert";
import AuthForm2, { IFormAuth } from "./AuthForm2";

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

  const handleRegister = ({ email, name, password, phone }: IFormAuth) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        auth.currentUser &&
          sendEmailVerification(auth.currentUser).then(() => {
            setUserFirebase({ name, email, phone });
            setSentVerification(true);
          });
      })
      .catch((error) => {
        setMassageError(error.code);
      });
  };

  return (
    <>
      {massageError && <MyAlert title={"Error"} subTitle={massageError} />}
      <AuthForm2
        title="Регистрация"
        handleClick={handleRegister}
        subtitle={"Уже зарегистрированы?"}
        link={"/login"}
        btnTitle={"Зарегистрироваться"}
        placeholder="Придумайте пароль"
        isRegister={true}
      />
    </>
  );
}

export default Register1;
