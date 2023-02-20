import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export interface IFormAuth {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface IProps {
  title: string;
  subtitle: string;
  link: string;
  btnTitle: string;
  placeholder: string;
  isRegister: boolean;
  handleClick: (formData: IFormAuth) => void;
}


function AuthForm({
  title,
  subtitle,
  link,
  placeholder,
  btnTitle,
  isRegister,
  handleClick,
}: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormAuth>();

  const onSubmit = (formData: IFormAuth) => {
    handleClick(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="Auth-form-title">{title}</h3>
      {isRegister ? (
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
              placeholder="+375 29 x-xxx-xxx"
            />
            {errors.phone && (
              <span className="text-danger">Поле должно быть заполнено</span>
            )}
          </div>
        </>
      ) : null}

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
          {...register("password", { required: true })}
          className="form-control mt-1"
          placeholder={placeholder}
        />
        {errors.password && (
          <span className="text-danger">Поле должно быть заполнено</span>
        )}
      </div>

      <div className="d-grid gap-2 mt-3">
        <button type="submit" className="btn btn-primary">
          {btnTitle}
        </button>
        <p>
          {subtitle}
          <Link to={link}></Link>
        </p>
      </div>
    </form>
  );
}

export default AuthForm;
