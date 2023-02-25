import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  User,
} from "firebase/auth";

import { setUserFirebase } from "../../services";
import { useAppDispatch } from "../../store";
import { setIsVerification } from "../../store/sliceAuth";
import { IFormAuth, IUserData } from "../../interface";

interface IRegister {
  handleFormSwitcher: () => void;
}

export function Register({ handleFormSwitcher }: IRegister) {
  const auth = getAuth();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormAuth>();

  const handleRegister = ({ email, name, password, phone }: IFormAuth) => {
    const userFormInfo = { email, name, phone };

    const autoVerification = (user: User, userFormInfo: IUserData) => {
      setTimeout(() => {
        console.log("check email verified! (interval 5s)");
        if (!user.emailVerified) {
          user.reload();
          autoVerification(user, userFormInfo);
        } else {
          toast.dismiss();
          dispatch(setIsVerification(user.emailVerified));
          setUserFirebase(userFormInfo);
        }
      }, 5000);
    };

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        sendEmailVerification(user).then(() => {
          autoVerification(user, userFormInfo);

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
        });
      })
      .catch((error) => {
        console.error(error.code);
        let msgErorr: string = error.code;
        if (error.code === "auth/email-already-in-use") {
          msgErorr = "Пользователь с таким email уже существует";
        }
        toast.error(`${msgErorr}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const onSubmit = (formData: IFormAuth) => {
    handleRegister(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="Auth-form-title">Регистрация</h3>
      <>
        <div className="form-group mt-3">
          <label>Имя</label>
          <input
            {...register("name", { required: true })}
            className="form-control mt-1"
            placeholder="Имя"
          />
          {errors.password && (
            <span className="text-danger">Поле должно быть заполнено</span>
          )}
        </div>
        <div className="form-group mt-3">
          <label>Телефон</label>
          <input
            {...register("phone", { required: true })}
            className="form-control mt-1"
            placeholder="+375 xx x-xxx-xxx"
          />
          {errors.phone && (
            <span className="text-danger">Поле должно быть заполнено</span>
          )}
        </div>
      </>
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
          placeholder={"Придумайте пароль"}
        />
        {errors.password && (
          <span className="text-danger">Поле должно быть заполнено</span>
        )}
      </div>

      <div className="d-grid gap-2 mt-3">
        <button type="submit" className="btn btn-primary">
          Зарегистрироваться
        </button>
        <p>
          Уже зарегистрированы?{" "}
          <Link to={"#"} onClick={handleFormSwitcher}>
            Вход
          </Link>
        </p>
      </div>
    </form>
  );
}
