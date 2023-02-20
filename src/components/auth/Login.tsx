import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store";
import { setIsAuth } from "../../store/sliceAuth";
import { MyAlert } from "../MyAlert";
import AuthForm, { IFormAuth } from "./AuthForm";


export function Login() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [massageError, setMassageError] = useState("");

  const handleLogin = ({ email, password }: IFormAuth) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {

        dispatch(setIsAuth(true));
        navigate("/");
      })
      .catch((error) => {
        setMassageError(error.code);
      });
  };

  return (
    <>
      {massageError && <MyAlert title={"Error"} subTitle={massageError} />}
      <AuthForm
        title="Войти"
        handleClick={handleLogin}
        subtitle={"Еще не зарегистрированы?"}
        btnTitle={"Войти"}
        link={"/register"}
        placeholder={"Пароль"}
        isRegister={false}
      />
    </>
  );
}

export default Login;
