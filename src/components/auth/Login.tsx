import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { IFormAuth } from "../../interface";
import { useAppDispatch } from "../../store";
import { setIsAuth } from "../../store/sliceAuth";
import { useState } from "react";

interface ILogin {
  handleFormSwitcher: () => void;
}

export function Login({ handleFormSwitcher }: ILogin) {
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormAuth>();

  const handleLogin = ({ email, password }: IFormAuth) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {

        if (user.emailVerified) {
          dispatch(setIsAuth(true));
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
          setLoading(false);
        } else {
          toast.info(
            "Мы отправили Вам письмо. Пожалуйста, проверьте Вашу почту.",
            {
              position: "top-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
        }
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
        setLoading(false);
      });
  };

  const onSubmit = (formData: IFormAuth) => {
    handleLogin(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="Auth-form-title">Войти</h3>
      <div className="form-group mt-3">
        <label>Электронная почта</label>
        <input
          {...register("email", { required: true })}
          className="form-control mt-1"
          placeholder="Адрес электронной почты"
        />
        {errors.email && (
          <span className="text-danger">Поле должно быть заполнено</span>
        )}
      </div>
      <div className="form-group mt-3">
        <label>Пароль</label>
        <input
          type="password"
          {...register("password", { required: true })}
          className="form-control mt-1"
          placeholder={"Пароль"}
        />
        {errors.password && (
          <span className="text-danger">Поле должно быть заполнено</span>
        )}
      </div>

      <div className="d-grid gap-2 mt-3">
        {loading ? (
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Загрузка...
          </button>
        ) : (
          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        )}

        <p>
          Еще не зарегистрированы?{" "}
          <Link to={"#"} onClick={handleFormSwitcher} className={"link"}>
            Регистрация
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
