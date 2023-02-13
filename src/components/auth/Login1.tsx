import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store";
import { setIsAuth } from "../../store/sliceAuth";
import { MyAlert } from "../MyAlert";
import { AuthForm1 } from "./AuthForm1";

export function Login1() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [massageError, setMassageError] = useState("");

  const handleLogin = (email: string, password: string) => {
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
      <AuthForm1
        title="Войти"
        handleClick={handleLogin}
        subtitle={"Еще не зарегистрированы?"}
        btnTitle={"Войти"}
        link={"/register"}
        placeholder={'Пароль'}
      />
    </>
  );
}
