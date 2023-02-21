import { useEffect, useState } from "react";
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
  // const [disabled, setDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>();
  // TO DO заставить обновиться инпут последними данными( актульные даные получаю только после перезагрузки)
  const onSubmit = (data: IProfileForm) => {
    dispatch(setUser({ email, ...data }));
    setUserFirebase({ email: email, name: data.name, phone: data.phone });
    // setDisabled(true);
  };

  // console.log(name, phone);

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     if (value.name !== name || value.phone !== phone) {
  //       setDisabled(false);
  //     } else {
  //       setDisabled(true);
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [disabled, name, phone, watch]);

  return (
    <div className="container">
      <h3>Имя: {name}</h3>
      <p>Почта: {email}</p>
      <p>Телефон: {phone}</p>
      <div className="card mt-5">
        <h2 className="text-center">Редактировать</h2>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-sm-12">
              <h6 className="mb-0">Имя</h6>
            </div>
            <div className="col text-secondary">
              <input
                defaultValue={name}
                {...register("name", { required: true })}
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
              <h6 className="mb-0">Телефон</h6>
            </div>
            <div className="col text-secondary">
              <input
                defaultValue={phone}
                {...register("phone", { required: true })}
                type="text"
                className="form-control"
              />
              {errors.phone && (
                <span className="text-danger">Поле должно быть заполнено</span>
              )}
            </div>
          </div>
          <div className="text-center">
            <input
              type="submit"
              className="btn btn-primary px-4"
              value="Сохранить изменения"
              // disabled={disabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUser;
