import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { IFormData } from "../../pages/AddPosition";

const updateDocFirebase = async (docId: string, newData: IFormData) => {
  const docRef = doc(db, "base", docId);
  const payload = { ...newData }

  try {
    await updateDoc(docRef, payload);
    console.log("Success document update");
    toast.success('Позиция обновлина!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  } catch (error) {
    console.error("Error update document: ", error);
    toast.error(`Error update document`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
}

export default updateDocFirebase;
