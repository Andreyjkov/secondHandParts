import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store";
import { setIsAuth } from "../../store/sliceAuth";
import { AuthForm } from "./AuthForm";

export function Login() {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(setIsAuth(true));
        alert(`Success ${user.email} Login`);
        navigate("/");
      })
      .catch((error) => {
        alert(error.code);
      });
  };

  return (
    <AuthForm
      title="Войти"
      handleClick={handleLogin}
      subtitle={"Еще не зарегистрированы?"}
      linkTitle={"Зарегистрироваться"}
      link={"/register"}
    />
  );
}
