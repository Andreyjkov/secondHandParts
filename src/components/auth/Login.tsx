import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import AuthForm, { IFormAuth } from "./AuthForm";

export function Login() {
  const auth = getAuth();

  const handleLogin = ({ email, password }: IFormAuth) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        toast.success("Вход выполнен успешно!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error(error.code);
        let msgErorr = error.code;
        if (error.code === "auth/invalid-email") {
          msgErorr = "Email-адрес введен неправильно";
        } else if (error.code === "auth/wrong-password") {
          msgErorr = "Неверный пароль";
        } else if (error.code === "auth/user-not-found") {
          msgErorr = "Пользователь не найден";
        }
        toast.error(`${msgErorr}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <>
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
