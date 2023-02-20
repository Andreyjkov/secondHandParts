import { useForm, SubmitHandler } from "react-hook-form";
import { addDataFirebase } from "../../services/firebase/addDataFirebase";
import { getAllDataFirebase } from "../../services/firebase/getAllDataFirebase";
import { getDataFirebase } from "../../services/firebase/getDataFirebase";

export interface IFormData {
  brand: string;
  model: string;
  parts: string;
  description: string;
}

function AddPositionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();
  const onSubmit: SubmitHandler<IFormData> = (data) => {
    addDataFirebase(data);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Бренд
          </label>
          <input
            {...register("brand", { required: true })}
            placeholder="Пример: Samsung"
            className="form-control"
            id="brand"
          />
          {errors.brand && (
            <span className="text-danger">Поле должно быть заполнено</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="model" className="form-label">
            Модель
          </label>
          <input
            {...register("model", { required: true })}
            placeholder="Пример: s21 Ultra"
            className="form-control"
            id="model"
          />
          {errors.model && (
            <span className="text-danger">Поле должно быть заполнено</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="parts" className="form-label">
            Части
          </label>
          <input
            {...register("parts", { required: true })}
            placeholder="Пример:Задняя крышка"
            className="form-control"
            id="parts"
          />
          {errors.parts && (
            <span className="text-danger">Поле должно быть заполнено</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Описание:
          </label>
          <textarea
            {...register("description", { required: true })}
            className="form-control"
            id="description"
            placeholder="Пример: б/у  в идеальном состоянии, цвет: серебряный фантом"
          ></textarea>
          {errors.description && (
            <span className="text-danger">Поле должно быть заполнено</span>
          )}
        </div>

        <input
          type="submit"
          value={"СФОРМИРОВАТЬ ПОЗИЦИЮ"}
          className="btn btn-primary"
          // onClick={() => reset()}
        />
      </form>
      <button
        onClick={getAllDataFirebase}
        className="btn btn-primary mt-5"
      >
        Получить данные
      </button>
    </>
  );
}

export default AddPositionForm;
