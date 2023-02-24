import { SubmitHandler } from "react-hook-form";
import { ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../store";
import { addBaseItem } from "../store/sliceBase";
import { addDataFirebase } from "../services";
import AddForm from "../components/Form/AddForm";

export interface IFormData {
  brand: string;
  model: string;
  parts: string;
  description: string;
}

function AddPosition() {
  const dispatch = useAppDispatch();
  const { name, phone, email } = useAppSelector((state) => state.user);

  const onSubmit: SubmitHandler<IFormData> = async (formData) => {
    const data = { ...formData, name, phone, userOwn: email };
    const docRef = await addDataFirebase(data);
    if (docRef) {
      dispatch(addBaseItem({ ...data, docId: docRef.id }));
    }
  };

  return (
    <div className="container mt-5">
      <AddForm onSubmit={onSubmit} />
      <ToastContainer />
    </div>
  );
}

export default AddPosition;
