import { SubmitHandler } from "react-hook-form";
import AddForm from "../components/Form/AddForm";
import { addDataFirebase } from "../services";
import { useAppSelector } from "../store";

export interface IFormData {
  brand: string;
  model: string;
  parts: string;
  description: string;
}

function AddPosition() {
  const { name, phone, email } = useAppSelector((state) => state.user); // DO TO брать актуальные данные при просмотре подробной информации об таваре

  const onSubmit: SubmitHandler<IFormData> = (formData) => {
    const data = { ...formData, name, phone, userOwn: email };
    addDataFirebase(data);
  };

  return (
    <div className="container mt-5">
      <AddForm onSubmit={onSubmit} />
    </div>
  );
}

export default AddPosition;

