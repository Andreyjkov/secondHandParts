import { ChangeEvent, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

import { setUserFirebase } from "../../services";
import { useAppDispatch, useAppSelector } from "../../store";
import { setPhotoURL, setUser } from "../../store/sliceUser";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";

interface IProfileForm {
  name: string;
  phone: string;
  photo: FileList;
}

function ProfileUser() {
  const dispatch = useAppDispatch();
  const { email, name, phone } = useAppSelector(
    (store) => store.user
  );
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileForm>();

  const onSubmit = async (data: IProfileForm) => {
    const { name, phone, photo } = data;

    if (photo.length > 0) {
      const storageRef = ref(storage, `avatars/${email}/avatar.jpg`);
      await uploadBytes(storageRef, photo[0]).then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
      getDownloadURL(ref(storage, `/avatars/${email}/avatar.jpg`))
        .then((url) => {
          dispatch(setPhotoURL(url));
        })
        .catch((error) => {
          console.log(error);
        });
    }

    dispatch(setUser({ email, name, phone }));
    setUserFirebase({ email: email, name: data.name, phone: data.phone });
    // setDisabled(true);
  };

  //TO DO переделать отключения кнопки
  const handleBtnDisabled = (e: ChangeEvent<HTMLInputElement>) => {
    // if (e.target.value !== phone && e.target.name === "phone") {
    //   setDisabled(false);
    // } else if (e.target.value !== name && e.target.name === "name") {
    //   setDisabled(false);
    // } else {
    //   setDisabled(true);
    // }
  };

  return (
    <div className="card">
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
        <div className="mb-3">
          <div className="col-sm-12">
            <h6 className="mb-1">Фото</h6>
          </div>
          <div className="col text-secondary form-control">
            <input
              {...register("photo", {
                required: false,
                onChange: (e) => handleBtnDisabled(e),
              })}
              type="file"
            />
          </div>
        </div>
        <div className="text-center">
          <button className="btn btn-primary" disabled={disabled}>
            Сохранить изменения
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ProfileUser;
