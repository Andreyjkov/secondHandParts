import { SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store";
import { setIsLoading } from "../store/sliceApp";
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
    dispatch(setIsLoading(true));
    const data = { ...formData, name, phone, userOwn: email };
    const docRef = await addDataFirebase(data);
    if (docRef) {
      dispatch(addBaseItem({ ...data, docId: docRef.id }));
    }
    dispatch(setIsLoading(false));
  };

  return (
    <div className="container mt-5">
      <AddForm onSubmit={onSubmit} />
    </div>
  );
}

export default AddPosition;
