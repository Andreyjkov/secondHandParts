import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store";
import { setIsAuth } from "../../store/sliceAuth";
import { MyAlert } from "../MyAlert";
import AuthForm from "./AuthForm";

function Login() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [massageError, setMassageError] = useState("");

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setIsAuth(true));
        alert(`Success ${user.email} Login`);
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
        linkTitle={"Зарегистрироваться"}
        link={"/register"}
      />
    </>
  );
}

export default Login;
