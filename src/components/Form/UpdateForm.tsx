import { Button } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormData } from "../../pages/AddPosition";

interface IAddForm {
  data: IFormData;
  onSubmit: SubmitHandler<IFormData>;
  onDelete: () => void;
}

function UpdateForm({ onSubmit, onDelete, data }: IAddForm) {
  const formValue = {
    brand: data.brand,
    model: data.model,
    parts: data.parts,
    description: data.description,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: formValue,
  });

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
      <div className="d-flex flex-column flex-sm-row justify-content-between gap-3">
        <input
          type="submit"
          value={"Сохранить изменения"}
          className="btn btn-primary"
        />
        <Button className="btn btn-danger" onClick={onDelete}>
          Удалить позицию
        </Button>
      </div>
    </form>
  );
}

export default UpdateForm;
