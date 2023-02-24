import { SubmitHandler, useForm } from "react-hook-form";
import { IFormData } from "../../pages/AddPosition";

interface IAddForm {
  onSubmit: SubmitHandler<IFormData>;
}

function AddForm({ onSubmit }: IAddForm) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const handleSubmitForm: SubmitHandler<IFormData> = (formData) => {
    onSubmit(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
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
      />
    </form>
  );
}

export default AddForm;
