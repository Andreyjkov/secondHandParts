import { useForm } from "react-hook-form";
import { setUserFirebase } from "../../services/dataUsers/setUserFirebase";
import { useAppSelector } from "../../store";

interface IProfileForm {
  name: string;
  phone: string;
}

function Profile() {
  const { email, name, phone } = useAppSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IProfileForm>();

  const onSubmit = (data: IProfileForm) => {
    console.log(data);
    setUserFirebase({ email: email, name: data.name, phone: data.phone });
    reset();
  };

  return (
    <div className="container">
      <h3>Имя: {name}</h3>
      <p>Почта: {email}</p>
      <p>Телефон: {phone}</p>
      <div className="card mt-5">
        <h2 className="text-center">Редактировать</h2>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-sm-3">
              <h6 className="mb-0">Имя</h6>
            </div>
            <div className="col-sm-9 text-secondary">
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
            <div className="col-sm-3">
              <h6 className="mb-0">Телефон</h6>
            </div>
            <div className="col-sm-9 text-secondary">
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
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-9 text-secondary">
              <input
                type="submit"
                className="btn btn-primary px-4"
                value="Сохранить изменения"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
