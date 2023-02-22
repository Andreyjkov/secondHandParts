import { ChangeEvent, useState } from "react";

import { useForm } from "react-hook-form";
import { setUserFirebase } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store";
import { setUser } from "../../store/sliceUser";

interface IProfileForm {
  name: string;
  phone: string;
}

function ProfileUser() {
  const dispatch = useAppDispatch();
  const { email, name, phone } = useAppSelector((store) => store.user);
  const [disabled, setDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>();
  const onSubmit = (data: IProfileForm) => {
    dispatch(setUser({ email, ...data }));
    setUserFirebase({ email: email, name: data.name, phone: data.phone });
    setDisabled(true);
  };

  const handleBtnDisabled = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== phone && e.target.name === "phone") {
      setDisabled(false);
    } else if (e.target.value !== name && e.target.name === "name") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  return (
    <div className="card mt-5">
      <h2 className="text-center">Профиль</h2>
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col-sm-12">
            <h6 className="mb-1">Имя</h6>
          </div>
          <div className="col text-secondary">
            <input
              {...register("name", {
                value: name,
                required: true,
                onChange: (e) => handleBtnDisabled(e),
              })}
              type="text"
              className="form-control"
            />
            {errors.name && (
              <span className="text-danger">Поле должно быть заполнено</span>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <h6 className="mb-1">Телефон</h6>
          </div>
          <div className="col text-secondary">
            <input
              {...register("phone", {
                value: phone,
                required: true,
                onChange: (e) => handleBtnDisabled(e),
              })}
              type="text"
              className="form-control"
            />
            {errors.phone && (
              <span className="text-danger">Поле должно быть заполнено</span>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <h6 className="mb-1">Почта</h6>
          <div className="col text-secondary">
            <span className="form-control">
              {email}{" "}
              <span className="fst-italic"> - нельзя редактировать</span>
            </span>
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" disabled={disabled}>
            Сохранить изменения
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileUser;
