import { useForm, SubmitHandler } from "react-hook-form";

import { addDataFirebase } from "../../services";
import { useAppSelector } from "../../store";
import AddForm from "./AddForm";

export interface IFormData {
  brand: string;
  model: string;
  parts: string;
  description: string;
}

function AddPositionForm() {
  const { name, phone, email } = useAppSelector((state) => state.user); // DO TO брать актуальные данные при просмотре подробной информации об таваре

  const onSubmit: SubmitHandler<IFormData> = (formData) => {
    const data = { ...formData, name, phone, userOwn: email };
    addDataFirebase(data);
  };

  return <AddForm onSubmit={onSubmit} />;
}

export default AddPositionForm;
